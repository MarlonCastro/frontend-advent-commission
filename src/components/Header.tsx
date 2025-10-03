import { Link } from 'react-router-dom';
import { Church, Vote, Users, FileText, HelpCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            <Church size={32} />
            <div>
              <h1 className="text-2xl font-bold">Sistema de Votação</h1>
              <p className="text-sm text-blue-200">Igreja Adventista do Sétimo Dia</p>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link
              to="/votacao"
              className="flex items-center space-x-2 hover:text-blue-200 transition"
            >
              <Vote size={20} />
              <span>Votação</span>
            </Link>
            <Link
              to="/ministerios"
              className="flex items-center space-x-2 hover:text-blue-200 transition"
            >
              <Users size={20} />
              <span>Ministérios</span>
            </Link>
            <Link
              to="/relatorios"
              className="flex items-center space-x-2 hover:text-blue-200 transition"
            >
              <FileText size={20} />
              <span>Relatórios</span>
            </Link>
            <Link
              to="/ajuda"
              className="flex items-center space-x-2 hover:text-blue-200 transition"
            >
              <HelpCircle size={20} />
              <span>Ajuda</span>
            </Link>
          </nav>
        </div>

        {/* Menu mobile */}
        <nav className="md:hidden flex justify-around mt-4 border-t border-blue-600 pt-4">
          <Link
            to="/votacao"
            className="flex flex-col items-center space-y-1 hover:text-blue-200 transition"
          >
            <Vote size={20} />
            <span className="text-xs">Votação</span>
          </Link>
          <Link
            to="/ministerios"
            className="flex flex-col items-center space-y-1 hover:text-blue-200 transition"
          >
            <Users size={20} />
            <span className="text-xs">Ministérios</span>
          </Link>
          <Link
            to="/relatorios"
            className="flex flex-col items-center space-y-1 hover:text-blue-200 transition"
          >
            <FileText size={20} />
            <span className="text-xs">Relatórios</span>
          </Link>
          <Link
            to="/ajuda"
            className="flex flex-col items-center space-y-1 hover:text-blue-200 transition"
          >
            <HelpCircle size={20} />
            <span className="text-xs">Ajuda</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

