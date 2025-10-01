import { Vote, Users, FileText, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Bem-vindo ao Sistema de Votação
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Sistema para automatizar o processo de comissões de nomeações da Igreja Adventista
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/votacao"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
            >
              Iniciar Votação
            </Link>
            <Link
              to="/relatorios"
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
            >
              Ver Relatórios
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
            <Vote className="text-blue-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Votação Organizada</h3>
          <p className="text-gray-600">
            Sistema estruturado para votar em todos os ministérios e cargos da igreja
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
            <Users className="text-green-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Ministérios Completos</h3>
          <p className="text-gray-600">
            Lista completa de todos os ministérios e departamentos da IASD
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
            <FileText className="text-purple-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Relatórios em PDF</h3>
          <p className="text-gray-600">
            Gere relatórios profissionais para apresentação em assembleia
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
        <div className="flex items-start">
          <Info className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Sobre o Sistema
            </h3>
            <p className="text-gray-700 mb-3">
              Este sistema foi desenvolvido para facilitar o processo de comissão de nomeações,
              permitindo que a igreja organize de forma eficiente a votação para os diversos
              ministérios e cargos.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Todos os dados são armazenados localmente no seu navegador</li>
              <li>Nenhuma informação é enviada para servidores externos</li>
              <li>Funciona offline após o primeiro carregamento</li>
              <li>Compatível com todos os dispositivos modernos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

