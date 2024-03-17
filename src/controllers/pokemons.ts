import axios from "axios";
import dotenv from "dotenv";
import { Pokemon, PokeTypes } from "../interfaces/Pokemon";
import { pokeDataProperties } from "../helpers/pokeDataProperties";

dotenv.config();
const url = process.env.URL;

export const getAllPokemons = async (): Promise<Array<Pokemon>> => {
  const response = await axios.get(`${url}/?limit=100`);
  const pokeUrls = response.data.results.map((poke: any) => poke.url);
  const pokePromises = pokeUrls.map((url: any) => axios.get(url));
  const pokeAll = await Promise.all(pokePromises);

  const pokemons: Pokemon[] = await Promise.all(
    pokeAll.map(async (pokeResponse) => {
      const { pokeHp, pokeAttack, types, id, name, sprites } =
        pokeDataProperties(pokeResponse);

      return {
        id: id,
        name: name,
        hp: pokeHp,
        attack: pokeAttack,
        image: sprites.front_default,
        type: types as PokeTypes,
      };
    })
  );

  return pokemons;
};

export const getPokemonById = async (
  id: number
): Promise<Pokemon | undefined> => {
  try {
    const pokemons = await getAllPokemons();
    return pokemons.find((poke) => poke.id === id);
  } catch (error) {
    console.error("Incorrect Pokémon ID:", error);
    throw error;
  }
};
