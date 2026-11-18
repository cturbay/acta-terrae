// Página do painel de moderação.
const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Moderação — Acta Terrae</title>
<style>
 body{font:16px/1.5 Georgia,serif;background:#f5efe3;color:#2a2118;margin:0;padding:1.5rem}
 main{max-width:44rem;margin:0 auto}
 h1{font-size:1.5rem;margin:0 0 .3rem} .abas{display:flex;gap:.5rem;margin:1rem 0}
 button{font:600 .9rem system-ui,sans-serif;padding:.45rem .9rem;border:1px solid #d8ccb4;border-radius:4px;background:#fff;cursor:pointer}
 button.on{background:#9a4a22;color:#fff;border-color:#9a4a22} .ok{background:#2f6b3a;color:#fff;border-color:#2f6b3a} .no{background:#8c2a1f;color:#fff;border-color:#8c2a1f}
 article{background:#fffaf0;border:1px solid #d8ccb4;border-radius:6px;padding:1rem;margin:0 0 1rem}
 .meta{font:.8rem system-ui,sans-serif;color:#6f6252;margin:0 0 .5rem} .txt{white-space:pre-wrap;margin:0 0 .8rem} .vazio{color:#6f6252}
</style></head><body><main>
<h1>Moderação de comentários</h1><p class="meta">Comentários novos só aparecem no site depois de aprovados.</p>
<div class="abas"><button id="b-pendente" class="on">Pendentes</button><button id="b-aprovado">Aprovados</button></div>
<div id="lista"></div></main>
<script>
let status='pendente';
const lista=document.getElementById('lista');
async function carregar(){
  lista.textContent='Carregando…';
  const r=await fetch('/admin/api?status='+status); const dados=await r.json();
  lista.textContent='';
  if(!dados.length){const p=document.createElement('p');p.className='vazio';p.textContent=status==='pendente'?'Nenhum comentário aguardando.':'Nenhum comentário aprovado.';lista.append(p);return;}
  for(const c of dados){
    const a=document.createElement('article');
    const m=document.createElement('p');m.className='meta';m.textContent=c.nome+' · '+c.criado_em+' UTC · '+c.pagina;
    const t=document.createElement('p');t.className='txt';t.textContent=c.texto;
    a.append(m,t);
    const mk=(rot,acao,cls)=>{const b=document.createElement('button');b.textContent=rot;b.className=cls;b.onclick=async()=>{b.disabled=true;await fetch('/admin/api',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({id:c.id,acao})});carregar();};return b;};
    if(status==='pendente'){a.append(mk('Aprovar','aprovar','ok'),' ',mk('Recusar','recusar','no'));}
    else{a.append(mk('Apagar','apagar','no'));}
    lista.append(a);
  }
}
for(const s of ['pendente','aprovado']){document.getElementById('b-'+s).onclick=()=>{status=s;document.getElementById('b-pendente').className=s==='pendente'?'on':'';document.getElementById('b-aprovado').className=s==='aprovado'?'on':'';carregar();};}
carregar();
</script></body></html>`;

export function onRequestGet() {
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
}
