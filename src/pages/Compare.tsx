import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useSearchPokemon, usePokemonBatch } from '../hooks/usePokemon';
import { PokemonCard } from '../components/PokemonCard';

export default function Compare() {
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { data: searchResults = [] } = useSearchPokemon(query);
  const { data: compareList = [] } = usePokemonBatch(selectedIds);

  const addPokemon = (id: number) => {
    if (selectedIds.length < 4 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
      setQuery('');
    }
  };

  const removePokemon = (id: number) => {
    setSelectedIds(selectedIds.filter(fid => fid !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold dark:text-dark-100">Compare Pokémon</h1>

      {/* Search */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Pokémon to compare (max 4)..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 dark:text-dark-100"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {query && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 z-20">
            {searchResults?.map((p: any) => (
              <button
                key={p.id}
                onClick={() => addPokemon(p.id)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 dark:text-dark-100"
              >
                {p.name} #{p.id}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {compareList?.map((p: any) => (
          <div key={p.id} className="relative">
            <PokemonCard pokemon={p} />
            <button
              onClick={() => removePokemon(p.id)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      {compareList && compareList.length > 0 && (
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b dark:border-dark-700">
                <th className="py-2">Stat</th>
                {compareList.map((p: any) => <th key={p.id} className="py-2">{p.name}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-700">
              {['hp', 'attack', 'defense', 'speed'].map((stat: string) => (
                <tr key={stat}>
                  <td className="py-2 capitalize font-semibold dark:text-dark-100">{stat}</td>
                  {compareList.map((p: any) => (
                    <td key={p.id} className="py-2 dark:text-dark-200">
                      {p.stats.find((s: any) => s.stat.name === stat)?.base_stat}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
