import { Request, Response } from "express";
import * as pokemons from "../controllers/pokemons";

export const getPokemons = async (_: Request, res: Response) => {
  try {
    const allPokemons = await pokemons.getAllPokemons();
    res.send(allPokemons);
  } catch (error) {
    console.log("Fail Fetch:", error);
    res.status(400).send("Missing pokemon data");
  }
};

export const getPokemonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pokeSelected = await pokemons.getPokemonById(Number(id));
    res.send(pokeSelected);
  } catch (error) {
    console.log("Fail Fetch:", error);
    res.status(404).send("Incorrect Pokemon ID");
  }
};
