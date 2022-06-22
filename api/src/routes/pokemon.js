const { Router } = require("express");
const controller = require("../controllers/controllers.js");
const pokemon = Router();
const { Pokemon } = require("../db.js");

pokemon.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const all = await controller.getAllPokemon();
    if (name) {
      var find = all.find((p) => p.name === name);
      if (find) {
        return res.send(find);
      } else {
        return res.send(await controller.getApiPokemonDetail(name));
      }
    }

    res.send(all);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

pokemon.get("/api", async (req, res) => {
  const { id, name } = req.query;
  try {
    if (id) return res.send(await controller.getApiPokemonDetail(id));
    if (name) return res.send(await controller.getApiPokemonDetail(name));
    res.send(await controller.getApiPokemons());
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

pokemon.get("/db", async (req, res) => {
  const { id } = req.query;
  const { atribute, filter } = req.body;
  try {
    if (id) return res.send((await Pokemon.findByPk(id)).toJSON());
    if (atribute) {
      const filtered = await controller.getDBPokemonDetail(atribute, filter);
      return res.send(filtered.map((p) => p.toJSON()));
    }
    res.send(await controller.getDBPokemons());
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = pokemon;
