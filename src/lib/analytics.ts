declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export const GOOGLE_ADS_ID = 'AW-11311363070';
export const GOOGLE_TAG_ID = 'GT-5528H7SD';
export const META_PIXEL_ID = '1385099743118536';

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

const isBrowser = () => typeof window !== 'undefined';

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (!isBrowser()) {
    return;
  }

  const params = {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: window.location.href,
  };

  window.gtag?.('event', 'page_view', params);
  window.fbq?.('track', 'PageView');
};

export const trackEvent = (eventName: string, params: AnalyticsParams = {}) => {
  if (!isBrowser()) {
    return;
  }

  window.gtag?.('event', eventName, params);
  window.fbq?.('trackCustom', eventName, params);
};

export const trackLead = (source: string, params: AnalyticsParams = {}) => {
  if (!isBrowser()) {
    return;
  }

  const leadParams = {
    lead_source: source,
    ...params,
  };

  window.gtag?.('event', 'generate_lead', leadParams);
  window.fbq?.('track', 'Lead', leadParams);
};

export const trackContact = (channel: string, params: AnalyticsParams = {}) => {
  if (!isBrowser()) {
    return;
  }

  const contactParams = {
    contact_channel: channel,
    ...params,
  };

  window.gtag?.('event', 'contact', contactParams);
  window.fbq?.('track', 'Contact', contactParams);
};
