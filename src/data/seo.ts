import seoRoutesJson from './seoRoutes.json';

type SchemaBlock = Record<string, unknown>;

export type RouteSeo = {
  title: string;
  description: string;
  image?: string;
  type?: string;
  changefreq?: string;
  priority?: string;
  schema?: SchemaBlock[];
};

type SeoRoutesJson = {
  siteOrigin: string;
  defaultImage: string;
  routes: Record<string, RouteSeo>;
};

const seoRoutes = seoRoutesJson as SeoRoutesJson;

export const siteOrigin = seoRoutes.siteOrigin;
export const defaultSeoImage = seoRoutes.defaultImage;
export const routeSeo = seoRoutes.routes;

export const getRouteSeo = (path: string): RouteSeo =>
  routeSeo[path] ?? routeSeo['/'];
