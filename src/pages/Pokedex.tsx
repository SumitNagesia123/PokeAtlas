import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PokemonCard } from '../components/PokemonCard';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { usePokemonList } from '../hooks/usePokemon';
import { getPokemonList, getPokemonWithSpecies, searchPokemonByName, getPokemonBatchWithSpecies } from '../services/pokemonApi';
import type { Pokemon } from '../types/pokemon';

export default function Pokedex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch list and batch detail
  useEffect(() => {
    async function fetchList() {
      setLoading(true);

      if (search) {
        // Search logic
        const results = await searchPokemonByName(search);
        const batch = await getPokemonBatchWithSpecies(results.map(r => r.id));
        setPokemonList(batch);
        setOffset(0); // Reset offset on search
      } else {
        // Normal list logic
        const list = await getPokemonList(24, offset);
        const batch = await Promise.all(list.results.map(p => getPokemonWithSpecies(p.name)));

        if (offset === 0) {
          setPokemonList(batch);
        } else {
          setPokemonList(prev => [...prev, ...batch]);
        }
      }
      setLoading(false);
    }
    fetchList();
  }, [offset, search]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold dark:text-dark-100">Pokédex</h1>

      <div className="bg-white dark:bg-dark-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-dark-700">
        <input
          type="text"
          placeholder="Search Pokémon by name or number..."
          className="w-full px-4 py-2 border rounded-lg dark:bg-dark-900 border-gray-300 dark:border-dark-600 dark:text-dark-100"
          value={search}
          onChange={(e) => {
            const val = e.target.value;
            if (val) {
              setSearchParams({ search: val });
            } else {
              setSearchParams({});
            }
          }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {pokemonList.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
        {loading && <SkeletonLoader count={6} className="h-64" />}
      </div>

      {!search && (
        <button
          onClick={() => setOffset(prev => prev + 24)}
          className="mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Load More
        </button>
      )}
    </div>
  );
}
