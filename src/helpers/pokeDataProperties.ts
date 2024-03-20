import { PokeTypes, Pokemon } from "../interfaces/pokemon";

export const pokeDataProperties = (pokeData: any) => {
  const { name, sprites, stats } = pokeData.data;

  const types: PokeTypes = pokeData.data.types.map((t: any) => t.type.name);

  const pokeAttack = stats
    .map((s: string) => s)
    .filter((s: any) => s.stat.name === "attack")
    .map((stat: any) => stat.base_stat)[0];

  const pokeHp = stats
    .map((s: string) => s)
    .filter((s: any) => s.stat.name === "hp")
    .map((stat: any) => stat.base_stat)[0];

  return {
    types,
    pokeAttack,
    pokeHp,
    name,
    sprites,
  };
};
