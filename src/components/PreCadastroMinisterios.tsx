import { useState } from 'react';
import { ChevronDown, ChevronUp, UserCheck, Users, Plus, X, AlertCircle, Settings } from 'lucide-react';
import { useVotacao } from '../contexts/VotacaoContext';
import type { Ministerio } from '../data/ministerios';

const PreCadastroMinisterios = () => {
  const {
    ministeriosDisponiveis,
    ministeriosSelecionados,
    setLiderancaAtual,
    adicionarInteressado,
    removerInteressado,
    getPreCadastro,
    setNumeroVagas,
    getNumeroVagas,
  } = useVotacao();

  const [ministerioExpandido, setMinisterioExpandido] = useState<string | null>(null);
  const [inputs, setInputs] = useState<{ [key: string]: { diretor: string; diretorAssociado: string; interessado: string } }>({});
  const [erro, setErro] = useState('');

  const ministeriosSelecionadosData = ministeriosDisponiveis.filter(m =>
    ministeriosSelecionados.includes(m.id)
  );

  const validarNome = (nome: string): string | null => {
    const nomeTrimmed = nome.trim();

    if (!nomeTrimmed) return 'Digite um nome';
    if (nomeTrimmed.length < 3) return 'Mínimo 3 caracteres';
    if (nomeTrimmed.length > 100) return 'Máximo 100 caracteres';

    return null;
  };

  const handleSalvarLideranca = (ministerioId: string) => {
    const input = inputs[ministerioId] || { diretor: '', diretorAssociado: '', interessado: '' };

    const erroDiretor = validarNome(input.diretor);
    if (erroDiretor) {
      setErro(`Diretor: ${erroDiretor}`);
      return;
    }

    if (input.diretorAssociado && input.diretorAssociado.trim()) {
      const erroDiretorAssociado = validarNome(input.diretorAssociado);
      if (erroDiretorAssociado) {
        setErro(`Diretor Associado: ${erroDiretorAssociado}`);
        return;
      }
    }

    setLiderancaAtual(ministerioId, input.diretor.trim(), input.diretorAssociado?.trim());
    setErro('');
  };

  const handleAdicionarInteressado = (ministerioId: string) => {
    const input = inputs[ministerioId] || { diretor: '', diretorAssociado: '', interessado: '' };
    const nomeInteressado = input.interessado?.trim();

    const erroValidacao = validarNome(nomeInteressado || '');
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    // Verificar duplicados
    const preCadastro = getPreCadastro(ministerioId);
    if (preCadastro && preCadastro.interessados.includes(nomeInteressado!)) {
      setErro('Interessado já adicionado');
      return;
    }

    adicionarInteressado(ministerioId, nomeInteressado!);
    setInputs({
      ...inputs,
      [ministerioId]: { ...input, interessado: '' }
    });
    setErro('');
  };

  const ministerioPossuiDiretorAssociado = (ministerio: Ministerio) => {
    // Ministérios que NÃO têm diretor associado (apenas cargo principal)
    const semDiretorAssociado = ['anciao', 'desbravadores', 'aventureiros', 'diaconos', 'diaconisas'];
    return !semDiretorAssociado.includes(ministerio.id);
  };

  // Ministérios que precisam configuração de vagas
  const ministeriosComVagasConfiguraveis = ministeriosSelecionadosData.filter(m =>
    ['anciao', 'diaconos', 'diaconisas'].includes(m.id)
  );

  return (
    <div className="space-y-4">
      {ministeriosSelecionadosData.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <AlertCircle className="mx-auto text-gray-400 mb-3" size={48} />
          <p className="text-gray-600 font-medium">Nenhum ministério selecionado</p>
          <p className="text-sm text-gray-500 mt-1">
            Selecione os ministérios na aba "Configuração" primeiro
          </p>
        </div>
      ) : (
        <>
          {/* Configuração de Vagas para Ministérios Especiais */}
          {ministeriosComVagasConfiguraveis.length > 0 && (
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <Settings className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-orange-900 mb-2">
                    Configuração de Vagas
                  </h3>
                  <p className="text-sm text-orange-800 mb-4">
                    Alguns ministérios precisam que você defina o número de vagas antes da votação:
                  </p>

                  <div className="space-y-3">
                    {ministeriosComVagasConfiguraveis.map(ministerio => (
                      <div key={ministerio.id} className="bg-white rounded-lg p-4 border border-orange-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{ministerio.nome}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              {ministerio.id === 'anciao' && 'Número de anciãos que serão eleitos'}
                              {ministerio.id === 'diaconos' && 'Número total de diáconos (será eleito primeiro o 1º Diácono)'}
                              {ministerio.id === 'diaconisas' && 'Número total de diaconisas (será eleita primeiro a 1ª Diaconisa)'}
                            </p>
                          </div>
                          <div className="ml-4">
                            <input
                              type="number"
                              min={1}
                              max={20}
                              value={getNumeroVagas(ministerio.id)}
                              onChange={(e) => setNumeroVagas(ministerio.id, parseInt(e.target.value) || 1)}
                              className="w-20 px-3 py-2 border border-orange-300 rounded-lg text-center font-bold text-orange-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                            <p className="text-xs text-gray-500 text-center mt-1">vagas</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lista de Ministérios para Pré-Cadastro */}
          {ministeriosSelecionadosData.map(ministerio => {
            const preCadastro = getPreCadastro(ministerio.id);
            const isExpandido = ministerioExpandido === ministerio.id;
            const input = inputs[ministerio.id] || { diretor: '', diretorAssociado: '', interessado: '' };
            const temDiretorAssociado = ministerioPossuiDiretorAssociado(ministerio);

            return (
              <div key={ministerio.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                {/* Header do Accordion */}
                <button
                  onClick={() => setMinisterioExpandido(isExpandido ? null : ministerio.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3 text-left flex-1">
                    <div className="flex-shrink-0">
                      {preCadastro && (preCadastro.liderancaAtual.diretor || preCadastro.interessados.length > 0) ? (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <UserCheck className="text-green-600" size={18} />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <Users className="text-gray-400" size={18} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{ministerio.nome}</h3>
                      <p className="text-sm text-gray-600">{ministerio.descricao}</p>
                    </div>
                  </div>
                  {isExpandido ? (
                    <ChevronUp className="text-gray-400" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={20} />
                  )}
                </button>

                {/* Conteúdo do Accordion */}
                {isExpandido && (
                  <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-6">
                    {/* Liderança Atual */}
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <UserCheck size={20} className="text-blue-600" />
                        Liderança Atual
                      </h4>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Diretor *
                          </label>
                          <input
                            type="text"
                            value={input.diretor || preCadastro?.liderancaAtual.diretor || ''}
                            onChange={(e) => {
                              setInputs({
                                ...inputs,
                                [ministerio.id]: { ...input, diretor: e.target.value }
                              });
                              setErro('');
                            }}
                            placeholder="Nome do diretor atual"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            maxLength={100}
                          />
                        </div>

                        {temDiretorAssociado && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Diretor Associado
                            </label>
                            <input
                              type="text"
                              value={input.diretorAssociado || preCadastro?.liderancaAtual.diretorAssociado || ''}
                              onChange={(e) => {
                                setInputs({
                                  ...inputs,
                                  [ministerio.id]: { ...input, diretorAssociado: e.target.value }
                                });
                                setErro('');
                              }}
                              placeholder="Nome do diretor associado atual"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              maxLength={100}
                            />
                          </div>
                        )}

                        <button
                          onClick={() => handleSalvarLideranca(ministerio.id)}
                          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                        >
                          Salvar Liderança
                        </button>
                      </div>

                      {preCadastro && preCadastro.liderancaAtual.diretor && (
                        <div className="mt-3 p-3 bg-green-50 border-l-4 border-green-500 rounded-r">
                          <p className="text-sm text-green-800">
                            <span className="font-semibold">Diretor:</span> {preCadastro.liderancaAtual.diretor}
                          </p>
                          {preCadastro.liderancaAtual.diretorAssociado && (
                            <p className="text-sm text-green-800 mt-1">
                              <span className="font-semibold">Diretor Associado:</span> {preCadastro.liderancaAtual.diretorAssociado}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Possíveis Interessados */}
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Users size={20} className="text-purple-600" />
                        Possíveis Interessados
                      </h4>

                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={input.interessado || ''}
                            onChange={(e) => {
                              setInputs({
                                ...inputs,
                                [ministerio.id]: { ...input, interessado: e.target.value }
                              });
                              setErro('');
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAdicionarInteressado(ministerio.id);
                              }
                            }}
                            placeholder="Nome do interessado"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            maxLength={100}
                          />
                          <button
                            onClick={() => handleAdicionarInteressado(ministerio.id)}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition flex items-center gap-2"
                          >
                            <Plus size={18} />
                            Adicionar
                          </button>
                        </div>

                        {preCadastro && preCadastro.interessados.length > 0 && (
                          <div className="space-y-2 mt-3">
                            {preCadastro.interessados.map((interessado, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-purple-50 border border-purple-200 rounded-lg"
                              >
                                <span className="text-sm font-medium text-purple-900">{interessado}</span>
                                <button
                                  onClick={() => removerInteressado(ministerio.id, interessado)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      {/* Mensagem de Erro */}
      {erro && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r animate-shake">
          <div className="flex items-start gap-2">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
            <p className="text-sm font-medium text-red-800">{erro}</p>
          </div>
        </div>
      )}

      {/* Estilos */}
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

export default PreCadastroMinisterios;

