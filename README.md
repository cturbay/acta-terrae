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

Cada comentário novo pode gerar um e-mail para o autor, via [Resend](https://resend.com) (plano gratuito).
No Cloudflare Pages (Settings → Variables and Secrets) crie:

- `RESEND_API_KEY` (Secret) – chave criada no Resend. Sem ela, nenhum e-mail é enviado.
- `AVISO_EMAIL_PARA` (opcional) – destino; padrão `actaterrae@gmail.com`.
- `AVISO_EMAIL_DE` (opcional) – remetente; padrão `Acta Terrae <onboarding@resend.dev>` (só entrega no e-mail da conta do Resend).

Falha no envio nunca impede o comentário de ser guardado.
