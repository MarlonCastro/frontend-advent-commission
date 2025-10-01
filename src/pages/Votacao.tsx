import { useNavigate } from 'react-router-dom';
import { useVotacao } from '../contexts/VotacaoContext';
import ProgressBar from '../components/ProgressBar';
import MinisterioSelector from '../components/MinisterioSelector';
import EtapaIndicador from '../components/EtapaIndicador';
import { useEffect } from 'react';

const Votacao = () => {
  const { ministerioAtual, etapaAtual } = useVotacao();
  const navigate = useNavigate();

  // Redirecionar para a rota apropriada baseado na etapa
  useEffect(() => {
    if (ministerioAtual && etapaAtual) {
      switch (etapaAtual) {
        case 1:
          navigate('/votacao/explicacao');
          break;
        case 2:
          navigate('/votacao/indicacao');
          break;
        case 3:
          navigate('/votacao/votando');
          break;
      }
    }
  }, [ministerioAtual, etapaAtual, navigate]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sistema de Votação</h1>
        <p className="text-gray-600">
          Gerencie o processo de votação para os ministérios da igreja
        </p>
      </div>

      <ProgressBar />
      <MinisterioSelector />
      <EtapaIndicador />
    </div>
  );
};

export default Votacao;

