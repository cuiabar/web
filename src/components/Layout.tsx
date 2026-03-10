import type { PropsWithChildren } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton';

export const Layout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    <main className="pt-24">{children}</main>
    <Footer />
    <WhatsAppFloatingButton />
  </>
);
