"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePokemon = exports.updatePokemon = exports.createPokemon = exports.getPokemonById = exports.getPokemons = void 0;
const pokemons = __importStar(require("../controllers/pokemons"));
const getPokemons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        if (name) {
            let pokemonSearch = yield pokemons.searchPokemonByName(name.toString());
            if (pokemonSearch.error) {
                pokemonSearch = yield pokemons.searchPokemonDbByName(name.toString());
                if (!pokemonSearch) {
                    return res.status(404).json({ message: "Pokemon not found" });
                }
            }
            return res.status(200).json(pokemonSearch);
        }
        const allPokemons = yield pokemons.getAllPokemons();
        res.status(200).json(allPokemons);
    }
    catch (error) {
        console.log("Fail Fetch:", error);
        res.status(400).send("Missing pokemon data");
    }
});
exports.getPokemons = getPokemons;
const getPokemonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const pokeSelected = yield pokemons.searchPokemonById(Number(id));
        res.status(200).json(pokeSelected);
    }
    catch (error) {
        console.log("Fail Fetch ByID:", error);
        res.status(404).send("Incorrect Pokemon ID");
    }
});
exports.getPokemonById = getPokemonById;
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
const createPokemon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, hp, attack, image, type } = req.body;
        const data = { name, hp, attack, image, type };
        const pokemonCreated = yield pokemons.createPokemonInDb(data);
        if (pokemonCreated) {
            res.status(200).json({ message: "Pokemon create" });
        }
        else {
            res.status(500).json({ message: "Falló" });
            throw new Error("Falló");
        }
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createPokemon = createPokemon;
const updatePokemon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, hp, attack, image, type } = req.body;
        const data = { name, hp, attack, image, type };
        const pokemon = yield pokemons.updatePokemonFromDb(Number(id), data);
        if (pokemon)
            res.status(200).json({ message: "Pokemon updated" });
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
});
exports.updatePokemon = updatePokemon;
const deletePokemon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const pokeDelete = yield pokemons.deletePokemonFromDb(Number(id));
        if (pokeDelete) {
            res.status(200).json({ message: "Pokemon deleted" });
        }
    }
    catch (error) {
        console.log("Fail Delete:", error);
        res.status(500).send("Incorrect Pokemon ID");
    }
});
exports.deletePokemon = deletePokemon;
