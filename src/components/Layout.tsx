import type { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { AnalyticsTracker } from './AnalyticsTracker';
import { Footer } from './Footer';
import { Header } from './Header';
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton';

export const Layout = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';
  const isLinksRoute = ['/links', '/bio', '/acessos'].includes(normalizedPath);

  if (isLinksRoute) {
    return (
      <>
        <AnalyticsTracker />
        <main>
          <div key={location.pathname} className="page-transition">
            {children}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AnalyticsTracker />
      <Header />
      <main className="pt-24">
        <div key={location.pathname} className="page-transition">
          {children}
        </div>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
};
