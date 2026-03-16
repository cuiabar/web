# Cuiabar Marmita Worker

Worker dedicado para servir `https://cuiabar.com/marmita` com espelhamento automático do cardápio do Expresso Cuiabar.

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
3. Trocar `MARMITA_REFRESH_TOKEN` por um token forte
4. Garantir que a conta Cloudflare tenha Browser Rendering habilitado

## Rotas

- `GET /marmita`
- `GET /marmita/data.json`
- `GET /marmita/health`
- `POST /marmita/admin/refresh?token=...`

## Comandos

- `npm install`
- `npm run typecheck`
- `npm run dev`
- `npm run deploy`
