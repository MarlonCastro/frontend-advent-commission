import { Trash2, User } from 'lucide-react';

interface Candidato {
  id: string;
  nome: string;
  votos: number;
}

interface ListaCandidatosProps {
  candidatos: Candidato[];
  onRemover: (id: string) => void;
}

const ListaCandidatos = ({ candidatos, onRemover }: ListaCandidatosProps) => {
  if (candidatos.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <User className="mx-auto text-gray-400 mb-3" size={48} />
        <p className="text-gray-500 font-medium">Nenhum candidato adicionado ainda</p>
        <p className="text-sm text-gray-400 mt-1">Adicione pelo menos 1 candidato para prosseguir</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {candidatos.map((candidato, index) => (
        <div
          key={candidato.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 animate-slideIn"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="text-blue-600" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">{candidato.nome}</p>
                <p className="text-sm text-gray-500">Candidato #{index + 1}</p>
              </div>
            </div>
            <button
              onClick={() => onRemover(candidato.id)}
              className="ml-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
              aria-label={`Remover ${candidato.nome}`}
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}

      {/* Estilos de animação */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ListaCandidatos;

