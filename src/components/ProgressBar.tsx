import { Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { useVotacao } from '../contexts/VotacaoContext';

const ProgressBar = () => {
  const { progressoGeral, ministerioAtual, ministerios, resultados, tempoEstimado } = useVotacao();

  // Formata tempo em segundos para formato legível
  const formatarTempo = (segundos: number) => {
    if (segundos === 0) return 'Calculando...';

    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);

    if (horas > 0) {
      return `${horas}h ${minutos}min`;
    }
    return `${minutos} minutos`;
  };

  const ministeriosFinalizados = resultados.length;
  const ministeriosTotal = ministerios.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TrendingUp className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Progresso Geral</h2>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-blue-600">{progressoGeral}%</span>
          <p className="text-xs text-gray-500">Concluído</p>
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
            style={{ width: `${progressoGeral}%` }}
          >
            {progressoGeral > 10 && (
              <span className="text-xs font-bold text-white">{progressoGeral}%</span>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{ministeriosFinalizados} finalizados</span>
          <span>{ministeriosTotal - ministeriosFinalizados} pendentes</span>
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Ministério Atual */}
        <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-blue-900 mb-1">Ministério Atual</p>
            <p className="text-sm text-blue-800 font-medium truncate">
              {ministerioAtual ? ministerioAtual.nome : 'Nenhum selecionado'}
            </p>
          </div>
        </div>

        {/* Estimativa de Término */}
        <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <Clock className="text-green-600 flex-shrink-0 mt-1" size={20} />
          <div className="flex-1">
            <p className="text-xs font-semibold text-green-900 mb-1">Tempo Estimado</p>
            <p className="text-sm text-green-800 font-medium">
              {formatarTempo(tempoEstimado)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

