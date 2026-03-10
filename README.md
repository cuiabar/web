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

## Deploy no Cloudflare Pages

### Opção 1 — Git integrado (recomendado)
1. Suba este projeto para um repositório Git (GitHub/GitLab).
2. No Cloudflare Dashboard, vá em **Pages > Create a project > Connect to Git**.
3. Selecione o repositório.
4. Configure:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Deploy.

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
