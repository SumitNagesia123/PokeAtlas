import { useFavorites } from '../context/FavoritesContext';
import { usePokemonBatch } from '../hooks/usePokemon';
import { PokemonCard } from '../components/PokemonCard';

import { SkeletonLoader } from '../components/SkeletonLoader';

export default function Favorites() {
  const { favorites } = useFavorites();
  const { data: pokemonList, loading } = usePokemonBatch(favorites);

  if (favorites.length === 0) {
    return (
        title="Your Pokédex is empty"
        message="You haven't favorited any Pokémon yet."
        action={{ label: 'Explore Pokémon', href: '/pokedex' }}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold dark:text-dark-100">Favorites</h1>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <SkeletonLoader count={6} className="h-64" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {pokemonList?.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}
