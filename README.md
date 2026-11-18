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
