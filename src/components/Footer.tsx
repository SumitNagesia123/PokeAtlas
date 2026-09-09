import { Link } from 'react-router-dom';
import { Heart, Code2 } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-2">
              PokéAtlas
            </h3>
            <p className="text-sm text-gray-600 dark:text-dark-300">
              Explore. Discover. Catch them all.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 dark:text-dark-300 hover:text-red-500 transition-colors">Home</Link></li>
              <li><Link to="/pokedex" className="text-gray-600 dark:text-dark-300 hover:text-red-500 transition-colors">Pokédex</Link></li>
              <li><Link to="/types" className="text-gray-600 dark:text-dark-300 hover:text-red-500 transition-colors">Types</Link></li>
              <li><Link to="/generations" className="text-gray-600 dark:text-dark-300 hover:text-red-500 transition-colors">Generations</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-dark-300 hover:text-red-500 transition-colors">PokéAPI</a></li>
              <li><a href="https://pokemon.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-dark-300 hover:text-red-500 transition-colors">Official Pokémon</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Connect</h4>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-600 dark:text-dark-300 hover:text-red-500 transition-colors">
              <Code2 size={18} />
              <span className="text-sm">GitHub</span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-dark-700 pt-8">
          <p className="text-center text-sm text-gray-600 dark:text-dark-300 flex items-center justify-center gap-1">
            Data provided by <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-red-500 transition-colors">PokéAPI</a>
            <span>•</span>
            Made with <Heart size={14} className="text-red-500 inline" /> by PokéAtlas
          </p>
          <p className="text-center text-xs text-gray-500 dark:text-dark-400 mt-4">
            © {year} PokéAtlas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
