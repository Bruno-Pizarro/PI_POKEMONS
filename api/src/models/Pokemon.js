const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        // allowNull: false,
        // validate: {
        //   isImage(value) {
        //     if (/(https?:\/\/.*\.(?:png|jpg|svg))/.test(value)) return value;
        //     throw Error("Must be an image");
        //   },
        // },
      },
      hp: {
        type: DataTypes.INTEGER,
        // validate: {
        //   min: 1,
        //   max: 255,
        // },
      },
      attack: {
        type: DataTypes.INTEGER,
        // validate: {
        //   min: 1,
        //   max: 200,
        // },
      },

      defense: {
        type: DataTypes.INTEGER,
        // validate: {
        //   min: 1,
        //   max: 250,
        // },
      },
      speed: {
        type: DataTypes.INTEGER,
        // validate: {
        //   min: 1,
        //   max: 200,
        // },
      },
      height: {
        type: DataTypes.FLOAT,
      },
      weight: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: false,
    }
  );
};
