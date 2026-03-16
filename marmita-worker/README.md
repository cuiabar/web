# Cuiabar Marmita Worker

Worker dedicado para alimentar `https://cuiabar.com/marmita` com espelhamento automático do cardápio do Expresso Cuiabar.

## O que faz

- Atualiza o snapshot das marmitas diariamente às `09:30`
- Permite refresh manual protegido por token
- Mantém cache em KV com fallback para a última versão válida
- Exibe apenas:
  - Marmitas Clássicas
  - Marmitas Especiais
  - Massas & Risotos

## Antes do deploy

1. Criar um namespace KV:
   - `wrangler kv namespace create MARMITA_CACHE`
   - `wrangler kv namespace create MARMITA_CACHE --preview`
2. Preencher `id` e `preview_id` no `wrangler.jsonc`
3. Definir o secret `MARMITA_REFRESH_TOKEN` com um token forte
4. Garantir que a conta Cloudflare tenha Browser Rendering habilitado

## Rotas

Subdomínio do Worker: `https://marmita-api.cuiabar.com`

- `GET /`
- `GET /data.json`
- `GET /health`
- `POST /admin/refresh?token=...`
- `POST /admin/seed?token=...`

## Comandos

- `npm install`
- `npm run typecheck`
- `npm run dev`
- `npm run deploy`
