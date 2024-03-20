"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePokemonFromDb = exports.updatePokemonFromDb = exports.createPokemonInDb = exports.searchPokemonDbByName = exports.searchPokemonByName = exports.searchPokemonById = exports.getAllPokemons = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
const Pokemons_1 = require("../db/models/Pokemons");
const pokeDataProperties_1 = require("../helpers/pokeDataProperties");
dotenv_1.default.config();
const url = process.env.URL;
const getPokemonsApi = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${url}/?limit=100`);
    const pokeUrls = response.data.results.map((poke) => poke.url);
    const pokePromises = pokeUrls.map((url) => axios_1.default.get(url));
    const pokeAll = yield Promise.all(pokePromises);
    const pokemons = yield Promise.all(pokeAll.map((pokeResponse) => __awaiter(void 0, void 0, void 0, function* () {
        const { pokeHp, pokeAttack, types, name, sprites } = (0, pokeDataProperties_1.pokeDataProperties)(pokeResponse);
        return {
            name: name,
            hp: pokeHp,
            attack: pokeAttack,
            image: sprites.front_default,
            type: types,
        };
    })));
    return pokemons;
});
const getPokemonFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pokemons = yield Pokemons_1.Pokemons.findAll();
        return pokemons;
    }
    catch (error) {
        console.error("Fail fetch:", error);
        throw error;
    }
});
const getAllPokemons = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pokemonsFromApi = yield getPokemonsApi();
        const pokemonsFromDb = yield getPokemonFromDb();
        for (const pokemon of pokemonsFromApi) {
            const existingPokemon = pokemonsFromDb.find((p) => p.name === pokemon.name);
            if (existingPokemon) {
                existingPokemon.hp = pokemon.hp;
                existingPokemon.attack = pokemon.attack;
                existingPokemon.image = pokemon.image;
                existingPokemon.type = pokemon.type;
                yield existingPokemon.save();
            }
            else {
                yield Pokemons_1.Pokemons.create(pokemon);
            }
        }
        console.log("Pokemons actualizados en la base de datos");
        const allPokemons = yield Pokemons_1.Pokemons.findAll();
        return allPokemons;
    }
    catch (error) {
        console.error("Error al actualizar los pokemons:", error);
        throw error;
    }
});
exports.getAllPokemons = getAllPokemons;
const searchPokemonById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pokemons = yield Pokemons_1.Pokemons.findByPk(id);
        return pokemons;
    }
    catch (error) {
        console.error("Incorrect Pokémon ID:", error);
        throw error;
    }
});
exports.searchPokemonById = searchPokemonById;
const searchPokemonByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchPokemonsApi = yield axios_1.default.get(`${url}/?name=${name}`);
        if (searchPokemonsApi) {
            let p = searchPokemonsApi;
            return {
                id: p.data.id,
                name: p.data.name,
                image: p.data.sprites.front_default,
                hp: p.data.stats[0].base_stat,
                attack: p.data.stats[1].base_stat,
                types: p.data.types.map((t) => {
                    return { name: t.type.name };
                }),
            };
        }
        else {
            return null;
        }
    }
    catch (error) {
        return { error: "Not found" };
    }
});
exports.searchPokemonByName = searchPokemonByName;
const searchPokemonDbByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchPokemon = yield Pokemons_1.Pokemons.findOne({
            where: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("lower", sequelize_1.Sequelize.col("pokemons.name")), sequelize_1.Sequelize.fn("lower", name)),
        });
        return searchPokemon;
    }
    catch (error) {
        return error;
    }
});
exports.searchPokemonDbByName = searchPokemonDbByName;
const createPokemonInDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const created = yield Pokemons_1.Pokemons.create(data);
        if (created)
            return true;
    }
    catch (error) {
        console.log("ACA CATCH", error);
    }
});
exports.createPokemonInDb = createPokemonInDb;
const updatePokemonFromDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pokemon = yield Pokemons_1.Pokemons.findByPk(id);
        if (pokemon !== null) {
            pokemon.name = data.name;
            pokemon.hp = data.hp;
            pokemon.attack = data.attack;
            pokemon.image = data.image;
            pokemon.type = data.type;
            yield pokemon.save();
        }
        return true;
    }
    catch (error) {
        console.log(error);
    }
});
exports.updatePokemonFromDb = updatePokemonFromDb;
const deletePokemonFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Pokemons_1.Pokemons.destroy({
            where: {
                id,
            },
        });
        return true;
    }
    catch (error) {
        console.error("Not delete Pokemon");
        return false;
    }
});
exports.deletePokemonFromDb = deletePokemonFromDb;
