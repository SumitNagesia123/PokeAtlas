import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

export function Navbar() {
  const { isDark, toggle } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/pokedex?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-2xl text-red-600 dark:text-red-500 transition-colors duration-200 hover:text-red-700"
          >
            Poké<span className="text-blue-600 dark:text-blue-400">Atlas</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-dark-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/pokedex"
              className="text-gray-700 dark:text-dark-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Pokédex
            </Link>
            <Link
              to="/types"
              className="text-gray-700 dark:text-dark-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Types
            </Link>
            <Link
              to="/generations"
              className="text-gray-700 dark:text-dark-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Generations
            </Link>
            <Link
              to="/compare"
              className="text-gray-700 dark:text-dark-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Compare
            </Link>
            <Link
              to="/favorites"
              className="text-gray-700 dark:text-dark-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Favorites
            </Link>
          </div>

          {/* Right side - Search, Theme, Mobile menu */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className={cn('relative transition-all duration-300', searchOpen ? 'w-48' : 'w-auto')}>
              {searchOpen ? (
                <form onSubmit={handleSearch} className="absolute right-0">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search Pokémon..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-40 px-3 py-2 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-900 dark:text-dark-100 placeholder-gray-500 dark:placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
                >
                  <Search className="w-5 h-5 text-gray-700 dark:text-dark-200" />
                </button>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-gray-700 dark:text-dark-200" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-dark-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-700"
            >
              Home
            </Link>
            <Link
              to="/pokedex"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-700"
            >
              Pokédex
            </Link>
            <Link
              to="/types"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-700"
            >
              Types
            </Link>
            <Link
              to="/generations"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-700"
            >
              Generations
            </Link>
            <Link
              to="/compare"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-700"
            >
              Compare
            </Link>
            <Link
              to="/favorites"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-700"
            >
              Favorites
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
