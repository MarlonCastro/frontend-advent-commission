import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VotacaoProvider } from './contexts/VotacaoContext';
import AppLayout from './components/AppLayout';
import Layout from './components/Layout';
import Home from './pages/Home';
import Ministerios from './pages/Ministerios';
import Resultados from './pages/Resultados';
import Votacao from './pages/Votacao';
import Assembleia from './pages/Assembleia';
import Relatorios from './pages/Relatorios';

function App() {
  return (
    <VotacaoProvider>
      <Router>
        <Routes>
          {/* Rotas com Layout Antigo (páginas informativas) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="ministerios" element={<Ministerios />} />
            <Route path="resultados" element={<Resultados />} />
          </Route>

          {/* Rotas com Novo Layout (sistema de votação) */}
          <Route path="/" element={<AppLayout />}>
            <Route path="votacao" element={<Votacao />} />
            <Route path="assembleia" element={<Assembleia />} />
            <Route path="relatorios" element={<Relatorios />} />
          </Route>
        </Routes>
      </Router>
    </VotacaoProvider>
  );
}

export default App;
