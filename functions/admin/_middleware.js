// Protege tudo em /admin com usuário e senha (a senha vem da variável ADMIN_PASSWORD).
export async function onRequest({ request, env, next }) {
  if (!env.ADMIN_PASSWORD) {
    return new Response('Painel ainda não configurado (falta a variável ADMIN_PASSWORD).', { status: 503 });
  }
  const cabecalho = request.headers.get('authorization') || '';
  const [tipo, credenciais] = cabecalho.split(' ');
  let ok = false;
  if (tipo === 'Basic' && credenciais) {
    const senha = atob(credenciais).split(':').slice(1).join(':');
    const a = new TextEncoder().encode(senha);
    const b = new TextEncoder().encode(env.ADMIN_PASSWORD);
    ok = a.length === b.length && a.every((x, i) => x === b[i]);
  }
  if (!ok) {
    return new Response('Acesso restrito.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Acta Terrae - moderação", charset="UTF-8"' },
    });
  }
  const resposta = await next();
  const nova = new Response(resposta.body, resposta);
  nova.headers.set('X-Robots-Tag', 'noindex, nofollow');
  nova.headers.set('Cache-Control', 'no-store');
  return nova;
}
