import { PokeTypes, Pokemon } from "../interfaces/pokemon";

export const mapDbPokemonToPokemonType = (dbPokemon: any): Pokemon => {
  return {
    id: dbPokemon.id,
    name: dbPokemon.name,
    image: dbPokemon.image,
    type: dbPokemon.type as PokeTypes,
    attack: dbPokemon.attack,
    hp: dbPokemon.hp,
  };
};
