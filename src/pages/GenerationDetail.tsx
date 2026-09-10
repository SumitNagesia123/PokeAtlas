import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePokemonBatch } from '../hooks/usePokemon';
import { PokemonCard } from '../components/PokemonCard';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { GENERATION_INFO, formatName } from '../utils/pokemon';

const GENERATION_NAMES: Record<number, { name: string; key: string; region: string }> = {
  1: { name: 'Generation I', key: 'generation-i', region: 'Kanto' },
  2: { name: 'Generation II', key: 'generation-ii', region: 'Johto' },
  3: { name: 'Generation III', key: 'generation-iii', region: 'Hoenn' },
  4: { name: 'Generation IV', key: 'generation-iv', region: 'Sinnoh' },
  5: { name: 'Generation V', key: 'generation-v', region: 'Unova' },
  6: { name: 'Generation VI', key: 'generation-vi', region: 'Kalos' },
  7: { name: 'Generation VII', key: 'generation-vii', region: 'Alola' },
  8: { name: 'Generation VIII', key: 'generation-viii', region: 'Galar' },
  9: { name: 'Generation IX', key: 'generation-ix', region: 'Paldea' },
};

export default function GenerationDetail() {
  const { generationId } = useParams<{ generationId: string }>();
  const genId = parseInt(generationId || '1', 10);

  const genInfo = GENERATION_NAMES[genId];
  if (!genInfo) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link
          to="/generations"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Generations
        </Link>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Generation not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Please select a valid generation.
          </p>
        </div>
      </div>
    );
  }

  const generationData = GENERATION_INFO[genInfo.key];
  if (!generationData) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link
          to="/generations"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Generations
        </Link>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Generation data not found
          </h1>
        </div>
      </div>
    );
  }

  // Generate list of Pokémon IDs for this generation
  const [minId, maxId] = generationData.range;
  const pokemonIds = Array.from({ length: maxId - minId + 1 }, (_, i) => minId + i);

  const { data: pokemonList, loading } = usePokemonBatch(pokemonIds);

  const gradientColors = [
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-violet-500 to-purple-600',
    'from-sky-500 to-blue-600',
    'from-indigo-500 to-blue-600',
    'from-teal-500 to-cyan-600',
    'from-slate-500 to-gray-600',
    'from-red-500 to-rose-600',
  ][genId - 1] || 'from-gray-500 to-gray-600';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Button */}
      <Link
        to="/generations"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Generations
      </Link>

      {/* Header */}
      <div
        className={`relative overflow-hidden rounded-3xl p-8 sm:p-12 bg-gradient-to-r ${gradientColors} border border-white/20 shadow-xl`}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
            {genInfo.name}
          </h1>
          <p className="text-white/90 text-lg">
            {genInfo.region} Region • #{minId}–#{maxId} • {maxId - minId + 1} Pokémon
          </p>
        </div>
      </div>

      {/* Pokémon Grid */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Pokémon
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <SkeletonLoader count={12} className="h-64" />
          </div>
        ) : pokemonList && pokemonList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {pokemonList.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No Pokémon data available for this generation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
