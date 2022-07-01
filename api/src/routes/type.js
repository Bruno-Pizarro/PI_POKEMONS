const { Router } = require("express");
const controller = require("../controllers/controllers.js");
const type = Router();

type.get("/", async (req, res) => {
  res.send(await controller.getDBTypes());
});

module.exports = type;
