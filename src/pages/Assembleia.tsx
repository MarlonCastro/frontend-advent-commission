import { Presentation, Info } from 'lucide-react';

const Assembleia = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Modo Assembleia</h1>
        <p className="text-gray-600">
          Apresentação dos resultados para a assembleia da igreja
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <Presentation className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Funcionalidade em Desenvolvimento
          </h2>
          <p className="text-gray-600 mb-6">
            O modo assembleia permitirá apresentar os resultados de forma visual e profissional.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 text-left">
            <div className="flex items-start">
              <Info className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Recursos Planejados:</h3>
                <ul className="list-disc list-inside text-blue-800 space-y-1">
                  <li>Visualização em tela cheia</li>
                  <li>Apresentação ministério por ministério</li>
                  <li>Animações de transição</li>
                  <li>Controle de slides</li>
                  <li>Ocultar informações sensíveis</li>
                  <li>Modo projetor otimizado</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assembleia;

