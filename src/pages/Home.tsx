import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shuffle, Shield, Zap, Flame, Award } from 'lucide-react';
import { getPokemonBatch, getPokemon } from '../services/pokemonApi';
import { PokemonCard } from '../components/PokemonCard';
import { PokemonCardSkeleton } from '../components/SkeletonLoader';
import { ALL_TYPES, TYPE_COLORS, formatName, randomInt, getArtworkUrl } from '../utils/pokemon';
import type { Pokemon } from '../types/pokemon';

export default function Home() {
  const [featuredPokemon, setFeaturedPokemon] = useState<Pokemon[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  // Random Pokemon state
  const [randomPoke, setRandomPoke] = useState<Pokemon | null>(null);
  const [loadingRandom, setLoadingRandom] = useState(false);

  useEffect(() => {
    async function loadFeatured() {
      try {
        // Fetch classic iconic starter/legendary pokemon
        const ids = [1, 4, 7, 25, 150, 133, 94, 384];
        const data = await getPokemonBatch(ids);
        setFeaturedPokemon(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingFeatured(false);
      }
    }

    loadFeatured();
    fetchRandom();
  }, []);

  const fetchRandom = async () => {
    setLoadingRandom(true);
    try {
      const randomId = randomInt(1, 1025);
      const data = await getPokemon(randomId);
      setRandomPoke(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRandom(false);
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-24 border-b border-gray-100 dark:border-gray-800/60">
        <div className="absolute inset-0 bg-radial from-red-500/10 via-transparent to-transparent opacity-50 dark:opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-sm font-semibold tracking-wide border border-red-200 dark:border-red-900/50">
                <Sparkles size={16} />
                The Ultimate Pokémon Encyclopedia
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.15]">
                Explore the World of{' '}
                <span className="bg-gradient-to-r from-red-500 via-amber-500 to-blue-500 bg-clip-text text-transparent">
                  Pokémon
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                Discover Pokémon, their stats, abilities, evolutions, moves, and more. A modern, lightning-fast platform designed for trainers.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/pokedex"
                  className="flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all hover:scale-105 active:scale-95"
                >
                  Explore Pokédex
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/types"
                  className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-700 font-bold rounded-xl border border-gray-200 dark:border-gray-700 transition-all hover:scale-105 active:scale-95"
                >
                  Discover Types
                </Link>
              </div>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
                  alt="Charizard"
                  className="w-full h-full object-contain relative z-10 animate-float drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-gray-700 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-red-100 dark:bg-red-950/40 text-red-500 rounded-xl flex items-center justify-center">
              <Flame size={24} />
            </div>
            <div className="text-3xl font-black text-gray-900 dark:text-white">1025+</div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Total Pokémon</div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-gray-700 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 dark:bg-blue-950/40 text-blue-500 rounded-xl flex items-center justify-center">
              <Award size={24} />
            </div>
            <div className="text-3xl font-black text-gray-900 dark:text-white">9</div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Generations</div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-gray-700 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-amber-100 dark:bg-amber-950/40 text-amber-500 rounded-xl flex items-center justify-center">
              <Zap size={24} />
            </div>
            <div className="text-3xl font-black text-gray-900 dark:text-white">18</div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Elemental Types</div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-gray-700 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 dark:bg-purple-950/40 text-purple-500 rounded-xl flex items-center justify-center">
              <Shield size={24} />
            </div>
            <div className="text-3xl font-black text-gray-900 dark:text-white">80+</div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Legendaries</div>
          </div>
        </div>
      </section>

      {/* 3. Featured Pokémon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Featured Pokémon
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Iconic and popular creatures from across the regions.
            </p>
          </div>
          <Link
            to="/pokedex"
            className="text-red-500 hover:text-red-600 font-semibold text-sm flex items-center gap-1 group"
          >
            View all
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loadingFeatured ? (
          <PokemonCardSkeleton count={8} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredPokemon.map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Explore by Type */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Explore by Type
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Browse through Pokémon categorized by their elemental powers.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {ALL_TYPES.map(type => {
            const color = TYPE_COLORS[type];
            return (
              <Link
                key={type}
                to={`/pokedex?type=${type}`}
                className="group relative overflow-hidden rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-gray-100 dark:border-gray-800 transition-all hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: `${color}15`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md font-bold text-sm"
                  style={{ backgroundColor: color }}
                >
                  {type.slice(0, 2).toUpperCase()}
                </div>
                <span className="font-semibold text-sm text-gray-900 dark:text-white capitalize">
                  {formatName(type)}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Random Pokémon Discovery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-red-500/10 via-amber-500/10 to-blue-500/10 border border-gray-200 dark:border-gray-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              Discover a Random Pokémon
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Not sure who to search for? Click below and find a surprise companion to examine in detail!
            </p>
            <button
              onClick={fetchRandom}
              disabled={loadingRandom}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              <Shuffle size={18} className={loadingRandom ? 'animate-spin' : ''} />
              {loadingRandom ? 'Finding...' : 'Roll Random'}
            </button>
          </div>

          {randomPoke && (
            <div className="mt-8 sm:mt-0 sm:absolute sm:right-12 sm:top-1/2 sm:-translate-y-1/2 flex items-center justify-center">
              <Link
                to={`/pokemon/${randomPoke.name}`}
                className="group flex flex-col items-center p-4 bg-white/80 dark:bg-dark-800/80 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700 shadow-xl hover:scale-105 transition-all"
              >
                <img
                  src={getArtworkUrl(randomPoke.id)}
                  alt={randomPoke.name}
                  className="w-32 h-32 object-contain group-hover:scale-110 transition-transform"
                />
                <span className="font-bold text-gray-900 dark:text-white mt-2">
                  {formatName(randomPoke.name)}
                </span>
                <span className="text-xs text-red-500 font-semibold">
                  View Profile &rarr;
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
