import { useState } from 'react';
import Select from 'react-select';
import { CheckCircle, Circle, Filter, XCircle, RotateCcw } from 'lucide-react';
import { useVotacao } from '../contexts/VotacaoContext';

type FiltroStatus = 'todos' | 'pendentes' | 'finalizados';

const MinisterioSelector = () => {
  const { ministeriosDisponiveis, resultados, selecionarMinisterio, ministerioAtual, reabrirIndicacao } = useVotacao();
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>('todos');

  // Verifica se ministério está finalizado
  const isMinisterioFinalizado = (ministerioId: string) => {
    return resultados.some(r => r.ministerioId === ministerioId);
  };

  // Verifica se ministério foi encerrado sem candidatos
  const isMinisterioSemCandidatos = (ministerioId: string) => {
    const resultado = resultados.find(r => r.ministerioId === ministerioId);
    return resultado?.semCandidatos === true;
  };

  // Filtra ministérios baseado no status
  const ministeriosFiltrados = ministeriosDisponiveis.filter(m => {
    if (filtroStatus === 'finalizados') {
      return isMinisterioFinalizado(m.id);
    }
    if (filtroStatus === 'pendentes') {
      return !isMinisterioFinalizado(m.id);
    }
    return true; // todos
  });

  // Prepara opções para o React-Select
  const opcoes = ministeriosFiltrados.map(m => ({
    value: m.id,
    label: m.nome,
    ministerio: m,
    finalizado: isMinisterioFinalizado(m.id),
    semCandidatos: isMinisterioSemCandidatos(m.id),
  }));

  // Opção customizada com status visual
  const formatOpcao = (data: any) => (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center space-x-2">
        {data.semCandidatos ? (
          <XCircle className="text-orange-500" size={18} />
        ) : data.finalizado ? (
          <CheckCircle className="text-green-500" size={18} />
        ) : (
          <Circle className="text-gray-400" size={18} />
        )}
        <span className="font-medium">{data.label}</span>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${data.semCandidatos
        ? 'bg-orange-100 text-orange-800'
        : data.finalizado
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800'
        }`}>
        {data.semCandidatos ? 'Sem Candidatos' : data.finalizado ? 'Finalizado' : 'Pendente'}
      </span>
    </div>
  );

  // Handle de seleção
  const handleSelecao = (opcao: any) => {
    if (opcao) {
      selecionarMinisterio(opcao.value);
      // Modal de explicação abrirá automaticamente na mesma página
    }
  };

  // Valor atual selecionado
  const valorAtual = ministerioAtual
    ? opcoes.find(o => o.value === ministerioAtual.id)
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Selecionar Ministério</h2>
        </div>
      </div>

      {/* Filtros de Status */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFiltroStatus('todos')}
          className={`px-4 py-2 rounded-lg font-medium transition ${filtroStatus === 'todos'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          Todos ({ministeriosDisponiveis.length})
        </button>
        <button
          onClick={() => setFiltroStatus('pendentes')}
          className={`px-4 py-2 rounded-lg font-medium transition ${filtroStatus === 'pendentes'
            ? 'bg-yellow-600 text-white'
            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }`}
        >
          Pendentes ({ministeriosDisponiveis.filter(m => !isMinisterioFinalizado(m.id)).length})
        </button>
        <button
          onClick={() => setFiltroStatus('finalizados')}
          className={`px-4 py-2 rounded-lg font-medium transition ${filtroStatus === 'finalizados'
            ? 'bg-green-600 text-white'
            : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
        >
          Finalizados ({resultados.length})
        </button>
      </div>

      {/* Select de Ministérios */}
      <Select
        value={valorAtual}
        onChange={handleSelecao}
        options={opcoes}
        formatOptionLabel={formatOpcao}
        placeholder="Buscar e selecionar ministério..."
        noOptionsMessage={() => "Nenhum ministério encontrado"}
        className="react-select-container"
        classNamePrefix="react-select"
        isClearable
        isSearchable
        styles={{
          control: (base) => ({
            ...base,
            minHeight: '48px',
            borderColor: '#e5e7eb',
            '&:hover': {
              borderColor: '#3b82f6',
            },
          }),
          menu: (base) => ({
            ...base,
            zIndex: 50,
          }),
        }}
      />

      {/* Contador */}
      <div className="mt-4 text-sm text-gray-600">
        Exibindo <span className="font-semibold">{ministeriosFiltrados?.length}</span> de{' '}
        <span className="font-semibold">{ministeriosDisponiveis?.length}</span> ministérios
      </div>

      {/* Lista de Ministérios Sem Candidatos (se houver) */}
      {ministeriosDisponiveis.filter(m => isMinisterioSemCandidatos(m.id)).length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="text-orange-600" size={18} />
            <h3 className="text-sm font-semibold text-gray-700">Ministérios sem candidatos</h3>
          </div>
          <div className="space-y-2">
            {ministeriosDisponiveis.filter(m => isMinisterioSemCandidatos(m.id)).map(ministerio => (
              <div key={ministerio.id} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <span className="font-medium text-orange-900 text-sm">{ministerio.nome}</span>
                <button
                  onClick={() => reabrirIndicacao(ministerio.id)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-md transition"
                  title="Reabrir indicação para este ministério"
                >
                  <RotateCcw size={14} />
                  Reabrir
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinisterioSelector;

