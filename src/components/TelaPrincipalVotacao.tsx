import { useState } from 'react';
import { Vote, Plus, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useVotacao } from '../contexts/VotacaoContext';
import ModalMinisterio from './ModalMinisterio';
import ContadorVotos from './ContadorVotos';
import ControlesVotacao from './ControlesVotacao';
import ConfirmacaoFinalizacao from './ConfirmacaoFinalizacao';

const TelaPrincipalVotacao = () => {
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
  };

  if (!ministerioAtual || etapaAtual !== 3) {
    return null;
  }

  const totalVotos = candidatos.reduce((acc, c) => acc + c.votos, 0);

  return (
    <>
      <ModalMinisterio
        isOpen={etapaAtual === 3 && !showConfirmacao}
        onClose={() => { }}
        showCloseButton={false}
      >
        <div className="space-y-6">
          {/* Cabeçalho */}
          <div className="text-center pb-4 border-b border-gray-200">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Vote className="text-blue-600" size={32} />
              <h3 className="text-3xl font-bold text-gray-800">Votação em Andamento</h3>
            </div>
            <p className="text-gray-600">
              <span className="font-semibold text-blue-600">{ministerioAtual.nome}</span>
            </p>
          </div>

          {/* Info sobre Total de Votos */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Vote className="text-blue-600" size={24} />
                <span className="font-semibold text-blue-900">Total de Votos Registrados</span>
              </div>
              <span className="text-3xl font-bold text-blue-600">{totalVotos}</span>
            </div>
          </div>

          {/* Contador de Votos */}
          <ContadorVotos candidatos={candidatos} />

          {/* Lista de Candidatos para Votar */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Vote size={20} className="mr-2 text-blue-600" />
              Candidatos:
            </h4>

            {candidatos.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <AlertCircle className="mx-auto text-gray-400 mb-2" size={48} />
                <p className="text-gray-500">Nenhum candidato disponível</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
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

          {/* Controles */}
          <ControlesVotacao
            candidatos={candidatos}
            onDesfazerVoto={handleDesfazerVoto}
            onZerarCandidato={handleZerarCandidato}
            historicoVotos={historicoVotos}
          />

          {/* Botões de Ação */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => voltarEtapa()}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition"
              >
                <ArrowLeft size={20} />
                Voltar
              </button>
              <button
                onClick={handleFinalizarVotacao}
                disabled={totalVotos === 0}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition shadow-lg hover:shadow-xl"
              >
                <CheckCircle size={24} />
                Finalizar Votação
              </button>
            </div>
            {totalVotos === 0 && (
              <p className="text-center text-sm text-gray-500">
                Adicione pelo menos 1 voto para finalizar
              </p>
            )}
          </div>
        </div>
      </ModalMinisterio>

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

export default TelaPrincipalVotacao;

