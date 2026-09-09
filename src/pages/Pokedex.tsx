import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { usePokemonList } from '../hooks/usePokemonList';
import { PokemonCard } from '../components/PokemonCard';
import { PokemonCardSkeleton } from '../components/SkeletonLoader';

import { ALL_TYPES, GENERATION_INFO } from '../utils/pokemon';
import { useDebounce } from '../hooks/useDebounce';

export default function Pokedex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pokemonList, loading, error, hasMore, loadMore } = usePokemonList();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const selectedType = searchParams.get('type') || 'all';
  const selectedGen = searchParams.get('gen') || 'all';
  const sortBy = searchParams.get('sort') || 'id-asc';

  // Sync type filter if provided via URL
  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  const filteredPokemon = useMemo(() => {
    return pokemonList
      .filter(pokemon => {
        // Search filter
        if (debouncedSearch) {
          const matchName = pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase());
          const matchId = pokemon.id.toString() === debouncedSearch;
          if (!matchName && !matchId) return false;
        }

        // Type filter
        if (selectedType !== 'all') {
          const hasType = pokemon.types.some(t => t.type.name === selectedType);
          if (!hasType) return false;
        }

        // Generation filter
        if (selectedGen !== 'all') {
          const genInfo = GENERATION_INFO[selectedGen];
          if (genInfo) {
            const [min, max] = genInfo.range;
            if (pokemon.id < min || pokemon.id > max) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'id-asc') return a.id - b.id;
        if (sortBy === 'id-desc') return b.id - a.id;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        return 0;
      });
  }, [pokemonList, debouncedSearch, selectedType, selectedGen, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
          Pokédex
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Explore every Pokémon and discover their unique abilities.
        </p>
      </div>

      {/* Controls / Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or number..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={e => setFilter('type', e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 font-medium focus:ring-2 focus:ring-red-500 outline-none capitalize"
          >
            <option value="all">All Types</option>
            {ALL_TYPES.map(type => (
              <option key={type} value={type} className="capitalize">
                {type}
              </option>
            ))}
          </select>

          {/* Generation Filter */}
          <select
            value={selectedGen}
            onChange={e => setFilter('gen', e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 font-medium focus:ring-2 focus:ring-red-500 outline-none capitalize"
          >
            <option value="all">All Gens</option>
            {Object.keys(GENERATION_INFO).map(gen => (
              <option key={gen} value={gen} className="capitalize">
                {gen.replace('-', ' ')}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={e => setFilter('sort', e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 font-medium focus:ring-2 focus:ring-red-500 outline-none"
          >
            <option value="id-asc">Lowest Number</option>
            <option value="id-desc">Highest Number</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Pokémon Grid */}
      {error ? (
      ) : filteredPokemon.length === 0 && !loading ? (
          title="No Pokémon Found"
          description="Try adjusting your search criteria or clear some filters."
          action={
            <button
              onClick={() => {
                setSearch('');
                setSearchParams(new URLSearchParams());
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium"
            >
              Reset Filters
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredPokemon.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
          {loading && Array.from({ length: 12 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="h-48 rounded-xl bg-gray-200 dark:bg-dark-700 animate-pulse" />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center pt-8">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Load More Pokémon
          </button>
        </div>
      )}
    </div>
  );
}
