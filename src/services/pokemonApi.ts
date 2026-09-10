import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type {
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
  EvolutionChain,
  PokemonTypeDetail,
  Generation,
  AbilityDetail,
  MoveDetail,
} from '../types/pokemon';

const API_BASE = 'https://pokeapi.co/api/v2';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

/** Simple in-memory cache */
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data as T;
  }
  cache.delete(key);
  return null;
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() });
}

async function cachedGet<T>(url: string): Promise<T> {
  const cached = getCached<T>(url);
  if (cached) return cached;

  const response = await api.get<T>(url);
  setCache(url, response.data);
  return response.data;
}

/** Fetch a page of Pokémon (basic list with name + url) */
export async function getPokemonList(
  limit = 24,
  offset = 0,
): Promise<PokemonListResponse> {
  return cachedGet<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`,
  );
}

/** Fetch full details for a single Pokémon */
export async function getPokemon(
  nameOrId: string | number,
): Promise<Pokemon> {
  return cachedGet<Pokemon>(`/pokemon/${nameOrId}`);
}

/** Fetch species data (flavor text, evolution chain URL, habitat, etc.) */
export async function getPokemonSpecies(
  nameOrId: string | number,
): Promise<PokemonSpecies> {
  return cachedGet<PokemonSpecies>(`/pokemon-species/${nameOrId}`);
}

/** Fetch evolution chain by its ID */
export async function getEvolutionChain(id: number): Promise<EvolutionChain> {
  return cachedGet<EvolutionChain>(`/evolution-chain/${id}`);
}

/** Fetch type details (damage relations, Pokémon, moves) */
export async function getPokemonType(name: string): Promise<PokemonTypeDetail> {
  return cachedGet<PokemonTypeDetail>(`/type/${name}`);
}

/** Fetch generation data */
export async function getGeneration(id: number | string): Promise<Generation> {
  return cachedGet<Generation>(`/generation/${id}`);
}

/** Fetch all generations (there are 9) */
export async function getAllGenerations(): Promise<Generation[]> {
  const promises = Array.from({ length: 9 }, (_, i) => getGeneration(i + 1));
  return Promise.all(promises);
}

/** Fetch all type details */
export async function getAllTypes(): Promise<PokemonTypeDetail[]> {
  const typeNames = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
  ];
  const promises = typeNames.map(name => getPokemonType(name));
  return Promise.all(promises);
}

/** Fetch ability details */
export async function getAbility(
  nameOrId: string | number,
): Promise<AbilityDetail> {
  return cachedGet<AbilityDetail>(`/ability/${nameOrId}`);
}

/** Fetch move details */
export async function getMove(
  nameOrId: string | number,
): Promise<MoveDetail> {
  return cachedGet<MoveDetail>(`/move/${nameOrId}`);
}

/**
 * Fetch a single Pokémon with species data (is_legendary, is_mythical) merged in.
 */
export async function getPokemonWithSpecies(
  nameOrId: string | number,
): Promise<Pokemon> {
  const [pokemon, species] = await Promise.all([
    getPokemon(nameOrId),
    getPokemonSpecies(nameOrId),
  ]);
  return {
    ...pokemon,
    is_legendary: species.is_legendary,
    is_mythical: species.is_mythical,
  };
}

/**
 * Fetch multiple Pokémon by their IDs efficiently.
 */
export async function getPokemonBatch(
  ids: number[],
): Promise<Pokemon[]> {
  const promises = ids.map(id => getPokemon(id));
  return Promise.all(promises);
}

/**
 * Fetch multiple Pokémon by their IDs with species data (is_legendary, is_mythical).
 */
export async function getPokemonBatchWithSpecies(
  ids: number[],
): Promise<Pokemon[]> {
  const promises = ids.map(id => getPokemonWithSpecies(id));
  return Promise.all(promises);
}

/**
 * Search Pokémon by name prefix or ID.
 */
let allPokemonNamesCache: { name: string; id: number }[] | null = null;

export async function searchPokemonByName(
  query: string,
): Promise<{ name: string; id: number }[]> {
  if (!allPokemonNamesCache) {
    const response = await cachedGet<PokemonListResponse>(
      '/pokemon?limit=1025&offset=0',
    );
    allPokemonNamesCache = response.results.map((p, index) => ({
      name: p.name,
      id: index + 1,
    }));
  }

  const lower = query.toLowerCase().trim();
  if (!lower) return [];

  const idMatch = parseInt(lower.replace('#', ''), 10);

  return allPokemonNamesCache
    .filter(p => {
      if (!isNaN(idMatch)) return p.id === idMatch;
      return p.name.includes(lower);
    })
    .slice(0, 10);
}

export const pokemonApi = {
  getPokemonList,
  getPokemon,
  getPokemonSpecies,
  getEvolutionChain,
  getPokemonType,
  getGeneration,
  getAllGenerations,
  getAllTypes,
  getAbility,
  getMove,
  getPokemonBatch,
  searchPokemonByName,
};
