import { useState, useEffect } from 'react';
import { Undo, Trash2, Play, Pause, Clock, RotateCcw } from 'lucide-react';

interface Candidato {
  id: string;
  nome: string;
  votos: number;
}

interface ControlesVotacaoProps {
  candidatos: Candidato[];
  onDesfazerVoto: () => void;
  onZerarCandidato: (candidatoId: string) => void;
  historicoVotos: string[];
}

const ControlesVotacao = ({
  candidatos,
  onDesfazerVoto,
  onZerarCandidato,
  historicoVotos
}: ControlesVotacaoProps) => {
  const [pausado, setPausado] = useState(false);
  const [tempoSessao, setTempoSessao] = useState(0);
  const [showZerarMenu, setShowZerarMenu] = useState(false);

  // Timer da sessão
  useEffect(() => {
    if (pausado) return;

    const interval = setInterval(() => {
      setTempoSessao(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [pausado]);

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTogglePause = () => {
    setPausado(!pausado);
  };

  const handleZerarCandidato = (candidatoId: string) => {
    if (window.confirm('Tem certeza que deseja zerar os votos deste candidato?')) {
      onZerarCandidato(candidatoId);
      setShowZerarMenu(false);
    }
  };

  const candidatosComVotos = candidatos.filter(c => c.votos > 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Controles da Votação</h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Timer da Sessão */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="text-purple-600" size={20} />
              <span className="font-semibold text-purple-900">Tempo de Sessão</span>
            </div>
            <button
              onClick={handleTogglePause}
              className={`p-2 rounded-lg transition ${pausado
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
              title={pausado ? 'Retomar' : 'Pausar'}
            >
              {pausado ? <Play size={16} /> : <Pause size={16} />}
            </button>
          </div>
          <p className="text-3xl font-bold text-purple-600 tabular-nums">
            {formatarTempo(tempoSessao)}
          </p>
          {pausado && (
            <p className="text-sm text-purple-700 mt-1">⏸ Pausado</p>
          )}
        </div>

        {/* Desfazer Último Voto */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Undo className="text-blue-600" size={20} />
            <span className="font-semibold text-blue-900">Desfazer Último Voto</span>
          </div>
          <button
            onClick={onDesfazerVoto}
            disabled={historicoVotos.length === 0}
            className="w-full mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
          >
            <Undo size={16} />
            Desfazer
          </button>
          <p className="text-sm text-blue-700 mt-2">
            {historicoVotos.length} voto{historicoVotos.length !== 1 ? 's' : ''} no histórico
          </p>
        </div>
      </div>

      {/* Zerar Votos de Candidato */}
      {candidatosComVotos.length > 0 && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trash2 className="text-red-600" size={20} />
              <span className="font-semibold text-red-900">Zerar Votos de Candidato</span>
            </div>
            <button
              onClick={() => setShowZerarMenu(!showZerarMenu)}
              className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          {showZerarMenu && (
            <div className="space-y-2 animate-slideDown">
              {candidatosComVotos.map(candidato => (
                <button
                  key={candidato.id}
                  onClick={() => handleZerarCandidato(candidato.id)}
                  className="w-full flex items-center justify-between p-3 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition text-left"
                >
                  <span className="font-medium text-gray-800">{candidato.nome}</span>
                  <span className="text-sm text-red-600 font-semibold">
                    {candidato.votos} voto{candidato.votos !== 1 ? 's' : ''}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Estilos de animação */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ControlesVotacao;

