import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  Church,
  CheckSquare,
  Square,
  Plus,
  Trash2,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  ListChecks,
  Users
} from 'lucide-react';
import { useVotacao } from '../contexts/VotacaoContext';
import PreCadastroMinisterios from './PreCadastroMinisterios';

const ConfiguracaoComissao = () => {
  const {
    ministerios,
    nomeIgreja,
    ministeriosSelecionados,
    departamentosPersonalizados,
    resultados,
    ministerioAtual,
    setNomeIgreja,
    toggleMinisterioSelecionado,
    adicionarDepartamentoPersonalizado,
    removerDepartamentoPersonalizado,
    selecionarTodosMinisterios,
    desselecionarTodosMinisterios,
    iniciarCronometroComissao,
  } = useVotacao();

  const navigate = useNavigate();

  // Estados locais para o formulário
  const [nomeDepartamento, setNomeDepartamento] = useState('');
  const [descricaoDepartamento, setDescricaoDepartamento] = useState('');
  const [vagasDepartamento, setVagasDepartamento] = useState(2);
  const [erro, setErro] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('Todos');
  const [abaAtiva, setAbaAtiva] = useState<'configuracao' | 'preCadastro'>('configuracao');

  // Obter categorias únicas
  const categorias = ['Todos', ...Array.from(new Set(ministerios.map(m => m.categoria)))];

  // Filtrar ministérios por categoria
  const ministeriosFiltrados = filtroCategoria === 'Todos'
    ? ministerios
    : ministerios.filter(m => m.categoria === filtroCategoria);

  const handleAdicionarDepartamento = () => {
    if (!nomeDepartamento.trim()) {
      setErro('Digite o nome do departamento');
      return;
    }

    if (!descricaoDepartamento.trim()) {
      setErro('Digite a descrição do departamento');
      return;
    }

    if (vagasDepartamento < 1 || vagasDepartamento > 10) {
      setErro('Número de vagas deve ser entre 1 e 10');
      return;
    }

    adicionarDepartamentoPersonalizado(nomeDepartamento.trim(), descricaoDepartamento.trim(), vagasDepartamento);
    setNomeDepartamento('');
    setDescricaoDepartamento('');
    setVagasDepartamento(2);
    setErro('');
  };

  const handleIniciarComissao = () => {
    if (!nomeIgreja.trim()) {
      setErro('Por favor, informe o nome da igreja');
      return;
    }

    if (ministeriosSelecionados.length === 0) {
      setErro('Selecione pelo menos um ministério ou departamento');
      return;
    }

    // Iniciar cronômetro geral da comissão
    iniciarCronometroComissao();

    navigate('/votacao');
  };

  // Verifica se já iniciou a comissão (tem resultados ou ministério em votação)
  const comissaoEmAndamento = resultados.length > 0 || ministerioAtual !== null;
  const textoBotao = comissaoEmAndamento ? 'Retomar Comissão' : 'Iniciar Comissão';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Configuração da Comissão</h1>
          </div>
          <p className="text-gray-600 ml-11 mb-4">
            Configure os ministérios que serão votados hoje e informe os dados da igreja
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 border-b border-gray-200">
            <button
              onClick={() => setAbaAtiva('configuracao')}
              className={`flex items-center gap-2 px-4 py-3 font-semibold transition border-b-2 ${abaAtiva === 'configuracao'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
            >
              <ListChecks size={20} />
              Configuração
            </button>
            <button
              onClick={() => setAbaAtiva('preCadastro')}
              className={`flex items-center gap-2 px-4 py-3 font-semibold transition border-b-2 ${abaAtiva === 'preCadastro'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
            >
              <Users size={20} />
              Pré-Cadastro
            </button>
          </div>
        </div>

        {/* Conteúdo da Aba Ativa */}
        {abaAtiva === 'configuracao' ? (
          <>
            {/* Layout em 2 Colunas - Configuração */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Coluna Esquerda - Seleção de Ministérios */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <CheckSquare className="text-blue-600" size={24} />
                    Ministérios e Departamentos
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Selecione os ministérios que serão votados nesta comissão
                  </p>

                  {/* Filtro por Categoria */}
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {categorias.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setFiltroCategoria(cat)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${filtroCategoria === cat
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Botões de Ação em Massa */}
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={selecionarTodosMinisterios}
                      className="flex-1 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 font-medium rounded-lg transition text-sm"
                    >
                      Selecionar Todos
                    </button>
                    <button
                      onClick={desselecionarTodosMinisterios}
                      className="flex-1 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition text-sm"
                    >
                      Limpar Seleção
                    </button>
                  </div>
                </div>

                {/* Lista de Ministérios */}
                <div className="space-y-2 max-h-[calc(100vh)] overflow-y-auto pr-2">
                  {/* Departamentos Personalizados - MOVIDO PARA O TOPO */}
                  {departamentosPersonalizados.length > 0 && (
                    <div className="pb-4 mb-4 border-b border-gray-200">
                      <p className="text-sm font-semibold text-purple-700 mb-2 flex items-center gap-2">
                        <Plus size={16} />
                        Departamentos Personalizados
                      </p>
                      {departamentosPersonalizados.map(dept => {
                        const isSelecionado = ministeriosSelecionados.includes(dept.id);
                        return (
                          <div
                            key={dept.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border-2 mb-2 ${isSelecionado
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200'
                              }`}
                          >
                            <button
                              onClick={() => toggleMinisterioSelecionado(dept.id)}
                              className="flex items-center gap-3 flex-1"
                            >
                              {isSelecionado ? (
                                <CheckSquare className="text-purple-600 flex-shrink-0" size={24} />
                              ) : (
                                <Square className="text-gray-400 flex-shrink-0" size={24} />
                              )}
                              <div className="flex-1 text-left min-w-0">
                                <p className={`font-semibold truncate ${isSelecionado ? 'text-purple-900' : 'text-gray-800'}`}>
                                  {dept.nome}
                                </p>
                                <p className="text-xs text-gray-500 truncate">{dept.descricao}</p>
                              </div>
                              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                {dept.cargos.length} {dept.cargos.length === 1 ? 'vaga' : 'vagas'}
                              </span>
                            </button>
                            <button
                              onClick={() => removerDepartamentoPersonalizado(dept.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Remover departamento"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Ministérios Padrão */}
                  {ministeriosFiltrados.map(ministerio => {
                    const isSelecionado = ministeriosSelecionados.includes(ministerio.id);
                    return (
                      <button
                        key={ministerio.id}
                        onClick={() => toggleMinisterioSelecionado(ministerio.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition ${isSelecionado
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        {isSelecionado ? (
                          <CheckSquare className="text-blue-600 flex-shrink-0" size={24} />
                        ) : (
                          <Square className="text-gray-400 flex-shrink-0" size={24} />
                        )}
                        <div className="flex-1 text-left min-w-0">
                          <p className={`font-semibold truncate ${isSelecionado ? 'text-blue-900' : 'text-gray-800'}`}>
                            {ministerio.nome}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{ministerio.descricao}</p>
                        </div>
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {ministerio.cargos.length} {ministerio.cargos.length === 1 ? 'vaga' : 'vagas'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Coluna Direita - Configurações */}
              <div className="space-y-6">
                {/* Nome da Igreja */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Church className="text-blue-600" size={24} />
                    Dados da Igreja
                  </h2>

                  <label className="block mb-2">
                    <span className="text-sm font-semibold text-gray-700 mb-2 block">
                      Nome da Igreja *
                    </span>
                    <input
                      type="text"
                      value={nomeIgreja}
                      onChange={(e) => setNomeIgreja(e.target.value)}
                      placeholder="Ex: Igreja Adventista Central"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      maxLength={100}
                    />
                  </label>

                  {nomeIgreja && (
                    <div className="mt-3 p-3 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                        <p className="text-sm text-green-800">
                          <span className="font-semibold">Igreja configurada:</span> {nomeIgreja}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Adicionar Departamento Personalizado */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Plus className="text-blue-600" size={24} />
                    Departamento Personalizado
                  </h2>

                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-sm font-semibold text-gray-700 mb-2 block">
                        Nome do Departamento
                      </span>
                      <input
                        type="text"
                        value={nomeDepartamento}
                        onChange={(e) => {
                          setNomeDepartamento(e.target.value);
                          setErro('');
                        }}
                        placeholder="Ex: Ministério de Tecnologia"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        maxLength={100}
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-semibold text-gray-700 mb-2 block">
                        Descrição
                      </span>
                      <textarea
                        value={descricaoDepartamento}
                        onChange={(e) => {
                          setDescricaoDepartamento(e.target.value);
                          setErro('');
                        }}
                        placeholder="Breve descrição das responsabilidades..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                        rows={3}
                        maxLength={500}
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-semibold text-gray-700 mb-2 block">
                        Número de Vagas
                      </span>
                      <input
                        type="number"
                        value={vagasDepartamento}
                        onChange={(e) => {
                          setVagasDepartamento(Number(e.target.value));
                          setErro('');
                        }}
                        min={1}
                        max={10}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </label>

                    <button
                      onClick={handleAdicionarDepartamento}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg"
                    >
                      <Plus size={20} />
                      Adicionar Departamento
                    </button>
                  </div>
                </div>

                {/* Resumo */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Resumo da Configuração</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Igreja:</span>
                      <span className="font-semibold text-gray-900">
                        {nomeIgreja || 'Não informado'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Ministérios Selecionados:</span>
                      <span className="font-semibold text-blue-600 text-lg">
                        {ministeriosSelecionados.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Departamentos Personalizados:</span>
                      <span className="font-semibold text-purple-600 text-lg">
                        {departamentosPersonalizados.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mensagem de Erro */}
            {erro && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-6 animate-shake">
                <div className="flex items-start gap-2">
                  <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-sm font-medium text-red-800">{erro}</p>
                </div>
              </div>
            )}

            {/* Botão de Ação */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <button
                onClick={handleIniciarComissao}
                disabled={!nomeIgreja.trim() || ministeriosSelecionados.length === 0}
                className={`w-full flex items-center justify-center gap-2 px-8 py-4 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition shadow-lg hover:shadow-xl ${comissaoEmAndamento
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {textoBotao}
                <ArrowRight size={24} />
              </button>
              {(!nomeIgreja.trim() || ministeriosSelecionados.length === 0) && (
                <p className="text-center text-sm text-gray-500 mt-3">
                  Preencha o nome da igreja e selecione pelo menos um ministério para continuar
                </p>
              )}
            </div>
          </>
        ) : (
          /* Aba de Pré-Cadastro */
          <>
            <div className="mb-6">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg mb-6">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Dica:</span> Preencha a liderança atual e possíveis interessados para cada ministério. Estes nomes aparecerão automaticamente como sugestões durante a votação.
                </p>
              </div>
              <PreCadastroMinisterios />
            </div>

            {/* Botão de Ação - Aba Pré-Cadastro */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <button
                onClick={handleIniciarComissao}
                disabled={!nomeIgreja.trim() || ministeriosSelecionados.length === 0}
                className={`w-full flex items-center justify-center gap-2 px-8 py-4 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition shadow-lg hover:shadow-xl ${comissaoEmAndamento
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {textoBotao}
                <ArrowRight size={24} />
              </button>
              {(!nomeIgreja.trim() || ministeriosSelecionados.length === 0) && (
                <p className="text-center text-sm text-gray-500 mt-3">
                  Preencha o nome da igreja e selecione pelo menos um ministério para continuar
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Estilos de animação */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ConfiguracaoComissao;

