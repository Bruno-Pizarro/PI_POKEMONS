const { Router } = require("express");
const controller = require("../controllers/controllers.js");
const pokemon = Router();
const { Pokemon, Type } = require("../db.js");

pokemon.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const all = await controller.getAllPokemon();
    if (name) {
      var find = all.find((p) => p.name === name.toLowerCase());
      if (find) {
        return res.json(find);
      } else {
        try {
          return res
            .status(200)
            .json(await controller.getApiPokemonDetail(name.toLowerCase()));
        } catch (error) {
          return res.status(404).json({ error: error.message });
        }
      }
    }

    res.json(all);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

pokemon.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id[0] === "a")
      return res.json(await controller.getApiPokemonDetail(id.substring(1)));
    if (id[0] === "d")
      return res.json(
        await Pokemon.findByPk(parseInt(id.substring(1)), {
          include: Type,
        })
      );
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

pokemon.post("/", async (req, res) => {
  const { name, hp, attack, defense, speed, height, weight, type1, type2 } =
    req.body;

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
    return res.status(400).json({ error: "All properties must be filled" });
  const pokemons = await controller.getAllPokemon();
  const response = pokemons.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );
  if (response)
    return res
      .status(409)
      .send({ error: `The pokemon named ${name} already exist.` });
  try {
    const newPokemon = await Pokemon.create({
      ...req.body,
      name: name.toLowerCase(),
    });
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
    res.status(201).json({ success: "Pokemon Created!" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = pokemon;
