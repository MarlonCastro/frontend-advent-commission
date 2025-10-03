import { useNavigate } from 'react-router-dom';
import { useVotacao } from '../contexts/VotacaoContext';
import ProgressBar from '../components/ProgressBar';
import MinisterioSelector from '../components/MinisterioSelector';
import EtapaIndicador from '../components/EtapaIndicador';
import ComponenteExplicacao from '../components/ComponenteExplicacao';
import { useEffect, useState } from 'react';
import { AlertTriangle, FileText, Settings, Trash2, AlertOctagon } from 'lucide-react';

const Votacao = () => {
  const { nomeIgreja, ministeriosSelecionados, ministeriosDisponiveis, resultados, comissaoEncerrada, encerrarComissao } = useVotacao();
  const navigate = useNavigate();
  const [showModalFinalizacao, setShowModalFinalizacao] = useState(false);
  const [showModalLimparDados, setShowModalLimparDados] = useState(false);

  // Verificar se a comissão está configurada
  useEffect(() => {
    const comissaoConfigurada = nomeIgreja.trim() !== '' && ministeriosSelecionados.length > 0;

    if (!comissaoConfigurada) {
      navigate('/votacao/configuracao');
    }
  }, [nomeIgreja, ministeriosSelecionados, navigate]);

  const ministeriosFinalizados = resultados.length;
  const totalMinisterios = ministeriosDisponiveis.length;
  const todosFinalizados = ministeriosFinalizados === totalMinisterios && totalMinisterios > 0;

  // Texto do botão baseado no estado
  const textoBotaoFinalizar = (todosFinalizados || comissaoEncerrada) ? 'Ver Relatórios' : 'Finalizar Comissão';

  const handleFinalizarComissao = () => {
    if (todosFinalizados || comissaoEncerrada) {
      navigate('/relatorios');
    } else {
      setShowModalFinalizacao(true);
    }
  };

  const handleConfirmarFinalizacao = () => {
    setShowModalFinalizacao(false);
    // Encerrar comissão (para o cronômetro)
    encerrarComissao();
    // Ir para relatórios
    navigate('/relatorios');
  };

  const handleLimparDados = () => {
    // Limpar todo o localStorage
    localStorage.clear();
    setShowModalLimparDados(false);
    // Recarregar página para resetar todo o estado
    window.location.href = '#/';
    window.location.reload();
  };

  const ministeriosPendentes = ministeriosDisponiveis.filter(
    m => !resultados.some(r => r.ministerioId === m.id)
  );

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Sistema de Votação</h1>
            <p className="text-sm md:text-base text-gray-600">
              Gerencie o processo de votação para os ministérios da igreja
            </p>
          </div>

          {/* Botões de Ação - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Botão Limpar Dados */}
            <button
              onClick={() => setShowModalLimparDados(true)}
              className="flex items-center gap-2 px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg transition shadow-md hover:shadow-lg"
              title="Limpar Todos os Dados"
            >
              <Trash2 size={20} />
              <span className="hidden lg:inline">Limpar</span>
            </button>

            {/* Botão Reconfigurar Comissão */}
            <button
              onClick={() => navigate('/votacao/configuracao')}
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition shadow-md hover:shadow-lg"
              title="Reconfigurar Comissão"
            >
              <Settings size={20} />
              <span className="hidden lg:inline">Configurar</span>
            </button>

            {/* Botão Finalizar Comissão / Ver Relatórios */}
            <button
              onClick={handleFinalizarComissao}
              disabled={ministeriosFinalizados === 0}
              className={`flex items-center gap-2 px-6 py-3 font-bold rounded-lg transition shadow-lg hover:shadow-xl ${(todosFinalizados || comissaoEncerrada)
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : ministeriosFinalizados > 0
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
            >
              <FileText size={20} />
              {textoBotaoFinalizar}
            </button>
          </div>

          {/* Botões de Ação - Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setShowModalLimparDados(true)}
              className="flex items-center justify-center gap-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg transition text-sm"
              title="Limpar Dados"
            >
              <Trash2 size={16} />
            </button>

            <button
              onClick={() => navigate('/votacao/configuracao')}
              className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition text-sm"
              title="Configurar"
            >
              <Settings size={16} />
            </button>

            <button
              onClick={handleFinalizarComissao}
              disabled={ministeriosFinalizados === 0}
              className={`flex items-center justify-center gap-1 px-4 py-2 font-semibold rounded-lg transition text-sm flex-1 ${(todosFinalizados || comissaoEncerrada)
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : ministeriosFinalizados > 0
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
            >
              <FileText size={16} />
              {(todosFinalizados || comissaoEncerrada) ? 'Relatórios' : 'Finalizar'}
            </button>
          </div>
        </div>

        <ProgressBar />
        <MinisterioSelector />
        <EtapaIndicador />
      </div>

      {/* Modal de Explicação (abre automaticamente ao selecionar ministério) */}
      <ComponenteExplicacao tempoLeitura={120} autoAvancar={false} />

      {/* Modal de Confirmação de Finalização */}
      {showModalFinalizacao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowModalFinalizacao(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-scaleIn">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="text-yellow-600" size={64} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Finalizar Comissão Antecipadamente?
              </h2>
              <p className="text-gray-600">
                Você está prestes a finalizar a comissão sem votar em todos os ministérios
              </p>
            </div>

            {/* Estatísticas */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-4 bg-green-100 rounded-lg">
                  <p className="text-sm text-green-700 mb-1">Finalizados</p>
                  <p className="text-3xl font-bold text-green-600">{ministeriosFinalizados}</p>
                </div>
                <div className="text-center p-4 bg-yellow-100 rounded-lg">
                  <p className="text-sm text-yellow-700 mb-1">Pendentes</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {totalMinisterios - ministeriosFinalizados}
                  </p>
                </div>
              </div>

              {ministeriosPendentes.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Ministérios Pendentes:
                  </p>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {ministeriosPendentes.map(m => (
                      <div key={m.id} className="text-sm text-gray-600 bg-white p-2 rounded">
                        • {m.nome}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Aviso */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <span className="font-bold">Atenção:</span> Os ministérios pendentes precisarão ser
                votados em uma nova comissão. Você pode configurar uma nova comissão apenas com os
                ministérios faltantes.
              </p>
            </div>

            {/* Botões */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModalFinalizacao(false)}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition"
              >
                Continuar Votando
              </button>
              <button
                onClick={handleConfirmarFinalizacao}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg"
              >
                Sim, Finalizar Comissão
              </button>
            </div>
          </div>
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

      {/* Modal de Confirmação de Limpeza de Dados */}
      {showModalLimparDados && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowModalLimparDados(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-scaleIn">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertOctagon className="text-red-600" size={40} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Limpar Todos os Dados?
              </h2>
              <p className="text-gray-600">
                Esta ação não pode ser desfeita!
              </p>
            </div>

            {/* Lista do que será apagado */}
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-6">
              <p className="font-semibold text-red-900 mb-2 text-sm">
                Os seguintes dados serão permanentemente apagados:
              </p>
              <ul className="space-y-1 text-sm text-red-800">
                <li>• Configuração da comissão (nome da igreja e ministérios selecionados)</li>
                <li>• Todos os pré-cadastros de liderança e interessados</li>
                <li>• Departamentos personalizados criados</li>
                <li>• Todas as votações em andamento</li>
                <li>• Histórico completo de resultados</li>
                <li>• Configurações de vagas personalizadas</li>
              </ul>
            </div>

            {/* Aviso */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <span className="font-bold">⚠️ Atenção:</span> Você será redirecionado para a página inicial
                e precisará configurar tudo novamente do zero.
              </p>
            </div>

            {/* Botões */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModalLimparDados(false)}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleLimparDados}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition shadow-md hover:shadow-lg"
              >
                Sim, Limpar Tudo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Votacao;

