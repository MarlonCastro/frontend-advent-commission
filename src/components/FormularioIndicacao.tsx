import { useState, useEffect } from 'react';
import { UserPlus, AlertCircle, CheckCircle, ArrowRight, ArrowLeft, Users, Crown, UserCheck, History } from 'lucide-react';
import { useVotacao } from '../contexts/VotacaoContext';
import ListaCandidatos from './ListaCandidatos';
import { useNavigate } from 'react-router-dom';

const FormularioIndicacaoV2 = () => {
  const {
    ministerioAtual,
    etapaAtual,
    candidatos,
    adicionarCandidato,
    removerCandidato,
    proximaEtapa,
    voltarEtapa,
    getPreCadastro,
    resultados,
    getNumeroVagas
  } = useVotacao();

  const navigate = useNavigate();
  const [nomeInput, setNomeInput] = useState('');
  const [erro, setErro] = useState('');

  // Separar sugestões por categoria
  const [liderancaAtual, setLiderancaAtual] = useState<{ diretor: string; diretorAssociado?: string }>({ diretor: '' });
  const [interessados, setInteressados] = useState<string[]>([]);
  const [historico, setHistorico] = useState<string[]>([]);

  // Carregar sugestões categorizadas
  useEffect(() => {
    if (ministerioAtual) {
      // Pré-cadastro
      const preCadastro = getPreCadastro(ministerioAtual.id);
      if (preCadastro) {
        setLiderancaAtual(preCadastro.liderancaAtual);
        setInteressados(preCadastro.interessados);
      } else {
        setLiderancaAtual({ diretor: '' });
        setInteressados([]);
      }

      // Histórico
      const candidatosAnteriores = new Set<string>();
      resultados.forEach(resultado => {
        resultado.candidatos.forEach(candidato => {
          candidatosAnteriores.add(candidato.nome);
        });
      });
      setHistorico(Array.from(candidatosAnteriores));
    }
  }, [ministerioAtual, getPreCadastro, resultados]);

  const validarNome = (nome: string): string | null => {
    const nomeTrimmed = nome.trim();

    if (!nomeTrimmed) {
      return 'Por favor, digite um nome';
    }

    if (nomeTrimmed.length < 3) {
      return 'O nome deve ter pelo menos 3 caracteres';
    }

    if (nomeTrimmed.length > 100) {
      return 'O nome é muito longo (máximo 100 caracteres)';
    }

    // Verificar duplicados
    const nomeDuplicado = candidatos.some(
      c => c.nome.toLowerCase() === nomeTrimmed.toLowerCase()
    );

    if (nomeDuplicado) {
      return 'Este candidato já foi adicionado';
    }

    return null;
  };

  const handleAdicionar = () => {
    const erroValidacao = validarNome(nomeInput);

    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    adicionarCandidato(nomeInput.trim());
    setNomeInput('');
    setErro('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdicionar();
    }
  };

  const handleSugestaoClick = (nome: string) => {
    setNomeInput(nome);
  };

  const handleProximaEtapa = () => {
    if (candidatos.length === 0) {
      setErro('Adicione pelo menos 1 candidato antes de prosseguir');
      return;
    }

    // Alerta se número de candidatos diferente do número de vagas
    if (candidatos.length !== numeroVagas) {
      const confirmar = window.confirm(
        `Atenção!\n\nNúmero de candidatos (${candidatos.length}) é diferente do número de vagas (${numeroVagas}).\n\nDeseja continuar mesmo assim?`
      );
      if (!confirmar) {
        return;
      }
    }

    proximaEtapa();
    navigate('/votacao/votando');
  };

  const handleVoltarEtapa = () => {
    voltarEtapa();
    navigate('/votacao/explicacao');
  };

  if (!ministerioAtual || etapaAtual !== 2) {
    return null;
  }

  const numeroVagas = getNumeroVagas(ministerioAtual.id);
  const temPoucosCandidatos = candidatos.length < numeroVagas;

  // Filtrar nomes que já foram adicionados
  const jaAdicionado = (nome: string) => candidatos.some(c => c.nome.toLowerCase() === nome.toLowerCase());

  const liderancaDisponivel = {
    diretor: liderancaAtual.diretor && !jaAdicionado(liderancaAtual.diretor) ? liderancaAtual.diretor : null,
    diretorAssociado: liderancaAtual.diretorAssociado && !jaAdicionado(liderancaAtual.diretorAssociado) ? liderancaAtual.diretorAssociado : null,
  };

  const interessadosDisponiveis = interessados.filter(i => !jaAdicionado(i));
  const historicoDisponivel = historico.filter(h => !jaAdicionado(h));

  const temSugestoes = liderancaDisponivel.diretor || liderancaDisponivel.diretorAssociado ||
    interessadosDisponiveis.length > 0 || historicoDisponivel.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserPlus className="text-blue-600" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Indicação de Candidatos</h1>
                <p className="text-gray-600">{ministerioAtual.nome}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleVoltarEtapa}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition"
              >
                <ArrowLeft size={20} />
                Voltar
              </button>
              <button
                onClick={handleProximaEtapa}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg"
              >
                Iniciar Votação
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Layout em 2 Colunas */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Coluna Esquerda - Formulário */}
          <div className="space-y-6">
            {/* Info sobre vagas */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg mb-4">
                <div className="flex items-start">
                  <Users className="text-blue-600 mr-3 flex-shrink-0 mt-0.5" size={24} />
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">
                      {numeroVagas} vaga{numeroVagas !== 1 ? 's' : ''} disponíve{numeroVagas !== 1 ? 'is' : 'l'}
                    </p>
                    <p className="text-sm text-blue-800">
                      Adicione os nomes dos candidatos que serão votados para este ministério
                    </p>
                  </div>
                </div>
              </div>

              {/* Sugestões Categorizadas */}
              {temSugestoes && (
                <div className="space-y-3 mb-4">
                  {/* Liderança Atual */}
                  {(liderancaDisponivel.diretor || liderancaDisponivel.diretorAssociado) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Crown className="text-blue-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
                        <div className="flex-1">
                          <p className="font-semibold text-blue-900 mb-2 text-sm">
                            Liderança Atual (Pré-cadastro):
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {liderancaDisponivel.diretor && (
                              <button
                                onClick={() => handleSugestaoClick(liderancaDisponivel.diretor!)}
                                className="px-3 py-1 bg-white border border-blue-300 rounded-full text-sm text-blue-800 hover:bg-blue-100 transition font-medium"
                              >
                                + {liderancaDisponivel.diretor}
                                <span className="ml-1 text-xs">(Diretor)</span>
                              </button>
                            )}
                            {liderancaDisponivel.diretorAssociado && (
                              <button
                                onClick={() => handleSugestaoClick(liderancaDisponivel.diretorAssociado!)}
                                className="px-3 py-1 bg-white border border-blue-300 rounded-full text-sm text-blue-800 hover:bg-blue-100 transition font-medium"
                              >
                                + {liderancaDisponivel.diretorAssociado}
                                <span className="ml-1 text-xs">(Dir. Associado)</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Interessados */}
                  {interessadosDisponiveis.length > 0 && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <UserCheck className="text-purple-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
                        <div className="flex-1">
                          <p className="font-semibold text-purple-900 mb-2 text-sm">
                            Possíveis Interessados (Pré-cadastro):
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {interessadosDisponiveis.map((interessado, index) => (
                              <button
                                key={index}
                                onClick={() => handleSugestaoClick(interessado)}
                                className="px-3 py-1 bg-white border border-purple-300 rounded-full text-sm text-purple-800 hover:bg-purple-100 transition"
                              >
                                + {interessado}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Histórico */}
                  {historicoDisponivel.length > 0 && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <History className="text-gray-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 mb-2 text-sm">
                            Histórico de Votações:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {historicoDisponivel.slice(0, 5).map((nome, index) => (
                              <button
                                key={index}
                                onClick={() => handleSugestaoClick(nome)}
                                className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
                              >
                                + {nome}
                              </button>
                            ))}
                            {historicoDisponivel.length > 5 && (
                              <span className="text-xs text-gray-500 self-center">
                                +{historicoDisponivel.length - 5} mais
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Formulário de Adição */}
              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700 mb-2 block">
                    Nome do Candidato
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={nomeInput}
                      onChange={(e) => {
                        setNomeInput(e.target.value);
                        setErro('');
                      }}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite o nome completo do candidato"
                      className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${erro ? 'border-red-500' : 'border-gray-300'
                        }`}
                      maxLength={100}
                    />
                    <button
                      onClick={handleAdicionar}
                      disabled={!nomeInput.trim()}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                      <UserPlus size={20} />
                      Adicionar
                    </button>
                  </div>
                </label>

                {/* Mensagem de Erro */}
                {erro && (
                  <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg animate-shake">
                    <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{erro}</p>
                  </div>
                )}
              </div>

              {/* Contador de Candidatos */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mt-4">
                <div className="flex items-center gap-2">
                  <Users className="text-gray-600" size={20} />
                  <span className="text-gray-700">
                    <span className="font-bold text-xl text-blue-600">{candidatos.length}</span>
                    {' '}candidato{candidatos.length !== 1 ? 's' : ''} adicionado{candidatos.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {temPoucosCandidatos && candidatos.length > 0 && (
                  <span className="text-sm text-yellow-600 font-medium">
                    Sugestão: {numeroVagas} candidatos
                  </span>
                )}
              </div>

              {/* Alertas */}
              {temPoucosCandidatos && candidatos.length > 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <div className="flex items-start">
                    <AlertCircle className="text-yellow-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-yellow-900 text-sm mb-1">Atenção!</p>
                      <p className="text-sm text-yellow-800">
                        Você adicionou menos candidatos ({candidatos.length}) do que o número de vagas ({numeroVagas}).
                        Considere adicionar mais candidatos.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {candidatos.length >= numeroVagas && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <div className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-green-900 text-sm">Pronto para votação!</p>
                      <p className="text-sm text-green-800">
                        Você adicionou candidatos suficientes.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Coluna Direita - Lista de Candidatos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-lg">
              <Users size={24} className="mr-2 text-blue-600" />
              Candidatos Indicados ({candidatos.length})
            </h4>
            <div className="h-[calc(100vh-400px)] overflow-y-auto">
              <ListaCandidatos
                candidatos={candidatos}
                onRemover={removerCandidato}
              />
            </div>
          </div>
        </div>
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

export default FormularioIndicacaoV2;

