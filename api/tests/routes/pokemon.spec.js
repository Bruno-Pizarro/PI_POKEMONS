/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
  hp: 1,
  attack: 1,
  defense: 1,
  speed: 1,
  height: 1,
  weight: 1,
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("GET /pokemons", () => {
    it("should get 200.", () => agent.get("/pokemons").expect(200));
    it("should get only 'id, name, attack, image and types'.", () =>
      agent
        .get("/pokemons")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body[0]).to.deep.equal({
            id: "a1",
            name: "bulbasaur",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
            attack: 49,
            types: ["grass", "poison"],
          });
        }));
    it("should get at least 40 pokemon in an array", () =>
      agent
        .get("/pokemons")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body.length).to.be.at.least(40);
        }));
    it("should get pokemon by query (name).", () =>
      agent
        .get("/pokemons?name=pikachu")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.deep.equal({
            id: "a25",
            name: "pikachu",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
            attack: 55,
            types: ["electric"],
          });
        }));
    it("should throw 404 error if query 'name' doesnt exist.", () =>
      agent
        .get("/pokemons?name=UnkownNamedPokemon")
        .expect(404)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.deep.equal({
            error: "Request failed with status code 404",
          });
        }));
    it("should get pokemon by params (id differentiating between database and external API).", () =>
      agent
        .get("/pokemons/a20")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.deep.equal({
            id: "a20",
            name: "raticate",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/20.svg",
            weight: 185,
            height: 7,
            hp: 55,
            attack: 81,
            specialAttack: 50,
            defense: 60,
            specialDefense: 70,
            speed: 97,
            types: [
              {
                id: 1,
                name: "normal",
              },
            ],
          });
        }));
  });
  describe("POST /pokemons", () => {
    it("should response with success message.", () =>
      agent
        .post("/pokemons")
        .send({
          name: "chikachu",
          hp: 1,
          speed: 1,
          attack: 1,
          defense: 1,
          height: 1,
          weight: 1,
          type1: "newType",
        })
        .expect(201)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.deep.equal({ success: "Pokemon Created!" });
        }));
    it("should create a new pokemon.", async () => {
      const pokemon = {
        name: "chikachu",
        image: "http://example.png",
        hp: 1,
        speed: 1,
        attack: 1,
        defense: 1,
        height: 1,
        weight: 1,
        type1: "newType",
      };
      await agent
        .post("/pokemons")
        .send(pokemon)
        .expect(201)
        .expect("Content-Type", /json/);
      const created = (
        await Pokemon.findOne({
          where: {
            name: "chikachu",
          },
        })
      ).toJSON();
      return expect(created).to.deep.equal({
        id: 2,
        name: "chikachu",
        image: "http://example.png",
        hp: 1,
        speed: 1,
        attack: 1,
        defense: 1,
        height: 1,
        weight: 1,
      });
    });
    it("should response with 400 bad request when properties are missing.", () => {
      return agent
        .post("/pokemons")
        .send({
          noproperties: "here",
        })
        .expect(400)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.deep.equal({
            error: "All properties must be filled",
          });
        });
    });
    it("should response with 409 when pokemon already exist.", () => {
      return agent
        .post("/pokemons")
        .send({
          name: "Pikachu",
          hp: 1,
          attack: 1,
          defense: 1,
          speed: 1,
          height: 1,
          weight: 1,
          type1: "newType",
        })
        .expect(409)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.deep.equal({
            error: "The pokemon named Pikachu already exist.",
          });
        });
    });
  });
});
