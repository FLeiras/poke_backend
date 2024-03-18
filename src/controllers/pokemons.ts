import axios from "axios";
import dotenv from "dotenv";

import { Pokemons } from "../db/models/Pokemons";
import { PokeTypes } from "../interfaces/Pokemon";
import { pokeDataProperties } from "../helpers/pokeDataProperties";

dotenv.config();
const url = process.env.URL;

export const savePokemonsInDb = async () => {
  const response = await axios.get(`${url}/?limit=100`);
  const pokeUrls = response.data.results.map((poke: any) => poke.url);
  const pokePromises = pokeUrls.map((url: any) => axios.get(url));
  const pokeAll = await Promise.all(pokePromises);

  const pokemons = await Promise.all(
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

  try {
    await Pokemons.bulkCreate(pokemons);
    console.log("Pokemons guardados en la base de datos");
  } catch (error) {
    console.error("Error al guardar los pokemons:", error);
  }
};

export const getAllPokemons = async () => {
  await savePokemonsInDb();
  const pokemons = await Pokemons.findAll();

  return pokemons;
};

export const getPokemonById = async (id: number) => {
  try {
    const pokemons = await Pokemons.findByPk(id);
    return pokemons;
  } catch (error) {
    console.error("Incorrect Pokémon ID:", error);
    throw error;
  }
};
