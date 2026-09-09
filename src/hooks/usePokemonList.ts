import { useCallback, useEffect, useState } from 'react';
import { getPokemon, getPokemonList } from '../services/pokemonApi';
import type { Pokemon } from '../types/pokemon';

interface UsePokemonListResult {
  pokemonList: Pokemon[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  total: number;
}

const PAGE_SIZE = 24;

export function usePokemonList(): UsePokemonListResult {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchPage = useCallback(async (pageOffset: number) => {
    setLoading(true);
    setError(null);

    try {
      const listData = await getPokemonList(PAGE_SIZE, pageOffset);
      setTotal(listData.count);
      setHasMore(listData.next !== null);

      const details = await Promise.all(
        listData.results.map((item: any) => getPokemon(item.name)),
      );

      setPokemonList(prev =>
        pageOffset === 0 ? details : [...prev, ...details],
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch Pokémon list',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(0);
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    const newOffset = offset + PAGE_SIZE;
    setOffset(newOffset);
    fetchPage(newOffset);
  }, [offset, fetchPage]);

  return { pokemonList, loading, error, hasMore, loadMore, total };
}
