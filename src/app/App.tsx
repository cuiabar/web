import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';

const HomePage = lazy(() => import('../pages/HomePage'));
const BlogPage = lazy(() => import('../pages/BlogPage'));
const ProRefeicaoPage = lazy(() => import('../pages/ProRefeicaoPage'));
const PedidosOnlinePage = lazy(() => import('../pages/PedidosOnlinePage'));
const ReservasPage = lazy(() => import('../pages/ReservasPage'));

export const App = () => (
  <Suspense fallback={<div className="container-shell py-24">Carregando experiência Cuiabar...</div>}>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/prorefeicao" element={<ProRefeicaoPage />} />
        <Route path="/pedidos-online" element={<PedidosOnlinePage />} />
        <Route path="/reservas" element={<ReservasPage />} />
      </Routes>
    </Layout>
  </Suspense>
);
