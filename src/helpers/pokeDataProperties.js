"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokeDataProperties = void 0;
const pokeDataProperties = (pokeData) => {
    const { name, sprites, stats } = pokeData.data;
    const types = pokeData.data.types.map((t) => t.type.name);
    const pokeAttack = stats
        .map((s) => s)
        .filter((s) => s.stat.name === "attack")
        .map((stat) => stat.base_stat)[0];
    const pokeHp = stats
        .map((s) => s)
        .filter((s) => s.stat.name === "hp")
        .map((stat) => stat.base_stat)[0];
    return {
        types,
        pokeAttack,
        pokeHp,
        name,
        sprites,
    };
};
exports.pokeDataProperties = pokeDataProperties;
