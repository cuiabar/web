import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import seoRoutesJson from '../src/data/seoRoutes.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const seoConfig = seoRoutesJson;
const siteOrigin = seoConfig.siteOrigin;
const defaultImage = seoConfig.defaultImage;
const routeEntries = Object.entries(seoConfig.routes);
const buildDate = new Date().toISOString().slice(0, 10);

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const upsertTag = (html, regex, replacement) => (regex.test(html) ? html.replace(regex, replacement) : html.replace('</head>', `  ${replacement}\n  </head>`));

const routeLabel = (routePath, title) => {
  if (routePath === '/') {
    return 'Home';
  }

  return title.split('|')[0].trim();
};

const buildBreadcrumbSchema = (routePath, title) => {
  if (routePath === '/') {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteOrigin}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: routeLabel(routePath, title),
        item: `${siteOrigin}${routePath}`,
      },
    ],
  };
};

const buildWebPageSchema = (routePath, routeSeo) => ({
  '@context': 'https://schema.org',
  '@type': routePath === '/' ? 'WebPage' : 'CollectionPage',
  name: routeLabel(routePath, routeSeo.title),
  url: `${siteOrigin}${routePath === '/' ? '/' : routePath}`,
  description: routeSeo.description,
  inLanguage: 'pt-BR',
});

const injectRouteMetadata = (html, routePath, routeSeo) => {
  const title = routeSeo.title;
  const description = routeSeo.description;
  const image = routeSeo.image || defaultImage;
  const canonicalUrl = `${siteOrigin}${routePath === '/' ? '/' : routePath}`;
  const ogType = routeSeo.type || 'website';
  const schemas = [
    buildWebPageSchema(routePath, routeSeo),
    ...(routeSeo.schema || []),
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(routePath, title);

  if (breadcrumbSchema) {
    schemas.push(breadcrumbSchema);
  }

  let output = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`);
  output = upsertTag(output, /<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(description)}" />`);
  output = upsertTag(output, /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  output = upsertTag(output, /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  output = upsertTag(output, /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i, `<meta property="og:image" content="${escapeHtml(image)}" />`);
  output = upsertTag(output, /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/i, `<meta property="og:type" content="${escapeHtml(ogType)}" />`);
  output = upsertTag(output, /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`);
  output = upsertTag(output, /<meta\s+name="twitter:card"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:card" content="summary_large_image" />`);
  output = upsertTag(output, /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  output = upsertTag(output, /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  output = upsertTag(output, /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${escapeHtml(image)}" />`);
  output = upsertTag(output, /<meta\s+name="robots"\s+content=".*?"\s*\/?>/i, '<meta name="robots" content="index,follow,max-image-preview:large" />');
  output = upsertTag(output, /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`);
  output = output.replace(/<script id="route-schema" type="application\/ld\+json">.*?<\/script>\s*/s, '');
  output = output.replace(
    '</head>',
    `  <script id="route-schema" type="application/ld+json">${JSON.stringify(schemas)}</script>\n  </head>`,
  );

  return output;
};

const generateSitemap = () => {
  const urls = routeEntries
    .map(([routePath, routeSeo]) => {
      const loc = `${siteOrigin}${routePath === '/' ? '/' : routePath}`;
      const priority = routeSeo.priority || '0.7';
      const changefreq = routeSeo.changefreq || 'weekly';

      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${buildDate}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

const generateRobots = () => `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`;

const main = async () => {
  const baseHtml = await readFile(path.join(distDir, 'index.html'), 'utf8');

  for (const [routePath, routeSeo] of routeEntries) {
    const routeHtml = injectRouteMetadata(baseHtml, routePath, routeSeo);

    if (routePath === '/') {
      await writeFile(path.join(distDir, 'index.html'), routeHtml, 'utf8');
      continue;
    }

    const routeDir = path.join(distDir, routePath.replace(/^\//, ''));
    await mkdir(routeDir, { recursive: true });
    await writeFile(path.join(routeDir, 'index.html'), routeHtml, 'utf8');
  }

  await writeFile(path.join(distDir, 'robots.txt'), generateRobots(), 'utf8');
  await writeFile(path.join(distDir, 'sitemap.xml'), generateSitemap(), 'utf8');
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
