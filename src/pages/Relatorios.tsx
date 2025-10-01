import { FileText, Info } from 'lucide-react';

const Relatorios = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Relatórios</h1>
        <p className="text-gray-600">
          Gere e exporte relatórios das votações realizadas
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <FileText className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Funcionalidade em Desenvolvimento
          </h2>
          <p className="text-gray-600 mb-6">
            O sistema de relatórios permitirá gerar documentos profissionais em PDF.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 text-left">
            <div className="flex items-start">
              <Info className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Recursos Planejados:</h3>
                <ul className="list-disc list-inside text-blue-800 space-y-1">
                  <li>Relatório geral de todas as votações</li>
                  <li>Relatório individual por ministério</li>
                  <li>Ata da comissão de nomeações</li>
                  <li>Lista de eleitos por categoria</li>
                  <li>Estatísticas e gráficos</li>
                  <li>Exportação em PDF e Excel</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relatorios;

