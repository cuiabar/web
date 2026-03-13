export type SeoConfig = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  image?: string;
  canonicalUrl?: string;
  robots?: string;
};

const DEFAULT_IMAGE = 'https://cuiabar.com/logo-villa-cuiabar.png';

export const applySeo = ({ title, description, ogTitle, ogDescription, image = DEFAULT_IMAGE, canonicalUrl, robots = 'index,follow' }: SeoConfig) => {
  document.title = title;

  const ensureMeta = (selector: string, attribute: 'name' | 'property', value: string) => {
    let tag = document.querySelector<HTMLMetaElement>(selector);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, value);
      document.head.appendChild(tag);
    }
    return tag;
  };

  const resolvedCanonical =
    canonicalUrl ?? (typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}${window.location.search}` : undefined);

  ensureMeta('meta[name="description"]', 'name', 'description').setAttribute('content', description);
  ensureMeta('meta[property="og:title"]', 'property', 'og:title').setAttribute('content', ogTitle ?? title);
  ensureMeta('meta[property="og:description"]', 'property', 'og:description').setAttribute(
    'content',
    ogDescription ?? description,
  );
  ensureMeta('meta[property="og:image"]', 'property', 'og:image').setAttribute('content', image);
  ensureMeta('meta[name="twitter:card"]', 'name', 'twitter:card').setAttribute('content', 'summary_large_image');
  ensureMeta('meta[name="twitter:title"]', 'name', 'twitter:title').setAttribute('content', ogTitle ?? title);
  ensureMeta('meta[name="twitter:description"]', 'name', 'twitter:description').setAttribute('content', ogDescription ?? description);
  ensureMeta('meta[name="twitter:image"]', 'name', 'twitter:image').setAttribute('content', image);
  ensureMeta('meta[name="robots"]', 'name', 'robots').setAttribute('content', robots);

  if (resolvedCanonical) {
    let canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }

    canonicalTag.setAttribute('href', resolvedCanonical);
    ensureMeta('meta[property="og:url"]', 'property', 'og:url').setAttribute('content', resolvedCanonical);
  }
};
