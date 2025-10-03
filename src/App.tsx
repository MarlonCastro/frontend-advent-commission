import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { VotacaoProvider } from './contexts/VotacaoContext';
import AppLayout from './components/AppLayout';
import Layout from './components/Layout';
import Home from './pages/Home';
import Ministerios from './pages/Ministerios';
import Resultados from './pages/Resultados';
import Votacao from './pages/Votacao';
import Assembleia from './pages/Assembleia';
import Relatorios from './pages/Relatorios';
import Ajuda from './pages/Ajuda';
import FormularioIndicacao from './components/FormularioIndicacao';
import TelaPrincipalVotacao from './components/TelaPrincipalVotacao';
import ConfiguracaoComissao from './components/ConfiguracaoComissao';
import BotaoDoacao from './components/BotaoDoacao';

function App() {
  return (
    <VotacaoProvider>
      <Router>
        <BotaoDoacao />
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
            <Route path="ajuda" element={<Ajuda />} />
          </Route>

          {/* Rotas sem Layout (tela cheia para etapas) */}
          <Route path="votacao">
            <Route path="configuracao" element={<ConfiguracaoComissao />} />
            <Route path="indicacao" element={<FormularioIndicacao />} />
            <Route path="votando" element={<TelaPrincipalVotacao />} />
          </Route>
        </Routes>
      </Router>
    </VotacaoProvider>
  );
}

export default App;
