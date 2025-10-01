import { BookOpen, UserPlus, Vote, Check } from 'lucide-react';
import { useVotacao } from '../contexts/VotacaoContext';

const EtapaIndicador = () => {
  const { etapaAtual, ministerioAtual } = useVotacao();

  const etapas = [
    {
      numero: 1,
      titulo: 'Explicação',
      descricao: 'Leia sobre o ministério',
      icone: BookOpen,
    },
    {
      numero: 2,
      titulo: 'Indicação',
      descricao: 'Adicione candidatos',
      icone: UserPlus,
    },
    {
      numero: 3,
      titulo: 'Votação',
      descricao: 'Registre os votos',
      icone: Vote,
    },
  ];

  if (!ministerioAtual) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      {/* Desktop - Horizontal Compacto */}
      <div className="hidden md:flex items-center justify-between">
        {etapas.map((etapa, index) => {
          const Icone = etapa.icone;
          const isAtual = etapaAtual === etapa.numero;
          const isConcluida = etapaAtual > etapa.numero;
          const isProxima = etapaAtual < etapa.numero;

          return (
            <div key={etapa.numero} className="flex items-center flex-1">
              {/* Etapa */}
              <div className="flex flex-col items-center flex-1">
                {/* Ícone/Número */}
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                    ${isConcluida ? 'bg-green-500 border-green-500' : ''}
                    ${isAtual ? 'bg-blue-500 border-blue-500 ring-4 ring-blue-200' : ''}
                    ${isProxima ? 'bg-gray-100 border-gray-300' : ''}
                  `}
                >
                  {isConcluida ? (
                    <Check className="text-white" size={20} />
                  ) : (
                    <Icone
                      className={`
                        ${isAtual ? 'text-white' : ''}
                        ${isProxima ? 'text-gray-400' : ''}
                      `}
                      size={20}
                    />
                  )}
                </div>

                {/* Texto */}
                <div className="mt-2 text-center">
                  <p
                    className={`
                      font-bold text-xs mb-1
                      ${isAtual ? 'text-blue-600' : ''}
                      ${isConcluida ? 'text-green-600' : ''}
                      ${isProxima ? 'text-gray-400' : ''}
                    `}
                  >
                    {etapa.titulo}
                  </p>
                </div>
              </div>

              {/* Linha Conectora */}
              {index < etapas.length - 1 && (
                <div className="flex-1 h-1 mx-2 -mt-8">
                  <div
                    className={`
                      h-full rounded transition-all
                      ${isConcluida ? 'bg-green-500' : 'bg-gray-300'}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile - Vertical */}
      <div className="md:hidden space-y-4">
        {etapas.map((etapa, index) => {
          const Icone = etapa.icone;
          const isAtual = etapaAtual === etapa.numero;
          const isConcluida = etapaAtual > etapa.numero;
          const isProxima = etapaAtual < etapa.numero;

          return (
            <div key={etapa.numero}>
              <div className="flex items-center">
                {/* Ícone/Número */}
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all flex-shrink-0
                    ${isConcluida ? 'bg-green-500 border-green-500' : ''}
                    ${isAtual ? 'bg-blue-500 border-blue-500 ring-4 ring-blue-200' : ''}
                    ${isProxima ? 'bg-gray-100 border-gray-300' : ''}
                  `}
                >
                  {isConcluida ? (
                    <Check className="text-white" size={20} />
                  ) : (
                    <Icone
                      className={`
                        ${isAtual ? 'text-white' : ''}
                        ${isProxima ? 'text-gray-400' : ''}
                      `}
                      size={20}
                    />
                  )}
                </div>

                {/* Texto */}
                <div className="ml-4 flex-1">
                  <p
                    className={`
                      font-bold text-base mb-1
                      ${isAtual ? 'text-blue-600' : ''}
                      ${isConcluida ? 'text-green-600' : ''}
                      ${isProxima ? 'text-gray-400' : ''}
                    `}
                  >
                    {etapa.titulo}
                  </p>
                  <p className="text-sm text-gray-500">{etapa.descricao}</p>
                </div>

                {/* Badge de Status */}
                {isAtual && (
                  <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    Atual
                  </span>
                )}
                {isConcluida && (
                  <span className="ml-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    Concluída
                  </span>
                )}
              </div>

              {/* Linha Conectora Vertical */}
              {index < etapas.length - 1 && (
                <div className="ml-6 my-2">
                  <div
                    className={`
                      w-1 h-8 rounded transition-all
                      ${isConcluida ? 'bg-green-500' : 'bg-gray-300'}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EtapaIndicador;

