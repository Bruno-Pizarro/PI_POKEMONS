const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "pokemon_type",
    {},
    {
      timestamps: false,
    }
  );
};
