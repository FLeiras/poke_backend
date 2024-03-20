import axios from "axios";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import { Pokemons } from "../db/models/Pokemons";
import { PokeTypes, pokemonNotId } from "../interfaces/pokemon";
import { pokeDataProperties } from "../helpers/pokeDataProperties";

dotenv.config();
const url = process.env.URL;

const getPokemonsApi = async () => {
  const response = await axios.get(`${url}/?limit=100`);
  const pokeUrls = response.data.results.map((poke: any) => poke.url);
  const pokePromises = pokeUrls.map((url: any) => axios.get(url));
  const pokeAll = await Promise.all(pokePromises);

  const pokemons = await Promise.all(
    pokeAll.map(async (pokeResponse) => {
      const { pokeHp, pokeAttack, types, name, sprites } =
        pokeDataProperties(pokeResponse);

      return {
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

const getPokemonFromDb = async () => {
  try {
    const pokemons = await Pokemons.findAll();

    return pokemons;
  } catch (error) {
    console.error("Fail fetch:", error);
    throw error;
  }
};

export const getAllPokemons = async () => {
  try {
    const pokemonsFromApi = await getPokemonsApi();
    const pokemonsFromDb = await getPokemonFromDb();

    for (const pokemon of pokemonsFromApi) {
      const existingPokemon = pokemonsFromDb.find(
        (p) => p.name === pokemon.name
      );
      if (existingPokemon) {
        existingPokemon.hp = pokemon.hp;
        existingPokemon.attack = pokemon.attack;
        existingPokemon.image = pokemon.image;
        existingPokemon.type = pokemon.type;
        await existingPokemon.save();
      } else {
        await Pokemons.create(pokemon);
      }
    }

    console.log("Pokemons actualizados en la base de datos");

    const allPokemons = await Pokemons.findAll();
    return allPokemons;
  } catch (error) {
    console.error("Error al actualizar los pokemons:", error);
    throw error;
  }
};

export const searchPokemonById = async (id: number) => {
  try {
    const pokemons = await Pokemons.findByPk(id);
    return pokemons;
  } catch (error) {
    console.error("Incorrect Pokémon ID:", error);
    throw error;
  }
};

export const searchPokemonByName = async (name: string) => {
  try {
    const searchPokemonsApi = await axios.get(`${url}/?name=${name}`);

    if (searchPokemonsApi) {
      let p = searchPokemonsApi;
      return {
        id: p.data.id,
        name: p.data.name,
        image: p.data.sprites.front_default,
        hp: p.data.stats[0].base_stat,
        attack: p.data.stats[1].base_stat,
        types: p.data.types.map((t: any) => {
          return { name: t.type.name };
        }),
      };
    } else {
      return null;
    }
  } catch (error) {
    return { error: "Not found" };
  }
};

export const searchPokemonDbByName = async (name: string) => {
  try {
    const searchPokemon = await Pokemons.findOne({
      where: Sequelize.where(
        Sequelize.fn("lower", Sequelize.col("pokemons.name")),
        Sequelize.fn("lower", name)
      ),
    });

    return searchPokemon;
  } catch (error) {
    return error;
  }
};

export const createPokemonInDb = async (data: pokemonNotId) => {
  try {
    const created = await Pokemons.create(data);

    if (created) return true;
  } catch (error) {
    console.log("ACA CATCH", error);
  }
};

export const updatePokemonFromDb = async (id: number, data: pokemonNotId) => {
  try {
    const pokemon = await Pokemons.findByPk(id);
    if (pokemon !== null) {
      pokemon.name = data.name;
      pokemon.hp = data.hp;
      pokemon.attack = data.attack;
      pokemon.image = data.image;
      pokemon.type = data.type;
      await pokemon.save();
    }

    return true;
  } catch (error) {
    console.log(error);
  }
};

export const deletePokemonFromDb = async (id: number) => {
  try {
    await Pokemons.destroy({
      where: {
        id,
      },
    });

    return true;
  } catch (error) {
    console.error("Not delete Pokemon");
    return false;
  }
};
