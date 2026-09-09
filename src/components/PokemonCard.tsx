import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { Pokemon } from '../types/pokemon';
import { TypeBadge } from './TypeBadge';
import { cn } from '../utils/cn';
import { formatName, formatPokemonId, TYPE_GRADIENTS } from '../utils/pokemon';
import { useFavorites } from '../hooks';

interface PokemonCardProps {
  pokemon: Pokemon;
  className?: string;
  delay?: number;
}

export function PokemonCard({ pokemon, className, delay = 0 }: PokemonCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(pokemon.id);

  const mainType = pokemon.types[0]?.type.name || 'normal';
  const gradientClass = TYPE_GRADIENTS[mainType] || TYPE_GRADIENTS.normal;

  const artworkUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

  return (
    <div
      className={cn(
        'group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in-up bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-700 hover:-translate-y-1',
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Background Gradient Top half */}
      <div className={cn('absolute top-0 left-0 right-0 h-24 bg-gradient-to-br opacity-20 dark:opacity-10', gradientClass)} />

      {/* Pokeball Background Pattern */}
      <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full pokeball-bg opacity-40 group-hover:scale-110 transition-transform duration-500" />

      <div className="p-4 relative">
        <div className="flex justify-between items-start mb-2">
          <span className="font-bold text-gray-500 dark:text-dark-300 text-sm">
            {formatPokemonId(pokemon.id)}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(pokemon.id);
            }}
            className="z-10 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              size={18}
              className={cn(
                "transition-colors duration-300",
                isFav ? "fill-red-500 text-red-500" : "text-gray-400 dark:text-dark-400 hover:text-red-500"
              )}
            />
          </button>
        </div>

        <Link to={`/pokemon/${pokemon.name}`} className="block text-center mt-[-20px] mb-2 relative z-10">
          <div className="h-28 w-28 mx-auto relative group-hover:scale-110 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
            {artworkUrl ? (
              <img
                src={artworkUrl}
                alt={pokemon.name}
                className="w-full h-full object-contain filter drop-shadow-md"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 dark:bg-dark-700 rounded-full animate-pulse" />
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize mt-2 mb-3 truncate">
            {formatName(pokemon.name)}
          </h3>
        </Link>

        <div className="flex justify-center gap-2 flex-wrap relative z-10">
          {pokemon.types.map(({ type }) => (
            <TypeBadge key={type.name} type={type.name} size="sm" />
          ))}
        </div>
      </div>

      {/* Clickable overlay (so the whole card is a link except the heart button) */}
      <Link
        to={`/pokemon/${pokemon.name}`}
        className="absolute inset-0 z-0"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
