const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when the attribute 'name' is filled", (done) => {
        Pokemon.create({
          name: "example",
        })
          .then(() => done())
          .catch(() =>
            done(new Error("The attribute 'name' should not be null"))
          );
      });
    });
    describe("image", () => {
      it("should set default image when the attribute 'image' is null", (done) => {
        Pokemon.create({
          name: "example",
        }).then((p) => {
          if (/(https?:\/\/.*\.(?:png|jpg|svg))/.test(p.toJSON().image)) done();
        });
      });
    });
    describe("values", () => {
      it("should have columns 'name, image, hp, attack, defense, speed, height, weight'", async () => {
        const p1 = await Pokemon.create({ name: "pikapika" });
        expect(p1.dataValues).to.deep.equal({
          id: 1,
          name: "pikapika",
          image:
            "https://i0.wp.com/lacomikeria.com/wp-content/uploads/2020/02/thumb-1920-677583.png",
          hp: null,
          attack: null,
          defense: null,
          speed: null,
          height: null,
          weight: null,
        });
      });
    });
  });
});
