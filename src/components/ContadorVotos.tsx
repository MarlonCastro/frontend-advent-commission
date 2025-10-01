import { TrendingUp, Award } from 'lucide-react';

interface Candidato {
  id: string;
  nome: string;
  votos: number;
}

interface ContadorVotosProps {
  candidatos: Candidato[];
}

const ContadorVotos = ({ candidatos }: ContadorVotosProps) => {
  const totalVotos = candidatos.reduce((acc, c) => acc + c.votos, 0);

  // Ordenar por votos (ranking)
  const candidatosOrdenados = [...candidatos].sort((a, b) => b.votos - a.votos);

  const calcularPorcentagem = (votos: number) => {
    if (totalVotos === 0) return 0;
    return Math.round((votos / totalVotos) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <TrendingUp className="text-blue-600" size={24} />
          Contagem de Votos
        </h3>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total de Votos</p>
          <p className="text-3xl font-bold text-blue-600">{totalVotos}</p>
        </div>
      </div>

      {candidatosOrdenados.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Nenhum candidato na votação
        </div>
      ) : (
        <div className="space-y-4">
          {candidatosOrdenados.map((candidato, index) => {
            const porcentagem = calcularPorcentagem(candidato.votos);
            const isLider = index === 0 && candidato.votos > 0;

            return (
              <div
                key={candidato.id}
                className={`p-4 rounded-lg border-2 transition-all ${isLider
                  ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-400'
                  : 'bg-gray-50 border-gray-200'
                  }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {isLider && (
                      <Award className="text-yellow-600 flex-shrink-0" size={24} />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold truncate ${isLider ? 'text-yellow-900' : 'text-gray-800'
                        }`}>
                        {candidato.nome}
                      </p>
                      <p className="text-sm text-gray-600">
                        Posição #{index + 1}
                      </p>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className={`text-4xl font-bold tabular-nums animate-pulse-vote ${isLider ? 'text-yellow-600' : 'text-blue-600'
                      }`}>
                      {candidato.votos}
                    </p>
                    <p className="text-sm text-gray-600">{porcentagem}%</p>
                  </div>
                </div>

                {/* Barra de Progresso */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${isLider
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                      : 'bg-gradient-to-r from-blue-400 to-blue-600'
                      }`}
                    style={{ width: `${porcentagem}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Estilos de animação */}
      <style>{`
        @keyframes pulseVote {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .animate-pulse-vote {
          animation: pulseVote 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContadorVotos;

