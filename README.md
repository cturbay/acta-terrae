# Acta Terrae — site

Site estático feito com [Astro](https://astro.build).

## Comandos

```
npm install      # instala dependências (uma vez)
npm run dev      # servidor local em http://localhost:4321
npm run build    # gera a pasta dist/ (é o que vai para o ar)
```

## Estrutura

- `src/layouts/Base.astro` — cabeçalho, rodapé e estilos globais.
- `src/pages/index.astro` — página inicial.
- `src/data/reportagens.js` — lista de reportagens exibida na página inicial.
- `src/pages/reportagens/<slug>/index.astro` — cada reportagem é uma página independente, com seu próprio visual.
- `public/` — arquivos servidos como estão (logo, favicon, imagens).

## Publicação

Cloudflare Pages: build command `npm run build`, output directory `dist`.

## Aviso de comentários por e-mail (opcional)

Cada comentário novo pode gerar um e-mail para o autor, enviado pelo próprio Gmail através de um
script do Google (Apps Script, grátis, sem conta nova). O código do script está em `docs/aviso-apps-script.gs`.
No Cloudflare Pages (Settings → Variables and Secrets) crie o Secret `AVISO_WEBHOOK` com o endereço do script
publicado. Sem ele, nenhum e-mail é enviado. Falha no envio nunca impede o comentário de ser guardado.
