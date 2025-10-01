import { useState } from 'react';
import { ministerios } from '../data/ministerios';
import type { Ministerio } from '../data/ministerios';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

const Ministerios = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredMinisterios = selectedCategory === 'all'
    ? ministerios
    : ministerios.filter(m => m.categoria === selectedCategory);

  const getCategoryColor = (categoria: string) => {
    switch (categoria) {
      case 'lideranca': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'ministerio': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'clube': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryName = (categoria: string) => {
    switch (categoria) {
      case 'lideranca': return 'Liderança';
      case 'ministerio': return 'Ministério';
      case 'clube': return 'Clube';
      default: return categoria;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Ministérios e Departamentos</h1>
        <p className="text-gray-600">
          Conheça todos os ministérios da Igreja Adventista do Sétimo Dia
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition ${selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Todos ({ministerios.length})
          </button>
          <button
            onClick={() => setSelectedCategory('lideranca')}
            className={`px-4 py-2 rounded-lg font-medium transition ${selectedCategory === 'lideranca'
              ? 'bg-purple-600 text-white'
              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
          >
            Liderança ({ministerios.filter(m => m.categoria === 'lideranca').length})
          </button>
          <button
            onClick={() => setSelectedCategory('ministerio')}
            className={`px-4 py-2 rounded-lg font-medium transition ${selectedCategory === 'ministerio'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
          >
            Ministérios ({ministerios.filter(m => m.categoria === 'ministerio').length})
          </button>
          <button
            onClick={() => setSelectedCategory('clube')}
            className={`px-4 py-2 rounded-lg font-medium transition ${selectedCategory === 'clube'
              ? 'bg-green-600 text-white'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
          >
            Clubes ({ministerios.filter(m => m.categoria === 'clube').length})
          </button>
        </div>
      </div>

      {/* Lista de Ministérios */}
      <div className="space-y-4">
        {filteredMinisterios.map((ministerio: Ministerio) => (
          <div
            key={ministerio.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div
              className="p-6 cursor-pointer"
              onClick={() => toggleExpanded(ministerio.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {ministerio.nome}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(ministerio.categoria)}`}>
                      {getCategoryName(ministerio.categoria)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{ministerio.descricao}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">{ministerio.cargos.length} cargo(s)</span>
                  </div>
                </div>
                <div className="ml-4">
                  {expandedId === ministerio.id ? (
                    <ChevronUp className="text-gray-400" size={24} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={24} />
                  )}
                </div>
              </div>
            </div>

            {expandedId === ministerio.id && (
              <div className="border-t border-gray-200 bg-gray-50 p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Info size={18} className="mr-2 text-blue-600" />
                    Descrição Detalhada
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{ministerio.explicacao}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Cargos do Ministério:</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {ministerio.cargos.map((cargo) => (
                      <div
                        key={cargo.id}
                        className="bg-white p-3 rounded-lg border border-gray-200"
                      >
                        <p className="font-medium text-gray-800">{cargo.nome}</p>
                        <p className="text-xs text-gray-500 mt-1 capitalize">
                          {cargo.tipo.replace('_', ' ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ministerios;

