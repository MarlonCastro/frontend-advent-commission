import ProgressBar from '../components/ProgressBar';
import MinisterioSelector from '../components/MinisterioSelector';
import EtapaIndicador from '../components/EtapaIndicador';
import ComponenteExplicacao from '../components/ComponenteExplicacao';
import FormularioIndicacao from '../components/FormularioIndicacao';
import TelaPrincipalVotacao from '../components/TelaPrincipalVotacao';

const Votacao = () => {
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

      {/* Componente de Explicação - Etapa 1 */}
      <ComponenteExplicacao
        tempoLeitura={120}
        autoAvancar={false}
      />

      {/* Formulário de Indicação - Etapa 2 */}
      <FormularioIndicacao />

      {/* Tela Principal de Votação - Etapa 3 */}
      <TelaPrincipalVotacao />
    </div>
  );
};

export default Votacao;

