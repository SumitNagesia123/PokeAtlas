import { useParams, Link } from 'react-router-dom';
import { Heart, ArrowLeft, Ruler, Weight, Sparkles, Shield } from 'lucide-react';
import { usePokemon } from '../hooks/usePokemon';
import { useFavorites } from '../context/FavoritesContext';
import { StatBar } from '../components/StatBar';
import { TypeBadge } from '../components/TypeBadge';

import {
  formatPokemonId,
  formatName,
  formatWeight,
  formatHeight,
  cleanFlavorText,
  getArtworkUrl,
  extractIdFromUrl,
  TYPE_COLORS
} from '../utils/pokemon';
import type { EvolutionChainLink } from '../types/pokemon';

export default function PokemonDetail() {
  const { name } = useParams<{ name: string }>();
  const { data: pokemon, loading, error } = usePokemon(name || '');
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse space-y-8">
        <div className="h-8 w-32 bg-gray-200 dark:bg-dark-800 rounded" />
        <div className="h-96 bg-gray-200 dark:bg-dark-800 rounded-3xl" />
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
      </div>
    );
  }

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const color = TYPE_COLORS[primaryType];
  const favorite = isFavorite(pokemon.id);

  // Parse evolution chain
  const renderEvolutions = (chainLink: EvolutionChainLink | null) => {
    if (!chainLink) return null;

    const evoList: { name: string; id: number }[] = [];
    let current: EvolutionChainLink | undefined = chainLink;

    while (current) {
      const id = extractIdFromUrl(current.species.url);
      evoList.push({ name: current.species.name, id });
      current = current.evolves_to[0];
    }

    return (
      <div className="flex flex-wrap items-center justify-center gap-6">
        {evoList.map((evo, index) => (
          <div key={evo.id} className="flex items-center gap-6">
            <Link
              to={`/pokemon/${evo.name}`}
              className="flex flex-col items-center group p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
            >
              <img
                src={getArtworkUrl(evo.id)}
                alt={evo.name}
                className="w-24 h-24 object-contain group-hover:scale-110 transition-transform"
              />
              <span className="font-bold text-sm text-gray-900 dark:text-white capitalize mt-2">
                {formatName(evo.name)}
              </span>
              <span className="text-xs text-gray-400 font-semibold">
                {formatPokemonId(evo.id)}
              </span>
            </Link>
            {index < evoList.length - 1 && (
              <span className="text-2xl text-gray-300 dark:text-gray-600 font-bold">&rarr;</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const flavorText = (pokemon as any)?.species?.flavor_text_entries?.find(
    (entry: any) => entry.language.name === 'en'
  )?.flavor_text;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Button */}
      <Link
        to="/pokedex"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Pokédex
      </Link>

      {/* Main Showcase Header */}
      <div
        className="relative overflow-hidden rounded-3xl p-8 sm:p-12 border border-white/20 shadow-xl"
        style={{
          background: `linear-gradient(135deg, ${color}25 0%, rgba(0,0,0,0) 100%)`,
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-lg font-black text-gray-500 dark:text-gray-400">
              {formatPokemonId(pokemon.id)}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black capitalize text-gray-900 dark:text-white">
              {formatName(pokemon.name)}
            </h1>
            <div className="flex gap-2 justify-center md:justify-start">
              {pokemon.types.map(t => (
                <TypeBadge key={t.type.name} type={t.type.name} size="md" />
              ))}
            </div>
          </div>

          <div className="relative flex flex-col items-center">
            <img
              src={getArtworkUrl(pokemon.id)}
              alt={pokemon.name}
              className="w-56 h-56 sm:w-64 sm:h-64 object-contain animate-float drop-shadow-2xl"
            />
            <button
              onClick={() => toggleFavorite(pokemon.id)}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md hover:scale-105 transition-all text-sm font-semibold"
            >
              <Heart
                size={18}
                className={favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
              />
              {favorite ? 'Favorited' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>

      {/* About & Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* About Section */}
        <div className="p-6 bg-white dark:bg-dark-800 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles size={20} className="text-amber-500" />
            About
          </h2>

          {flavorText && (
            <p className="text-gray-600 dark:text-gray-300 italic text-sm leading-relaxed">
              "{cleanFlavorText(flavorText)}"
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Ruler className="text-gray-400" size={20} />
              <div>
                <span className="text-xs text-gray-400 block">Height</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {formatHeight(pokemon.height)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Weight className="text-gray-400" size={20} />
              <div>
                <span className="text-xs text-gray-400 block">Weight</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {formatWeight(pokemon.weight)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Abilities</h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((a: any) => (
                <span
                  key={a.ability.name}
                  className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs font-semibold capitalize"
                >
                  {formatName(a.ability.name)} {a.is_hidden && '(Hidden)'}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Base Stats Section */}
        <div className="p-6 bg-white dark:bg-dark-800 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Shield size={20} className="text-blue-500" />
            Base Stats
          </h2>

          <div className="space-y-4">
            {pokemon.stats.map((stat: any) => (
              <StatBar
                key={stat.stat.name}
                name={stat.stat.name}
                value={stat.base_stat}
              />
            ))}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between font-bold text-sm">
              <span className="text-gray-500">Total Base Stats</span>
              <span className="text-gray-900 dark:text-white">
                {pokemon.stats.reduce((acc: number, curr: any) => acc + curr.base_stat, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Evolution Chain Section */}
      <div className="p-6 sm:p-8 bg-white dark:bg-dark-800 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Evolution Chain</h2>
        {(pokemon as any)?.evolution ? (
          renderEvolutions((pokemon as any).evolution.chain)
        ) : (
          <p className="text-gray-400 text-sm">No evolution data available.</p>
        )}
      </div>

      {/* Learnable Moves Preview */}
      <div className="p-6 sm:p-8 bg-white dark:bg-dark-800 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Moves ({pokemon.moves.length})</h2>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2">
          {pokemon.moves.map((m: any) => (
            <span
              key={m.move.name}
              className="px-3 py-1.5 bg-gray-50 dark:bg-dark-700/50 border border-gray-100 dark:border-gray-700 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-300 capitalize"
            >
              {formatName(m.move.name)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
