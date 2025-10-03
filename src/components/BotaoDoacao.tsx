import { useState } from 'react';
import { Heart, X, Copy, ExternalLink } from 'lucide-react';

const BotaoDoacao = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const chavePix = 'marloncastro78@gmail.com'; // Substitua pela sua chave PIX real

  const handleCopiarPix = () => {
    navigator.clipboard.writeText(chavePix);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <>
      {/* Botão Flutuante */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-40 flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        title="Apoie este projeto"
      >
        <Heart className="animate-pulse" size={18} fill="currentColor" />
        <span className="hidden sm:inline text-sm md:text-base">Apoiar</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scaleIn">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                  <Heart size={24} fill="white" className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Apoie Este Projeto</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Este sistema foi desenvolvido com dedicação para auxiliar as igrejas adventistas
                no processo de votação. Se ele está sendo útil para sua igreja, considere fazer
                uma doação para apoiar o desenvolvimento e manutenção.
              </p>

              {/* PIX */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-800 mb-2">Chave PIX:</p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <code className="flex-1 px-3 py-2 bg-white rounded-lg text-pink-700 font-mono text-sm border border-pink-200 break-all">
                    {chavePix}
                  </code>
                  <button
                    onClick={handleCopiarPix}
                    className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition flex items-center justify-center gap-2 sm:w-auto"
                  >
                    <Copy size={16} />
                    {copiado ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>

              {/* Link Alternativo (exemplo) */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-3">Outras formas de apoiar:</p>
                <a
                  href="https://github.com/seu-usuario/frontend-advent-commission"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <ExternalLink size={16} />
                  Dar uma estrela no GitHub
                </a>
              </div>

              {/* Agradecimento */}
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <p className="text-sm text-green-800">
                  <span className="font-bold">Obrigado!</span> Sua contribuição ajuda a manter
                  este projeto gratuito e acessível para todas as igrejas.
                </p>
              </div>
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

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
};

export default BotaoDoacao;

