import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, Sword, AlertTriangle } from 'lucide-react';
import { usePokemonType, usePokemonBatch } from '../hooks/usePokemon';
import { PokemonCard } from '../components/PokemonCard';
import { TypeBadge } from '../components/TypeBadge';
import { SkeletonLoader } from '../components/SkeletonLoader';

import { formatName, extractIdFromUrl, TYPE_COLORS } from '../utils/pokemon';
import { useState } from 'react';

export default function TypeDetail() {
  const { typeName } = useParams<{ typeName: string }>();
  const { data: typeData, loading, error } = usePokemonType(typeName || null);

  // Get first 24 Pokémon of this type
  const pokemonIds = typeData?.pokemon
    .slice(0, 24)
    .map(p => extractIdFromUrl(p.pokemon.url)) || [];

  const { data: pokemonList, loading: pokemonLoading } = usePokemonBatch(pokemonIds);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <SkeletonLoader className="h-16 w-48" />
        <SkeletonLoader className="h-64" />
        <SkeletonLoader count={6} className="h-64" />
      </div>
    );
  }

  if (error || !typeData) {
  }

  const typeColor = TYPE_COLORS[typeName || 'normal'];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/types"
          className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <h1
            className="text-4xl font-bold"
            style={{ color: typeColor }}
          >
            {formatName(typeName || '')} Type
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {typeData.pokemon.length} Pokémon • {typeData.moves.length} Moves
          </p>
        </div>
      </div>

      {/* Type Effectiveness */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Offensive */}
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
          <div className="flex items-center gap-2 mb-4">
            <Sword className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold dark:text-white">Offensive</h2>
          </div>

          <div className="space-y-4">
            {typeData.damage_relations.double_damage_to.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
                  Super Effective Against
                </p>
                <div className="flex flex-wrap gap-2">
                  {typeData.damage_relations.double_damage_to.map(t => (
                    <TypeBadge key={t.name} type={t.name} size="sm" />
                  ))}
                </div>
              </div>
            )}

            {typeData.damage_relations.half_damage_to.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
                  Not Very Effective Against
                </p>
                <div className="flex flex-wrap gap-2">
                  {typeData.damage_relations.half_damage_to.map(t => (
                    <TypeBadge key={t.name} type={t.name} size="sm" />
                  ))}
                </div>
              </div>
            )}

            {typeData.damage_relations.no_damage_to.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  No Effect Against
                </p>
                <div className="flex flex-wrap gap-2">
                  {typeData.damage_relations.no_damage_to.map(t => (
                    <TypeBadge key={t.name} type={t.name} size="sm" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Defensive */}
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold dark:text-white">Defensive</h2>
          </div>

          <div className="space-y-4">
            {typeData.damage_relations.double_damage_from.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
                  Weak Against
                </p>
                <div className="flex flex-wrap gap-2">
                  {typeData.damage_relations.double_damage_from.map(t => (
                    <TypeBadge key={t.name} type={t.name} size="sm" />
                  ))}
                </div>
              </div>
            )}

            {typeData.damage_relations.half_damage_from.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
                  Resistant Against
                </p>
                <div className="flex flex-wrap gap-2">
                  {typeData.damage_relations.half_damage_from.map(t => (
                    <TypeBadge key={t.name} type={t.name} size="sm" />
                  ))}
                </div>
              </div>
            )}

            {typeData.damage_relations.no_damage_from.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">
                  Immune To
                </p>
                <div className="flex flex-wrap gap-2">
                  {typeData.damage_relations.no_damage_from.map(t => (
                    <TypeBadge key={t.name} type={t.name} size="sm" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pokémon List */}
      <div>
        <h2 className="text-2xl font-bold dark:text-white mb-6">
          {formatName(typeName || '')} Pokémon
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {pokemonLoading ? (
            <SkeletonLoader count={12} className="h-64" />
          ) : (
            pokemonList?.map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
