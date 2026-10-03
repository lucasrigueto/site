# Site Rigueto Consultoria

Landing principal da Rigueto: agente de atendimento SDR com IA e tráfego pago. Todo botão leva ao WhatsApp da Rigueto.

## Rodar local

```sh
npm install
npm run dev
```

## Build

```sh
npm run build   # gera a pasta dist/
npm run preview # serve o build localmente
```

## Publicação

Cloudflare Workers (static assets) ligado a este repositório, configurado em `wrangler.jsonc`. Cada push no `main` publica sozinho.

- Deploy command: `npx wrangler deploy`
- Build command: `npm run build`
- Pasta publicada: `dist` (definida no `wrangler.jsonc`)

## Onde mexer

- Página: `index.html` + `src/sdr/` (componentes em `src/sdr/components/`)
- Estilos e tokens: `src/sdr/sdr.css` e `src/sdr/follow.css`
- Fontes e logos: `public/sdr/`
- Sistema visual: `DESIGN.md` · produto e regras de copy: `PRODUCT.md`
