import { useEffect, useState } from 'react';
import { getPokemon, getPokemonList, getPokemonBatch, getPokemonType, searchPokemonByName } from '../services/pokemonApi';
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
    () => {
      if (!nameOrId) return Promise.resolve(null as any);
      return getPokemon(nameOrId);
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
    () => getPokemonBatch(ids),
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
