import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackContact, trackEvent, trackLead, trackPageView } from '../lib/analytics';

const getAnchor = (target: EventTarget | null) => {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest('a');
};

const classifyInternalPath = (pathname: string) => {
  switch (pathname) {
    case '/menu':
      return { eventName: 'open_menu_page' };
    case '/pesquisa':
      return { eventName: 'open_pesquisa_page' };
    case '/burguer':
      return { eventName: 'open_burguer_page' };
    case '/prorefeicao':
      return { eventName: 'open_prorefeicao_page' };
    case '/reservas':
      return { eventName: 'open_reservas_page' };
    case '/vagas':
      return { eventName: 'open_vagas_page' };
    default:
      return null;
  }
};

export const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      trackPageView(`${location.pathname}${location.search}${location.hash}`, document.title);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [location.hash, location.pathname, location.search]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const anchor = getAnchor(event.target);

      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute('href');

      if (!href || href.startsWith('#')) {
        return;
      }

      let url: URL;

      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }

      const label = anchor.textContent?.trim().replace(/\s+/g, ' ').slice(0, 80) || url.pathname;
      const params = {
        href: url.href,
        label,
        page_path: window.location.pathname,
      };

      if (url.href.includes('whatsapp.com/channel/')) {
        trackEvent('join_whatsapp_channel', params);
        return;
      }

      if (url.hostname === 'wa.me') {
        trackContact('whatsapp', params);
        return;
      }

      if (url.hostname.includes('expresso.cuiabar.com')) {
        trackEvent('click_order_site', params);
        return;
      }

      if (url.hostname.includes('ifood.com.br')) {
        trackEvent('click_order_ifood', params);
        return;
      }

      if (url.hostname.includes('99app.com')) {
        trackEvent('click_order_99food', params);
        return;
      }

      if (url.hostname.includes('instagram.com')) {
        trackEvent('click_instagram', params);
        return;
      }

      if (url.hostname.includes('form.jotform.com')) {
        trackLead('job_application', params);
        return;
      }

      if (url.protocol === 'mailto:') {
        trackContact('email', params);
        return;
      }

      if (url.origin === window.location.origin) {
        const internal = classifyInternalPath(url.pathname);

        if (internal) {
          trackEvent(internal.eventName, params);
        }
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  return null;
};
