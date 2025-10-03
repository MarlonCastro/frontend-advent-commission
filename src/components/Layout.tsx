import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white text-center py-6 mt-12">
        <p className="text-sm">
          © 2025 - Marlon Castro - Sistema de votação - Dúvidas? marloncastro78@gmail.com
        </p>
      </footer>
    </div>
  );
};

export default Layout;

