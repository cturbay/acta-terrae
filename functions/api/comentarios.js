// Comentários públicos: lista os aprovados (GET) e recebe novos para moderação (POST).
const json = (dados, status = 200) =>
  new Response(JSON.stringify(dados), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

const paginaValida = (p) => typeof p === 'string' && /^\/reportagens\/[a-z0-9-]+\/$/.test(p);

export async function onRequestGet({ request, env }) {
  const pagina = new URL(request.url).searchParams.get('pagina');
  if (!paginaValida(pagina)) return json({ erro: 'Página inválida.' }, 400);
  const { results } = await env.DB.prepare(
    "SELECT nome, texto, criado_em FROM comentarios WHERE pagina = ? AND status = 'aprovado' ORDER BY id ASC LIMIT 200"
  )
    .bind(pagina)
    .all();
  return json(results);
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// Aviso por e-mail (Resend). Só roda se RESEND_API_KEY estiver configurada; qualquer falha é ignorada
// para nunca impedir o comentário de ser guardado.
async function avisarPorEmail(env, { pagina, nome, texto }) {
  if (!env.RESEND_API_KEY) return;
  const para = env.AVISO_EMAIL_PARA || 'actaterrae@gmail.com';
  const de = env.AVISO_EMAIL_DE || 'Acta Terrae <onboarding@resend.dev>';
  const site = env.SITE_URL || 'https://actaterrae.com.br';
  const html =
    `<p><strong>${esc(nome)}</strong> comentou em <a href="${site}${pagina}">${esc(pagina)}</a>:</p>` +
    `<blockquote style="margin:0;padding:.6rem 1rem;border-left:3px solid #b4532a;background:#f6f1e7;white-space:pre-wrap">${esc(texto)}</blockquote>` +
    `<p>O comentário está aguardando a sua aprovação. <a href="${site}/admin/">Abrir o painel de moderação</a></p>`;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from: de, to: [para], subject: `Novo comentário de ${nome.slice(0, 40)} – Acta Terrae`, html }),
    });
  } catch {}
}

export async function onRequestPost({ request, env, waitUntil }) {
  let corpo;
  try {
    corpo = await request.json();
  } catch {
    return json({ erro: 'Envio inválido.' }, 400);
  }
  // Campo-isca: pessoas não o veem; robôs costumam preenchê-lo.
  if (corpo.site) return json({ ok: true }, 201);

  const pagina = corpo.pagina;
  const nome = String(corpo.nome ?? '').trim();
  const texto = String(corpo.texto ?? '').trim();
  if (!paginaValida(pagina)) return json({ erro: 'Página inválida.' }, 400);
  if (nome.length < 2 || nome.length > 80) return json({ erro: 'Escreva seu nome (até 80 letras).' }, 400);
  if (texto.length < 3 || texto.length > 2000) return json({ erro: 'O comentário deve ter entre 3 e 2000 caracteres.' }, 400);

  // Proteção opcional do Cloudflare Turnstile (só ativa se a chave secreta estiver configurada).
  if (env.TURNSTILE_SECRET) {
    const form = new FormData();
    form.append('secret', env.TURNSTILE_SECRET);
    form.append('response', String(corpo.turnstile ?? ''));
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const v = await r.json();
    if (!v.success) return json({ erro: 'Não conseguimos confirmar que você é uma pessoa. Tente de novo.' }, 400);
  }

  // Limite simples: no máximo 30 comentários pendentes no total, para o painel não encher.
  const { n } = await env.DB.prepare("SELECT COUNT(*) AS n FROM comentarios WHERE status = 'pendente'").first();
  if (n >= 30) return json({ erro: 'Muitos comentários aguardando aprovação. Tente novamente mais tarde.' }, 429);

  await env.DB.prepare('INSERT INTO comentarios (pagina, nome, texto) VALUES (?, ?, ?)').bind(pagina, nome, texto).run();
  const aviso = avisarPorEmail(env, { pagina, nome, texto });
  if (typeof waitUntil === 'function') waitUntil(aviso);
  else await aviso;
  return json({ ok: true }, 201);
}
