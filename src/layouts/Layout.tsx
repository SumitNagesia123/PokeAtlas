import type { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-950 transition-colors duration-300">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="py-8 bg-gray-100 dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700 text-center">
        <p className="text-gray-600 dark:text-dark-400">
          PokéAtlas &copy; 2026. Data provided by PokéAPI.
        </p>
      </footer>
    </div>
  );
}
