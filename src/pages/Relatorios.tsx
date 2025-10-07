import { useState } from 'react';
import { Trophy, Users, Download, FileText, Target, XCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { useVotacao } from '../contexts/VotacaoContext';
import { gerarRelatorioCompleto, gerarRelatorioObjetivo } from '../utils/gerarPDF';

const Relatorios = () => {
  const { resultados, nomeIgreja, ministeriosDisponiveis, getNumeroVagas } = useVotacao();
  const [showEscolhaPDF, setShowEscolhaPDF] = useState(false);
  const [expandedResults, setExpandedResults] = useState<Set<number>>(new Set());

  const handleGerarCompleto = () => {
    gerarRelatorioCompleto(nomeIgreja, resultados);
    setShowEscolhaPDF(false);
  };

  const handleGerarObjetivo = () => {
    gerarRelatorioObjetivo(nomeIgreja, resultados, getNumeroVagas);
    setShowEscolhaPDF(false);
  };

  const toggleResult = (index: number) => {
    const newExpanded = new Set(expandedResults);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedResults(newExpanded);
  };

  const expandAll = () => {
    const allExpanded = new Set(resultados.map((_, index) => index));
    setExpandedResults(allExpanded);
  };

  const collapseAll = () => {
    setExpandedResults(new Set());
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Trophy className="text-yellow-600 flex-shrink-0" size={28} />
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 truncate">Resultados da Votação</h1>
              <p className="text-sm md:text-base text-gray-600 truncate">{nomeIgreja}</p>
            </div>
          </div>
          <button
            onClick={() => setShowEscolhaPDF(true)}
            disabled={resultados.length === 0}
            className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition shadow-lg hover:shadow-xl text-sm md:text-base whitespace-nowrap"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Gerar Relatório</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>

      {/* Modal de Escolha do Tipo de PDF */}
      {showEscolhaPDF && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowEscolhaPDF(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-md w-full m-4 animate-scaleIn">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Escolha o Tipo de Relatório</h3>

            <div className="space-y-3 mb-6">
              {/* Relatório Completo */}
              <button
                onClick={handleGerarCompleto}
                className="w-full p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 rounded-lg transition text-left"
              >
                <div className="flex items-start gap-3">
                  <FileText className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-bold text-blue-900 mb-1">Relatório Completo</p>
                    <p className="text-sm text-blue-700">
                      Inclui todos os candidatos, votos detalhados, porcentagens e classificação completa
                    </p>
                  </div>
                </div>
              </button>

              {/* Relatório Objetivo */}
              <button
                onClick={handleGerarObjetivo}
                className="w-full p-4 bg-green-50 hover:bg-green-100 border-2 border-green-300 rounded-lg transition text-left"
              >
                <div className="flex items-start gap-3">
                  <Target className="text-green-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-bold text-green-900 mb-1">Relatório Objetivo</p>
                    <p className="text-sm text-green-700">
                      Mostra apenas os vencedores eleitos para cada vaga disponível
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowEscolhaPDF(false)}
              className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo */}
      {resultados.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Users className="mx-auto text-gray-300 mb-4" size={64} />
          <p className="text-gray-500 text-lg">Nenhuma votação finalizada ainda</p>
          <p className="text-gray-400 text-sm mt-2">
            Os resultados aparecerão aqui conforme você finalizar as votações
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Resumo Geral */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Resumo Geral</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Total de Ministérios</p>
                <p className="text-3xl font-bold text-blue-600">{ministeriosDisponiveis.length}</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Votações Finalizadas</p>
                <p className="text-3xl font-bold text-green-600">{resultados.length}</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Pendentes</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {ministeriosDisponiveis.length - resultados.length}
                </p>
              </div>
            </div>
          </div>

          {/* Controles de Expansão */}
          {resultados.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Users className="text-gray-600" size={20} />
                  <span className="text-sm font-medium text-gray-700">
                    {resultados.length} resultado{resultados.length !== 1 ? 's' : ''} encontrado{resultados.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={expandAll}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium rounded-lg transition"
                  >
                    <ChevronDown size={16} />
                    Expandir Todos
                  </button>
                  <button
                    onClick={collapseAll}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition"
                  >
                    <ChevronRight size={16} />
                    Colapsar Todos
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Lista de Resultados */}
          {resultados.map((resultado, index) => {
            // Tratamento especial para ministérios sem candidatos
            if (resultado.semCandidatos) {
              const isExpanded = expandedResults.has(index);
              return (
                <div key={index} className="bg-orange-50 border-2 border-orange-300 rounded-lg shadow-md">
                  {/* Header clicável */}
                  <button
                    onClick={() => toggleResult(index)}
                    className="w-full p-4 flex items-center gap-3 hover:bg-orange-100 transition rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <XCircle className="text-orange-600" size={20} />
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-lg font-bold text-orange-900 truncate">
                        {resultado.ministerioNome}
                      </h3>
                      <p className="text-sm text-orange-700 truncate">
                        Sem candidatos indicados
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronDown className="text-orange-600" size={20} />
                      ) : (
                        <ChevronRight className="text-orange-600" size={20} />
                      )}
                    </div>
                  </button>

                  {/* Conteúdo expandível */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-orange-200">
                      <div className="pt-4 space-y-3">
                        <p className="text-sm text-orange-700">
                          Este ministério foi encerrado <span className="font-semibold">sem candidatos indicados</span>.
                        </p>
                        <div className="bg-white border border-orange-200 rounded-lg p-3">
                          <p className="text-xs text-orange-800">
                            <span className="font-semibold">Observação:</span> A indicação pode ser reaberta através do seletor de ministérios na página principal.
                          </p>
                        </div>
                        <div className="text-xs text-orange-600">
                          Encerrado em {new Date(resultado.timestamp).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            const totalVotos = resultado.candidatos.reduce((acc, c) => acc + c.votos, 0);
            const candidatosOrdenados = [...resultado.candidatos].sort((a, b) => b.votos - a.votos);

            const isExpanded = expandedResults.has(index);
            return (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
                {/* Header clicável */}
                <button
                  onClick={() => toggleResult(index)}
                  className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Trophy className="text-blue-600" size={20} />
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-bold text-gray-800 truncate">
                      {resultado.ministerioNome}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">{resultado.cargoNome}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-lg font-bold text-blue-600">{totalVotos}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronDown className="text-gray-600" size={20} />
                      ) : (
                        <ChevronRight className="text-gray-600" size={20} />
                      )}
                    </div>
                  </div>
                </button>

                {/* Conteúdo expandível */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-200">
                    <div className="pt-4 space-y-4">
                      {/* Eleito */}
                      {resultado.vencedor && (
                        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-400 rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <Trophy className="text-yellow-600" size={24} />
                            <div className="flex-1">
                              <p className="text-xs font-medium text-yellow-800">Eleito(a)</p>
                              <p className="text-lg font-bold text-yellow-900 truncate">{resultado.vencedor}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-yellow-600">
                                {candidatosOrdenados[0].votos}
                              </p>
                              <p className="text-xs text-yellow-700">votos</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Lista de Candidatos */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700 text-xs mb-2">Todos os Candidatos:</h4>
                        {candidatosOrdenados.map((candidato, idx) => {
                          const porcentagem = totalVotos > 0
                            ? ((candidato.votos / totalVotos) * 100).toFixed(1)
                            : '0';
                          const isVencedor = idx === 0;

                          return (
                            <div
                              key={candidato.id}
                              className={`flex items-center justify-between p-2 rounded-lg ${isVencedor
                                ? 'bg-yellow-50 border-l-2 border-yellow-500'
                                : 'bg-gray-50'
                                }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${isVencedor
                                  ? 'bg-yellow-500 text-white'
                                  : 'bg-gray-300 text-gray-700'
                                  }`}>
                                  {idx + 1}
                                </span>
                                <span className={`font-medium text-sm truncate ${isVencedor ? 'text-yellow-900' : 'text-gray-800'}`}>
                                  {candidato.nome}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <span className="font-bold text-sm text-gray-800">{candidato.votos}</span>
                                  <span className="text-xs text-gray-600 ml-1">votos</span>
                                </div>
                                <span className="text-xs font-medium text-gray-600 min-w-[40px] text-right">
                                  {porcentagem}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Info Adicional */}
                      <div className="pt-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-600">
                        <span>
                          Finalizado em {new Date(resultado.timestamp).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <span>
                          Tempo: {Math.floor(resultado.tempoGasto / 60)} min {resultado.tempoGasto % 60} seg
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Estilos */}
      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Relatorios;
