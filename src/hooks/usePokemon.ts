import { useEffect, useState } from 'react';
import { getPokemon, getPokemonList, getPokemonBatch, getPokemonBatchWithSpecies, getPokemonType, searchPokemonByName, getPokemonSpecies, getEvolutionChain } from '../services/pokemonApi';
import type { Pokemon, PokemonListResponse, PokemonTypeDetail } from '../types/pokemon';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useAsync<T>(
  asyncFn: () => Promise<T>,
  deps: unknown[] = [],
): UseAsyncState<T> {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await asyncFn();
        if (mounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (mounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error(String(error)),
          });
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, deps);

  return state;
}

export function usePokemonList(limit = 24, offset = 0) {
  return useAsync(
    () => getPokemonList(limit, offset),
    [limit, offset],
  ) as UseAsyncState<PokemonListResponse>;
}

export function usePokemon(nameOrId: string | number | null) {
  return useAsync(
    async () => {
      if (!nameOrId) return null as any;

      try {
        // Fetch main pokemon data
        const pokemon = await getPokemon(nameOrId);

        // Fetch species data (includes evolution chain URL)
        const species = await getPokemonSpecies(nameOrId);

        // Extract evolution chain ID from the URL
        const evolutionChainUrl = species.evolution_chain?.url;
        let evolution = null;

        if (evolutionChainUrl) {
          // Extract ID from URL like: https://pokeapi.co/api/v2/evolution-chain/1/
          const chainId = parseInt(evolutionChainUrl.split('/').filter(Boolean).pop() || '0', 10);
          if (chainId > 0) {
            evolution = await getEvolutionChain(chainId);
          }
        }

        // Attach species and evolution data to pokemon object
        return {
          ...pokemon,
          species,
          evolution,
          is_legendary: species.is_legendary,
          is_mythical: species.is_mythical,
        } as any;
      } catch (error) {
        console.error('Error fetching pokemon details:', error);
        throw error;
      }
    },
    [nameOrId],
  ) as UseAsyncState<Pokemon | null>;
}

export function usePokemonType(name: string | null) {
  return useAsync(
    () => {
      if (!name) return Promise.resolve(null as any);
      return getPokemonType(name);
    },
    [name],
  ) as UseAsyncState<PokemonTypeDetail | null>;
}

export function usePokemonBatch(ids: number[]) {
  return useAsync(
    () => getPokemonBatchWithSpecies(ids),
    [JSON.stringify(ids)],
  ) as UseAsyncState<Pokemon[]>;
}

export function useSearchPokemon(query: string) {
  return useAsync(
    () => searchPokemonByName(query),
    [query],
  ) as UseAsyncState<{ name: string; id: number }[]>;
}

export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
