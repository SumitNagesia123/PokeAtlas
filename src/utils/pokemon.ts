/** Pokémon type color map */
export const TYPE_COLORS: Record<string, string> = {
  normal: '#a8a878',
  fire: '#f08030',
  water: '#6890f0',
  electric: '#f8d030',
  grass: '#78c850',
  ice: '#98d8d8',
  fighting: '#c03028',
  poison: '#a040a0',
  ground: '#e0c068',
  flying: '#a890f0',
  psychic: '#f85888',
  bug: '#a8b820',
  rock: '#b8a038',
  ghost: '#705898',
  dragon: '#7038f8',
  dark: '#705848',
  steel: '#b8b8d0',
  fairy: '#ee99ac',
};

/** Lighter/gradient variants for backgrounds */
export const TYPE_GRADIENTS: Record<string, string> = {
  normal: 'from-stone-400 to-stone-500',
  fire: 'from-orange-400 to-red-500',
  water: 'from-blue-400 to-blue-600',
  electric: 'from-yellow-300 to-amber-500',
  grass: 'from-green-400 to-emerald-600',
  ice: 'from-cyan-300 to-blue-400',
  fighting: 'from-red-600 to-red-800',
  poison: 'from-purple-500 to-purple-700',
  ground: 'from-amber-400 to-yellow-700',
  flying: 'from-indigo-300 to-purple-400',
  psychic: 'from-pink-400 to-pink-600',
  bug: 'from-lime-500 to-green-600',
  rock: 'from-yellow-600 to-amber-800',
  ghost: 'from-purple-600 to-indigo-800',
  dragon: 'from-indigo-600 to-violet-800',
  dark: 'from-gray-700 to-gray-900',
  steel: 'from-gray-400 to-slate-500',
  fairy: 'from-pink-300 to-pink-500',
};

/** Generation info */
export const GENERATION_INFO: Record<string, { region: string; range: [number, number] }> = {
  'generation-i': { region: 'Kanto', range: [1, 151] },
  'generation-ii': { region: 'Johto', range: [152, 251] },
  'generation-iii': { region: 'Hoenn', range: [252, 386] },
  'generation-iv': { region: 'Sinnoh', range: [387, 493] },
  'generation-v': { region: 'Unova', range: [494, 649] },
  'generation-vi': { region: 'Kalos', range: [650, 721] },
  'generation-vii': { region: 'Alola', range: [722, 809] },
  'generation-viii': { region: 'Galar', range: [810, 905] },
  'generation-ix': { region: 'Paldea', range: [906, 1025] },
};

/** Format Pokédex number with leading zeros */
export function formatPokemonId(id: number): string {
  return `#${String(id).padStart(3, '0')}`;
}

/** Capitalize first letter of each word, replace hyphens with spaces */
export function formatName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Get official artwork URL */
export function getArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

/** Extract ID from a PokéAPI resource URL */
export function extractIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, '').split('/');
  return parseInt(parts[parts.length - 1], 10);
}

/** Stat name mapping for display */
export const STAT_DISPLAY_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

/** Stat colors */
export const STAT_COLORS: Record<string, string> = {
  hp: '#ef4444',
  attack: '#f97316',
  defense: '#eab308',
  'special-attack': '#3b82f6',
  'special-defense': '#22c55e',
  speed: '#ec4899',
};

/** Convert hectograms to kg and lbs */
export function formatWeight(hectograms: number): string {
  const kg = hectograms / 10;
  const lbs = kg * 2.20462;
  return `${kg.toFixed(1)} kg (${lbs.toFixed(1)} lbs)`;
}

/** Convert decimeters to meters and feet */
export function formatHeight(decimeters: number): string {
  const meters = decimeters / 10;
  const feet = meters * 3.28084;
  const ft = Math.floor(feet);
  const inches = Math.round((feet - ft) * 12);
  return `${meters.toFixed(1)} m (${ft}'${inches}")`;
}

/** Get gender ratio text from gender_rate (-1 = genderless, 0-8 = female eighths) */
export function getGenderRatio(genderRate: number): string {
  if (genderRate === -1) return 'Genderless';
  const femalePercent = (genderRate / 8) * 100;
  const malePercent = 100 - femalePercent;
  return `${malePercent}% male, ${femalePercent}% female`;
}

/** Clean up flavor text (remove control characters and extra whitespace) */
export function cleanFlavorText(text: string): string {
  return text.replace(/[\n\f\r]/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Debounce-free list of all pokemon types */
export const ALL_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
];

/** Get a random integer between min and max (inclusive) */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
