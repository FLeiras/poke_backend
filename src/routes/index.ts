import express from "express";
import * as pokemons from "./pokemons";

const router = express.Router();

router.get("/", pokemons.getPokemons);

router.get("/:id", pokemons.getPokemonById);

router.post("/postPokemon", () => undefined);

router.put("/deletePokemon/:id", () => undefined);

export default router;