// Ações do painel: listar por status e aprovar / recusar / apagar.
const json = (dados, status = 200) =>
  new Response(JSON.stringify(dados), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });

export async function onRequestGet({ request, env }) {
  const status = new URL(request.url).searchParams.get('status') === 'aprovado' ? 'aprovado' : 'pendente';
  const { results } = await env.DB.prepare(
    'SELECT id, pagina, nome, texto, criado_em FROM comentarios WHERE status = ? ORDER BY id DESC LIMIT 200'
  )
    .bind(status)
    .all();
  return json(results);
}

export async function onRequestPost({ request, env }) {
  let c;
  try {
    c = await request.json();
  } catch {
    return json({ erro: 'Envio inválido.' }, 400);
  }
  const id = Number(c.id);
  if (!Number.isInteger(id)) return json({ erro: 'Comentário inválido.' }, 400);
  if (c.acao === 'aprovar') {
    await env.DB.prepare("UPDATE comentarios SET status = 'aprovado' WHERE id = ?").bind(id).run();
  } else if (c.acao === 'apagar' || c.acao === 'recusar') {
    await env.DB.prepare('DELETE FROM comentarios WHERE id = ?').bind(id).run();
  } else {
    return json({ erro: 'Ação inválida.' }, 400);
  }
  return json({ ok: true });
}
