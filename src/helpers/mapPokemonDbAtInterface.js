"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDbPokemonToPokemonType = void 0;
const mapDbPokemonToPokemonType = (dbPokemon) => {
    return {
        id: dbPokemon.id,
        name: dbPokemon.name,
        image: dbPokemon.image,
        type: dbPokemon.type,
        attack: dbPokemon.attack,
        hp: dbPokemon.hp,
    };
};
exports.mapDbPokemonToPokemonType = mapDbPokemonToPokemonType;
