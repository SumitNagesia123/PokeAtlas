import { Link } from 'react-router-dom';
import { TypeBadge } from '../components/TypeBadge';
import { ALL_TYPES, TYPE_COLORS } from '../utils/pokemon';
import { cn } from '../utils/cn';

const TYPE_DESCRIPTIONS: Record<string, string> = {
  normal: 'Normal-type Pokémon have no specific strengths or weaknesses.',
  fire: 'Fire-type Pokémon are strong against Grass, Ice, Bug, and Steel types.',
  water: 'Water-type Pokémon are strong against Fire, Ground, and Rock types.',
  electric: 'Electric-type Pokémon are strong against Water and Flying types.',
  grass: 'Grass-type Pokémon are strong against Water, Ground, and Rock types.',
  ice: 'Ice-type Pokémon are strong against Dragon, Flying, Grass, and Ground types.',
  fighting: 'Fighting-type Pokémon are strong against Normal, Ice, Rock, Dark, and Steel types.',
  poison: 'Poison-type Pokémon are strong against Grass and Fairy types.',
  ground: 'Ground-type Pokémon are strong against Fire, Electric, Poison, Rock, and Steel types.',
  flying: 'Flying-type Pokémon are strong against Bug, Fighting, and Grass types.',
  psychic: 'Psychic-type Pokémon are strong against Fighting and Poison types.',
  bug: 'Bug-type Pokémon are strong against Grass, Psychic, and Dark types.',
  rock: 'Rock-type Pokémon are strong against Fire, Flying, Ice, and Bug types.',
  ghost: 'Ghost-type Pokémon are strong against Psychic and Ghost types.',
  dragon: 'Dragon-type Pokémon are strong against other Dragon types.',
  dark: 'Dark-type Pokémon are strong against Psychic and Ghost types.',
  steel: 'Steel-type Pokémon are strong against Ice, Rock, and Fairy types.',
  fairy: 'Fairy-type Pokémon are strong against Fighting, Dragon, and Dark types.',
};

export default function Types() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Pokémon Types
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore the elemental types that define each Pokémon's strengths and weaknesses.
        </p>
      </div>

      {/* Types Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {ALL_TYPES.map((type, index) => (
          <Link
            key={type}
            to={`/types/${type}`}
            className={cn(
              'group relative overflow-hidden rounded-2xl p-6 transition-all duration-300',
              'hover:shadow-xl hover:scale-105 cursor-pointer',
              'animate-fade-in-up',
            )}
            style={{
              backgroundColor: TYPE_COLORS[type],
              animationDelay: `${index * 0.05}s`,
              animationFillMode: 'both',
            }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Content */}
            <div className="relative z-10 text-center">
              <h3 className="text-lg font-bold text-white mb-2">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </h3>
              <p className="text-xs text-white/80 line-clamp-2">
                {TYPE_DESCRIPTIONS[type]}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
