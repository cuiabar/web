import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';

const HomePage = lazy(() => import('../pages/HomePage'));
const MenuPage = lazy(() => import('../pages/MenuPage'));
const ProRefeicaoPage = lazy(() => import('../pages/ProRefeicaoPage'));
const PedidosOnlinePage = lazy(() => import('../pages/PedidosOnlinePage'));
const PesquisaPage = lazy(() => import('../pages/PesquisaPage'));
const ReservasPage = lazy(() => import('../pages/ReservasPage'));
const VagasPage = lazy(() => import('../pages/VagasPage'));
const BurguerCuiabarPage = lazy(() => import('../pages/BurguerCuiabarPage'));
const MarmitaPage = lazy(() => import('../pages/MarmitaPage'));
const EspetariaCuiabarPage = lazy(() => import('../pages/EspetariaCuiabarPage'));
const LinksPage = lazy(() => import('../pages/LinksPage'));

export const App = () => (
  <Suspense fallback={<div className="container-shell py-24">Carregando Villa Cuiabar...</div>}>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Navigate to="/" replace />} />
        <Route path="/bio" element={<Navigate to="/links" replace />} />
        <Route path="/acessos" element={<Navigate to="/links" replace />} />
        <Route path="/burger" element={<Navigate to="/burguer" replace />} />
        <Route path="/burguer-cuiabar" element={<Navigate to="/burguer" replace />} />
        <Route path="/burguer" element={<BurguerCuiabarPage />} />
        <Route path="/marmita" element={<MarmitaPage />} />
        <Route path="/espetaria" element={<EspetariaCuiabarPage />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/prorefeicao" element={<ProRefeicaoPage />} />
        <Route path="/pedidos-online" element={<PedidosOnlinePage />} />
        <Route path="/pesquisa" element={<PesquisaPage />} />
        <Route path="/reservas" element={<ReservasPage />} />
        <Route path="/vagas" element={<VagasPage />} />
      </Routes>
    </Layout>
  </Suspense>
);
