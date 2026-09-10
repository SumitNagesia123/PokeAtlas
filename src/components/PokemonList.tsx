import { useState, useEffect } from 'react';
import { pokemonApi, getPokemonWithSpecies } from '../services/pokemonApi';
import { PokemonCard } from './PokemonCard';
import { PokemonCardSkeleton } from './SkeletonLoader';
import type { Pokemon } from '../types/pokemon';

interface PokemonListProps {
  initialPokemonData?: Pokemon[];
  limit?: number;
  offset?: number;
}

export function PokemonList({
  initialPokemonData = [],
  limit = 12,
  offset = 0
}: PokemonListProps) {
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemonData);
  const [loading, setLoading] = useState(initialPokemonData.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialPokemonData.length > 0) {
      setPokemon(initialPokemonData);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    async function fetchPokemon() {
      try {
        const list = await pokemonApi.getPokemonList(limit, offset);

        // Fetch detailed data for each pokemon to display the card properly
        const detailedPokemon = await Promise.all(
          list.results.map(p => getPokemonWithSpecies(p.name))
        );

        if (isMounted) {
          setPokemon(detailedPokemon);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load Pokémon grid');
          setLoading(false);
        }
      }
    }

    fetchPokemon();

    return () => { isMounted = false; };
  }, [initialPokemonData, limit, offset]);

  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading
        ? Array.from({ length: limit }).map((_, i) => <PokemonCardSkeleton key={i} />)
        : pokemon.map((p, i) => (
            <PokemonCard
              key={p.id}
              pokemon={p}
              delay={(i % limit) * 0.05}
            />
          ))
      }
    </div>
  );
}
