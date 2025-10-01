import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar Desktop */}
      <Sidebar />

      {/* Sidebar Mobile (Drawer) */}
      <Sidebar
        isMobile
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <Menu size={24} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Sistema de Votação</h1>
          <div className="w-10" /> {/* Spacer para centralizar título */}
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <p className="text-sm text-center text-gray-600">
            © {new Date().getFullYear()} Igreja Adventista do Sétimo Dia - Sistema de Votação
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;

