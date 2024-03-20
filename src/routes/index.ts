import express from "express";
import * as pokemons from "./pokemons";

const router = express.Router();

router.get("/pokemons", pokemons.getPokemons);

// router.get("/pokemons/:name", pokemons.getPokemons);

router.get("/pokemon/:id", pokemons.getPokemonById);

router.post("/postPokemon", pokemons.createPokemon);

router.put("/updatePokemon/:id", pokemons.updatePokemon);

router.delete("/deletePokemon/:id", pokemons.deletePokemon);

export default router;
