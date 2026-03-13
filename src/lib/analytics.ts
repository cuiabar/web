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
const META_CONVERSIONS_ENDPOINT = '/api/meta-conversions';

type AnalyticsParams = Record<string, string | number | boolean | undefined>;
type MetaEventPayload = {
  eventName: string;
  eventId: string;
  customData?: AnalyticsParams;
  userData?: Record<string, string | undefined>;
  testEventCode?: string;
};

const isBrowser = () => typeof window !== 'undefined';

const getCookie = (name: string) => {
  if (!isBrowser()) {
    return undefined;
  }

  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));

  return match ? decodeURIComponent(match[1]) : undefined;
};

const getFbc = () => {
  const cookieValue = getCookie('_fbc');

  if (cookieValue) {
    return cookieValue;
  }

  if (!isBrowser()) {
    return undefined;
  }

  const fbclid = new URLSearchParams(window.location.search).get('fbclid');

  if (!fbclid) {
    return undefined;
  }

  return `fb.1.${Date.now()}.${fbclid}`;
};

const createEventId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `evt_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const sendMetaServerEvent = ({ eventName, eventId, customData, userData, testEventCode }: MetaEventPayload) => {
  if (!isBrowser()) {
    return;
  }

  const payload = {
    event_name: eventName,
    event_id: eventId,
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: window.location.href,
    user_data: {
      fbp: getCookie('_fbp'),
      fbc: getFbc(),
      ...userData,
    },
    custom_data: customData,
    test_event_code: testEventCode,
  };

  const body = JSON.stringify(payload);

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([body], { type: 'application/json' });

    navigator.sendBeacon(META_CONVERSIONS_ENDPOINT, blob);
    return;
  }

  void fetch(META_CONVERSIONS_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body,
    credentials: 'same-origin',
    keepalive: true,
  }).catch(() => undefined);
};

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (!isBrowser()) {
    return;
  }

  const eventId = createEventId();

  const params = {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: window.location.href,
  };

  window.gtag?.('event', 'page_view', params);
  window.fbq?.('track', 'PageView', undefined, { eventID: eventId });
  sendMetaServerEvent({
    eventName: 'PageView',
    eventId,
    customData: params,
  });
};

export const trackEvent = (eventName: string, params: AnalyticsParams = {}) => {
  if (!isBrowser()) {
    return;
  }

  const eventId = createEventId();

  window.gtag?.('event', eventName, params);
  window.fbq?.('trackCustom', eventName, params, { eventID: eventId });
  sendMetaServerEvent({
    eventName,
    eventId,
    customData: params,
  });
};

export const trackLead = (source: string, params: AnalyticsParams = {}) => {
  if (!isBrowser()) {
    return;
  }

  const eventId = createEventId();

  const leadParams = {
    lead_source: source,
    ...params,
  };

  window.gtag?.('event', 'generate_lead', leadParams);
  window.fbq?.('track', 'Lead', leadParams, { eventID: eventId });
  sendMetaServerEvent({
    eventName: 'Lead',
    eventId,
    customData: leadParams,
  });
};

export const trackContact = (channel: string, params: AnalyticsParams = {}) => {
  if (!isBrowser()) {
    return;
  }

  const eventId = createEventId();

  const contactParams = {
    contact_channel: channel,
    ...params,
  };

  window.gtag?.('event', 'contact', contactParams);
  window.fbq?.('track', 'Contact', contactParams, { eventID: eventId });
  sendMetaServerEvent({
    eventName: 'Contact',
    eventId,
    customData: contactParams,
  });
};

export const trackViewContent = (contentName: string, params: AnalyticsParams = {}) => {
  if (!isBrowser()) {
    return;
  }

  const eventId = createEventId();
  const contentParams = {
    content_name: contentName,
    ...params,
  };

  window.gtag?.('event', 'view_item', contentParams);
  window.fbq?.('track', 'ViewContent', contentParams, { eventID: eventId });
  sendMetaServerEvent({
    eventName: 'ViewContent',
    eventId,
    customData: contentParams,
  });
};

export const trackInitiateCheckout = (channel: string, params: AnalyticsParams = {}) => {
  if (!isBrowser()) {
    return;
  }

  const eventId = createEventId();
  const checkoutParams = {
    checkout_channel: channel,
    ...params,
  };

  window.gtag?.('event', 'begin_checkout', checkoutParams);
  window.fbq?.('track', 'InitiateCheckout', checkoutParams, { eventID: eventId });
  sendMetaServerEvent({
    eventName: 'InitiateCheckout',
    eventId,
    customData: checkoutParams,
  });
};
