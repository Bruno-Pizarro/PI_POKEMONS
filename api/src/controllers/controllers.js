const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

module.exports = {
  getApiPokemons: async function () {
    var obj = {};
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=200`
    );
    const data = response.data.results.map(async (p, i) => {
      ++i;
      var pokemon = (await axios.get(p.url)).data;
      obj = {
        id: `a${i}`,
        name: p.name,
        image: pokemon.sprites.other.dream_world.front_default,
        attack: pokemon.stats[1].base_stat,
      };
      return obj;
    });
    var allPokemons = await Promise.all(data);
    return allPokemons;
  },
  getApiPokemonDetail: async function (idApi) {
    const response = (
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${idApi}`)
    ).data;
    if (!response) throw new Error(`Pokemon id ${idApi} doesn't exist.`);
    return {
      id: `a${response.id}`,
      name: response.name,
      image: response.sprites.other.dream_world.front_default,
      weight: response.weight,
      height: response.height,
      hp: response.stats[0].base_stat,
      attack: response.stats[1].base_stat,
      specialAttack: response.stats[3].base_stat,
      defense: response.stats[2].base_stat,
      specialDefense: response.stats[4].base_stat,
      speed: response.stats[5].base_stat,
      types: response.types,
    };
  },
  getApiTypes: async function () {
    var obj = {};
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    const data = response.data.results.map(async (t, i) => {
      obj = {
        id: `a${++i}`,
        name: t.name,
      };
      return obj;
    });
    var allTypes = await Promise.all(data);
    return allTypes;
  },
  getDBTypes: async function () {
    const types = await Type.findAll();
    const jsonTypes = types.map((t) => t.toJSON());
    return jsonTypes.map((t) => {
      return {
        id: `d${t.id}`,
        name: t.name,
      };
    });
  },
  getAllTypes: async function () {
    const api = await this.getApiTypes();
    const db = await this.getDBTypes();
    return [...api, ...db];
  },
  getApiTypeName: async function (name) {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${name}`);
    return response.data.results;
  },
  getDBPokemons: async function () {
    const pokemons = await Pokemon.findAll({
      include: Type,
    });
    const jsonPokemon = pokemons.map((p) => p.toJSON());
    return jsonPokemon.map((p) => {
      return {
        id: `d${p.id}`,
        name: p.name,
        image: p.image,
        attack: p.attack,
      };
    });
  },
  getDBPokemonDetail: async function (atribute, filter) {
    const pokemons = await Pokemon.findAll({ where: { [atribute]: filter } });
    const jsonPokemon = pokemons.map((p) => p.toJSON());
    return jsonPokemon.map((p) => {
      return {
        id: `d${p.id}`,
        name: p.name,
        image: p.image,
        weight: p.weight,
        height: p.height,
        hp: p.hp,
        attack: p.attack,
        defense: p.defense,
        speed: p.speed,
      };
    });
  },
  getAllPokemon: async function () {
    const api = await this.getApiPokemons();
    const db = await this.getDBPokemons();
    return [...api, ...db];
  },
};
