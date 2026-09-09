import { Link } from 'react-router-dom';
import { ChevronRight, Globe } from 'lucide-react';
import { GENERATION_INFO, formatName } from '../utils/pokemon';
import { cn } from '../utils/cn';

const GENERATIONS = [
  { id: 1, key: 'generation-i', name: 'Generation I' },
  { id: 2, key: 'generation-ii', name: 'Generation II' },
  { id: 3, key: 'generation-iii', name: 'Generation III' },
  { id: 4, key: 'generation-iv', name: 'Generation IV' },
  { id: 5, key: 'generation-v', name: 'Generation V' },
  { id: 6, key: 'generation-vi', name: 'Generation VI' },
  { id: 7, key: 'generation-vii', name: 'Generation VII' },
  { id: 8, key: 'generation-viii', name: 'Generation VIII' },
  { id: 9, key: 'generation-ix', name: 'Generation IX' },
];

export default function Generations() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Pokémon Generations
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore the different generations of Pokémon games, each introducing new regions and Pokémon.
        </p>
      </div>

      {/* Generations List */}
      <div className="space-y-4">
        {GENERATIONS.map((gen, index) => {
          const info = GENERATION_INFO[gen.key];
          if (!info) return null;

          const count = info.range[1] - info.range[0] + 1;
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
          ][index];

          return (
            <Link
              key={gen.id}
              to={`/generations/${gen.id}`}
              className={cn(
                'group block relative overflow-hidden rounded-2xl p-6 transition-all duration-300',
                'hover:shadow-xl hover:scale-[1.01] cursor-pointer',
                'bg-gradient-to-r',
                gradientColors,
                'animate-fade-in-up',
              )}
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {gen.name}
                    </h3>
                    <p className="text-white/80">
                      {info.region} • #{info.range[0]}–#{info.range[1]} • {count} Pokémon
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-8 h-8 text-white/60 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}