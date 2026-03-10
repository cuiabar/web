export type SeoConfig = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
};

export const applySeo = ({ title, description, ogTitle, ogDescription }: SeoConfig) => {
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

  ensureMeta('meta[name="description"]', 'name', 'description').setAttribute('content', description);
  ensureMeta('meta[property="og:title"]', 'property', 'og:title').setAttribute('content', ogTitle ?? title);
  ensureMeta('meta[property="og:description"]', 'property', 'og:description').setAttribute(
    'content',
    ogDescription ?? description,
  );
};
