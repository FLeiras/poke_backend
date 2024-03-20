import { Request, Response } from "express";
import * as pokemons from "../controllers/pokemons";

export const getPokemons = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    if (name) {
      let pokemonSearch: any = await pokemons.searchPokemonByName(
        name.toString()
      );

      if (pokemonSearch!.error) {
        pokemonSearch = await pokemons.searchPokemonDbByName(name.toString());

        if (!pokemonSearch) {
          return res.status(404).json({ message: "Pokemon not found" });
        }
      }
      return res.status(200).json(pokemonSearch);
    }

    const allPokemons = await pokemons.getAllPokemons();
    res.status(200).json(allPokemons);
  } catch (error) {
    console.log("Fail Fetch:", error);
    res.status(400).send("Missing pokemon data");
  }
};

export const getPokemonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pokeSelected = await pokemons.searchPokemonById(Number(id));
    res.status(200).json(pokeSelected);
  } catch (error) {
    console.log("Fail Fetch ByID:", error);
    res.status(404).send("Incorrect Pokemon ID");
  }
};

// export const getPokemonByName = async (req: Request, res: Response) => {
//   try {
//     const { name } = req.params;
//     const pokeSelected = await pokemons.searchPokemonByName(name);
//     res.status(200).json(pokeSelected);
//   } catch (error) {
//     console.log("Fail Fetch ByID:", error);
//     res.status(404).send("Pokémon does not exist");
//   }
// };

export const createPokemon = async (req: Request, res: Response) => {
  try {
    const { name, hp, attack, image, type } = req.body;
    const data = { name, hp, attack, image, type };

    const pokemonCreated = await pokemons.createPokemonInDb(data);

    if (pokemonCreated) {
      res.status(200).json({ message: "Pokemon create" });
    } else {
      res.status(500).json({ message: "Falló" });
      throw new Error("Falló");
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updatePokemon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, hp, attack, image, type } = req.body;
    const data = { name, hp, attack, image, type };
    const pokemon = await pokemons.updatePokemonFromDb(Number(id), data);

    if (pokemon) res.status(200).json({ message: "Pokemon updated" });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export const deletePokemon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pokeDelete = await pokemons.deletePokemonFromDb(Number(id));

    if (pokeDelete) {
      res.status(200).json({ message: "Pokemon deleted" });
    }
  } catch (error) {
    console.log("Fail Delete:", error);
    res.status(500).send("Incorrect Pokemon ID");
  }
};
