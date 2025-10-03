import { useState } from 'react';
import { Vote, Plus, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useVotacao } from '../contexts/VotacaoContext';
import { useNavigate } from 'react-router-dom';
import ContadorVotos from './ContadorVotos';
import ControlesVotacao from './ControlesVotacao';
import ConfirmacaoFinalizacao from './ConfirmacaoFinalizacao';

const TelaPrincipalVotacaoV2 = () => {
  const {
    ministerioAtual,
    etapaAtual,
    candidatos,
    adicionarVoto,
    removerVoto,
    zerarVotosCandidato,
    voltarEtapa,
    finalizarMinisterio
  } = useVotacao();

  const navigate = useNavigate();
  const [historicoVotos, setHistoricoVotos] = useState<string[]>([]);
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [candidatoVotado, setCandidatoVotado] = useState<string | null>(null);

  const handleAdicionarVoto = (candidatoId: string) => {
    adicionarVoto(candidatoId);
    setHistoricoVotos([...historicoVotos, candidatoId]);

    // Feedback visual
    setCandidatoVotado(candidatoId);
    setTimeout(() => setCandidatoVotado(null), 300);
  };

  const handleDesfazerVoto = () => {
    if (historicoVotos.length === 0) return;

    const ultimoVoto = historicoVotos[historicoVotos.length - 1];
    const candidato = candidatos.find(c => c.id === ultimoVoto);

    if (candidato && candidato.votos > 0) {
      removerVoto(ultimoVoto);
      setHistoricoVotos(historicoVotos.slice(0, -1));
    }
  };

  const handleZerarCandidato = (candidatoId: string) => {
    const candidato = candidatos.find(c => c.id === candidatoId);
    if (!candidato) return;

    // Zerar votos do candidato
    zerarVotosCandidato(candidatoId);

    // Remover todos os votos deste candidato do histórico
    const novosHistorico = historicoVotos.filter(id => id !== candidatoId);
    setHistoricoVotos(novosHistorico);
  };

  const handleFinalizarVotacao = () => {
    const totalVotos = candidatos.reduce((acc, c) => acc + c.votos, 0);

    if (totalVotos === 0) {
      alert('Adicione pelo menos 1 voto antes de finalizar');
      return;
    }

    setShowConfirmacao(true);
  };

  const handleConfirmarFinalizacao = () => {
    finalizarMinisterio();
    setShowConfirmacao(false);
    setHistoricoVotos([]);
    navigate('/votacao');
  };

  const handleVoltarEtapa = () => {
    voltarEtapa();
    navigate('/votacao/indicacao');
  };

  if (!ministerioAtual || etapaAtual !== 3) {
    return null;
  }

  const totalVotos = candidatos.reduce((acc, c) => acc + c.votos, 0);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 pb-24 md:pb-6">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Vote className="text-blue-600" size={28} md-size={32} />
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800">Votação em Andamento</h1>
                  <p className="text-sm md:text-base text-gray-600">{ministerioAtual.nome}</p>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-4">
                <div className="text-right">
                  <p className="text-xs md:text-sm text-gray-600">Total de Votos</p>
                  <p className="text-2xl md:text-3xl font-bold text-blue-600">{totalVotos}</p>
                </div>
                {/* Botões apenas no desktop */}
                <div className="hidden md:flex items-center gap-3">
                  <button
                    onClick={handleVoltarEtapa}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition"
                  >
                    <ArrowLeft size={20} />
                    Voltar
                  </button>
                  <button
                    onClick={handleFinalizarVotacao}
                    disabled={totalVotos === 0}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition shadow-lg hover:shadow-xl"
                  >
                    <CheckCircle size={20} />
                    Finalizar Votação
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Layout em 2 Colunas */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Coluna Esquerda - Candidatos para Votar */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-lg">
                <Vote size={24} className="mr-2 text-blue-600" />
                Candidatos ({candidatos.length})
              </h4>

              {candidatos.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <AlertCircle className="mx-auto text-gray-400 mb-2" size={48} />
                  <p className="text-gray-500">Nenhum candidato disponível</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                  {candidatos.map((candidato) => {
                    const isVotado = candidatoVotado === candidato.id;

                    return (
                      <div
                        key={candidato.id}
                        className={`bg-white border-2 rounded-lg p-4 transition-all ${isVotado
                          ? 'border-green-500 bg-green-50 scale-105'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1 min-w-0 mr-3">
                            <p className="font-bold text-gray-800 truncate text-lg">
                              {candidato.nome}
                            </p>
                            <p className="text-sm text-gray-600">
                              {candidato.votos} voto{candidato.votos !== 1 ? 's' : ''}
                            </p>
                          </div>
                          {isVotado && (
                            <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                          )}
                        </div>

                        <button
                          onClick={() => handleAdicionarVoto(candidato.id)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg"
                        >
                          <Plus size={20} />
                          +1 Voto
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Coluna Direita - Controles e Contador */}
            <div className="space-y-6">
              <ControlesVotacao
                candidatos={candidatos}
                onDesfazerVoto={handleDesfazerVoto}
                onZerarCandidato={handleZerarCandidato}
                historicoVotos={historicoVotos}
              />
              <ContadorVotos candidatos={candidatos} />
            </div>
          </div>
        </div>

        {/* Footer Mobile - Botões de Ação */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 shadow-lg z-30">
          <div className="flex gap-3">
            <button
              onClick={handleVoltarEtapa}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition flex-1"
            >
              <ArrowLeft size={20} />
              Voltar
            </button>
            <button
              onClick={handleFinalizarVotacao}
              disabled={totalVotos === 0}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition shadow-lg hover:shadow-xl flex-1"
            >
              <CheckCircle size={20} />
              Finalizar
            </button>
          </div>
        </div>

      </div>

      {/* Modal de Confirmação */}
      <ConfirmacaoFinalizacao
        isOpen={showConfirmacao}
        candidatos={candidatos}
        ministerioNome={ministerioAtual.nome}
        onConfirmar={handleConfirmarFinalizacao}
        onContinuar={() => setShowConfirmacao(false)}
      />
    </>
  );
};

export default TelaPrincipalVotacaoV2;

