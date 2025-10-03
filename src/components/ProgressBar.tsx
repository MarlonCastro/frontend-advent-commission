import { useState, useEffect } from 'react';
import { Clock, CheckCircle2, TrendingUp, Timer } from 'lucide-react';
import { useVotacao } from '../contexts/VotacaoContext';

const ProgressBar = () => {
  const { progressoGeral, ministerioAtual, ministeriosDisponiveis, resultados, tempoEstimado, inicioComissao } = useVotacao();
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const [duracaoFinal, setDuracaoFinal] = useState<number | null>(null);

  const todosFinalizados = progressoGeral === 100 && ministeriosDisponiveis.length > 0;

  // Atualizar cronômetro a cada segundo (só se não estiver finalizado)
  useEffect(() => {
    if (!inicioComissao) {
      setTempoDecorrido(0);
      setDuracaoFinal(null);
      return;
    }

    // Se todos finalizados, parar cronômetro e salvar duração final
    if (todosFinalizados) {
      if (duracaoFinal === null) {
        const agora = Date.now();
        const segundos = Math.floor((agora - inicioComissao) / 1000);
        setDuracaoFinal(segundos);
        setTempoDecorrido(segundos);
      }
      return;
    }

    // Continuar contando se ainda não finalizou
    const interval = setInterval(() => {
      const agora = Date.now();
      const segundos = Math.floor((agora - inicioComissao) / 1000);
      setTempoDecorrido(segundos);
    }, 1000);

    return () => clearInterval(interval);
  }, [inicioComissao, todosFinalizados, duracaoFinal]);

  // Formata tempo em segundos para formato legível
  const formatarTempo = (segundos: number) => {
    if (segundos === 0) return '--';

    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);

    if (horas > 0) {
      return `${horas}h ${minutos}min`;
    }
    return `${minutos} minutos`;
  };

  // Formata cronômetro (HH:MM:SS)
  const formatarCronometro = (segundos: number) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const secs = segundos % 60;

    if (horas > 0) {
      return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutos.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const ministeriosFinalizados = resultados.length;
  const ministeriosTotal = ministeriosDisponiveis.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-4">
        {/* Título */}
        <div className="flex items-center space-x-2">
          <TrendingUp className="text-blue-600" size={24} />
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Progresso Geral</h2>
        </div>

        {/* Cronômetro e Porcentagem */}
        <div className="flex items-center justify-between md:justify-end gap-3 md:gap-6">
          {/* Cronômetro Geral / Duração Final */}
          {inicioComissao && (
            <div className={`text-center md:text-right px-3 md:px-4 py-2 rounded-lg border ${todosFinalizados
              ? 'bg-green-50 border-green-200'
              : 'bg-blue-50 border-blue-200'
              }`}>
              <div className="flex items-center gap-2">
                <Timer className={todosFinalizados ? 'text-green-600' : 'text-blue-600'} size={16} md-size={18} />
                <span className={`text-base md:text-lg font-mono font-bold ${todosFinalizados ? 'text-green-600' : 'text-blue-600'
                  }`}>
                  {formatarCronometro(duracaoFinal || tempoDecorrido)}
                </span>
              </div>
              <p className={`text-xs ${todosFinalizados ? 'text-green-700' : 'text-blue-700'}`}>
                {todosFinalizados ? 'Duração Total' : 'Tempo Total'}
              </p>
            </div>
          )}

          {/* Porcentagem */}
          <div className="text-center md:text-right">
            <span className="text-2xl md:text-3xl font-bold text-blue-600">{progressoGeral}%</span>
            <p className="text-xs text-gray-500">Concluído</p>
          </div>
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

