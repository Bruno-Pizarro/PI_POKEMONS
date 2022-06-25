const { Router } = require("express");
const controller = require("../controllers/controllers.js");
const pokemon = Router();
const { Pokemon, Type } = require("../db.js");

pokemon.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const all = await controller.getAllPokemon();
    if (name) {
      var find = all.find((p) => p.name === name);
      if (find) {
        return res.json(find);
      } else {
        return res.json(await controller.getApiPokemonDetail(name));
      }
    }
    res.json(all);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

pokemon.get("/api", async (req, res) => {
  const { id, name } = req.query;
  try {
    if (id) return res.json(await controller.getApiPokemonDetail(id));
    if (name) return res.json(await controller.getApiPokemonDetail(name));
    res.json(await controller.getApiPokemons());
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

pokemon.post("/", async (req, res) => {
  const {
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    type1,
    type2,
  } = req.body;
  const response = await Pokemon.findOne({
    where: {
      name: req.body.name,
    },
  });
  if (response)
    return res.status(409).json({ error: "The Pokemon Already exist" });
  if (
    !name ||
    !hp ||
    !speed ||
    !attack ||
    !defense ||
    !height ||
    !weight ||
    !type1
  )
    res.status(400).json({ error: "All properties must be filled" });
  try {
    const newPokemon = await Pokemon.create(req.body);
    const t1 = await Type.findOne({
      where: {
        name: type1,
      },
    });
    newPokemon.addType(t1);
    if (type2) {
      const t2 = await Type.findOne({
        where: {
          name: type2,
        },
      });
      newPokemon.addType(t2);
    }
    res.json({ success: "Pokemon Created!" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = pokemon;
