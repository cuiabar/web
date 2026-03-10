# Cuiabar Restaurante — Site institucional/comercial (React + Vite + TypeScript + Tailwind)

Projeto premium, responsivo e otimizado para conversão em **pedidos online** e **reservas**, com página comercial da operação **ProRefeição** e estrutura preparada para SEO local.

## Stack
- React 18
- Vite 5
- TypeScript
- Tailwind CSS
- React Router DOM
- Pronto para Cloudflare Pages (com fallback SPA)

## Estrutura
```txt
src/
  app/            # App principal e roteamento
  components/     # Componentes reutilizáveis
  sections/       # Seções da Home
  pages/          # Rotas/páginas
  data/           # Dados mock e configurações
  assets/         # Reservado para imagens/ícones locais
  hooks/          # Hooks (SEO etc.)
  lib/            # Funções utilitárias
  styles/         # Estilos globais
```

## Requisitos
- Node.js 20+
- npm 10+

## Instalação
```bash
npm install
```

## Desenvolvimento
```bash
npm run dev
```

## Build de produção
```bash
npm run build
npm run preview
```

## Pronto para subir no GitHub (passo a passo)

1. Crie um repositório vazio no GitHub (ex.: `cuiabar-site`).
2. Configure o remote local:
```bash
git remote add origin https://github.com/SEU_USUARIO/cuiabar-site.git
```
3. Envie a branch atual:
```bash
git push -u origin HEAD
```
4. (Opcional) Defina branch padrão como `main` no GitHub.

> Este projeto já inclui CI em `.github/workflows/ci.yml` para validar `npm ci`, `npm run lint` e `npm run build` a cada push/PR.

## Deploy no Cloudflare Pages

### Opção 1 — Git integrado (recomendado)
1. No Cloudflare Dashboard, acesse **Workers & Pages > Create > Pages > Connect to Git**.
2. Selecione o repositório no GitHub.
3. Configure:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Clique em **Save and Deploy**.

### Opção 2 — Deploy via CLI
```bash
npm run deploy:pages
```

## Arquivos Cloudflare
- `wrangler.toml`: inclui `pages_build_output_dir = "dist"`
- `public/_redirects`: fallback para SPA (`/* /index.html 200`)

## Personalização rápida
Edite `src/data/siteConfig.ts` para trocar:
- WhatsApp (`whatsappNumber`, `whatsappMessage`)
- Links de pedidos (`orderLinks`)
- Link da agenda Google (`calendarEmbedUrl`)
- Contatos, endereço e horários

Edite `src/data/content.ts` para trocar:
- Posts do blog
- Destaques do cardápio
- Diferenciais
- FAQs
- Testimonials

## SEO
- SEO por página via hook `useSeo` (`src/hooks/useSeo.ts` + `src/lib/seo.ts`)
- Metatags base no `index.html`
- Estrutura semântica com headings
- Conteúdo orientado para palavras-chave locais de Campinas

## Evolução futura sugerida
- Integrar formulários com API (Supabase, Formspree, Resend etc.)
- Adicionar página de detalhe de post no blog
- Implementar analytics e eventos de conversão
- Migrar imagens para pipeline otimizado/CDN proprietário
