import { Link, useLocation } from 'react-router-dom';
import { Vote, Presentation, FileText, Church, X, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({
  isOpen = true,
  onClose,
  isMobile = false,
  isCollapsed = false,
  onToggleCollapse
}: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/votacao',
      label: 'Votação',
      icon: Vote,
      description: 'Sistema de votação',
    },
    {
      path: '/assembleia',
      label: 'Modo Assembleia',
      icon: Presentation,
      description: 'Apresentação pública',
    },
    {
      path: '/relatorios',
      label: 'Relatórios',
      icon: FileText,
      description: 'Gerar relatórios PDF',
    },
    {
      path: '/ajuda',
      label: 'Ajuda',
      icon: HelpCircle,
      description: 'Tutorial e suporte',
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`border-b border-gray-200 bg-gradient-to-r from-blue-900 to-blue-700 ${isCollapsed && !isMobile ? 'p-3' : 'p-6'}`}>
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center w-full' : 'space-x-3'}`}>
            <Church className="text-white" size={isCollapsed && !isMobile ? 28 : 32} />
            {(!isCollapsed || isMobile) && (
              <div>
                <h1 className="text-lg font-bold text-white">Sistema de Votação</h1>
                <p className="text-xs text-blue-200">IASD</p>
              </div>
            )}
          </div>
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="text-white hover:bg-blue-800 p-2 rounded-lg transition"
            >
              <X size={24} />
            </button>
          )}
          {!isMobile && onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="text-white hover:bg-blue-800 p-2 rounded-lg transition"
              title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className={`flex-1 p-4 space-y-2 overflow-y-auto ${isCollapsed && !isMobile ? 'px-2' : ''}`}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={isMobile ? onClose : undefined}
              title={isCollapsed && !isMobile ? item.label : undefined}
              className={`
                flex items-center rounded-lg transition-all
                ${isCollapsed && !isMobile
                  ? 'justify-center p-3'
                  : 'space-x-3 px-4 py-3'
                }
                ${active
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <Icon size={22} className="flex-shrink-0" />
              {(!isCollapsed || isMobile) && (
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className={`text-xs ${active ? 'text-blue-100' : 'text-gray-500'}`}>
                    {item.description}
                  </p>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {(!isCollapsed || isMobile) && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <Link
            to="/ministerios"
            onClick={isMobile ? onClose : undefined}
            className="block text-center text-sm text-blue-600 hover:text-blue-800 font-medium transition"
          >
            Ver Todos os Ministérios
          </Link>
        </div>
      )}
    </div>
  );

  // Mobile Drawer
  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={onClose}
          />
        )}

        {/* Drawer */}
        <aside
          className={`
            fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <aside className={`
      hidden md:block bg-white border-r border-gray-200 h-screen sticky top-0 overflow-hidden
      transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-20' : 'w-80'}
    `}>
      {sidebarContent}
    </aside>
  );
};

export default Sidebar;

