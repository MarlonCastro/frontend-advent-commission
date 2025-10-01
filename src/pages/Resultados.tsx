import { FileText } from 'lucide-react';

const Resultados = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Resultados da Votação</h1>
        <p className="text-gray-600">
          Visualize e exporte os resultados da comissão de nomeações
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <FileText className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Funcionalidade em Desenvolvimento
          </h2>
          <p className="text-gray-600 mb-6">
            A funcionalidade de votação e resultados será implementada nos próximos passos.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 text-left">
            <h3 className="font-semibold text-blue-900 mb-2">Recursos Planejados:</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Sistema de votação para cada cargo</li>
              <li>Contagem automática de votos</li>
              <li>Geração de relatórios em PDF</li>
              <li>Exportação de dados</li>
              <li>Histórico de votações</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resultados;

