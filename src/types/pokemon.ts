export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  other: {
    'official-artwork': {
      front_default: string | null;
      front_shiny: string | null;
    };
    dream_world: {
      front_default: string | null;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  moves: PokemonMove[];
  sprites: PokemonSprites;
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonSpeciesFlavorText {
  flavor_text: string;
  language: {
    name: string;
  };
  version: {
    name: string;
  };
}

export interface PokemonSpeciesGenus {
  genus: string;
  language: {
    name: string;
  };
}

export interface PokemonSpecies {
  id: number;
  name: string;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  growth_rate: {
    name: string;
    url: string;
  };
  egg_groups: {
    name: string;
    url: string;
  }[];
  habitat: {
    name: string;
    url: string;
  } | null;
  generation: {
    name: string;
    url: string;
  };
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: PokemonSpeciesFlavorText[];
  genera: PokemonSpeciesGenus[];
}

export interface EvolutionDetail {
  min_level: number | null;
  trigger: {
    name: string;
  };
  item: {
    name: string;
  } | null;
}

export interface EvolutionChainLink {
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainLink[];
  is_baby: boolean;
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionChainLink;
}

export interface TypeRelations {
  double_damage_from: PokemonListItem[];
  double_damage_to: PokemonListItem[];
  half_damage_from: PokemonListItem[];
  half_damage_to: PokemonListItem[];
  no_damage_from: PokemonListItem[];
  no_damage_to: PokemonListItem[];
}

export interface PokemonTypeDetail {
  id: number;
  name: string;
  damage_relations: TypeRelations;
  pokemon: {
    pokemon: PokemonListItem;
    slot: number;
  }[];
  moves: PokemonListItem[];
}

export interface Generation {
  id: number;
  name: string;
  main_region: {
    name: string;
    url: string;
  };
  pokemon_species: PokemonListItem[];
}

export interface AbilityDetail {
  id: number;
  name: string;
  effect_entries: {
    effect: string;
    short_effect: string;
    language: {
      name: string;
    };
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}

export interface MoveDetail {
  id: number;
  name: string;
  power: number | null;
  pp: number | null;
  accuracy: number | null;
  type: {
    name: string;
  };
  damage_class: {
    name: string;
  };
  effect_entries: {
    effect: string;
    short_effect: string;
    language: {
      name: string;
    };
  }[];
}
