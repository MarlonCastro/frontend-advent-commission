import { useState } from 'react';
import Select from 'react-select';
import { CheckCircle, Circle, Filter } from 'lucide-react';
import { useVotacao } from '../contexts/VotacaoContext';

type FiltroStatus = 'todos' | 'pendentes' | 'finalizados';

const MinisterioSelector = () => {
  const { ministerios, resultados, selecionarMinisterio, ministerioAtual } = useVotacao();
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>('todos');

  // Verifica se ministério está finalizado
  const isMinisterioFinalizado = (ministerioId: string) => {
    return resultados.some(r => r.ministerioId === ministerioId);
  };

  // Filtra ministérios baseado no status
  const ministeriosFiltrados = ministerios.filter(m => {
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
  }));

  // Opção customizada com status visual
  const formatOpcao = (data: any) => (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center space-x-2">
        {data.finalizado ? (
          <CheckCircle className="text-green-500" size={18} />
        ) : (
          <Circle className="text-gray-400" size={18} />
        )}
        <span className="font-medium">{data.label}</span>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${data.finalizado
        ? 'bg-green-100 text-green-800'
        : 'bg-yellow-100 text-yellow-800'
        }`}>
        {data.finalizado ? 'Finalizado' : 'Pendente'}
      </span>
    </div>
  );

  // Handle de seleção
  const handleSelecao = (opcao: any) => {
    if (opcao) {
      selecionarMinisterio(opcao.value);
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
          Todos ({ministerios.length})
        </button>
        <button
          onClick={() => setFiltroStatus('pendentes')}
          className={`px-4 py-2 rounded-lg font-medium transition ${filtroStatus === 'pendentes'
            ? 'bg-yellow-600 text-white'
            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }`}
        >
          Pendentes ({ministerios.filter(m => !isMinisterioFinalizado(m.id)).length})
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
        Exibindo <span className="font-semibold">{ministeriosFiltrados.length}</span> de{' '}
        <span className="font-semibold">{ministerios.length}</span> ministérios
      </div>
    </div>
  );
};

export default MinisterioSelector;

