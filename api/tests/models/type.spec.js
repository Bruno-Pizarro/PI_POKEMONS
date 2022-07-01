const { Type, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Type model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Type.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Type.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when the attribute 'name' is filled", (done) => {
        Type.create({
          name: "example",
        })
          .then(() => done())
          .catch(() =>
            done(new Error("The attribute 'name' should not be null"))
          );
      });
    });
    describe("values", () => {
      it("should have columns 'name, image, hp, attack, defense, speed, height, weight'", async () => {
        const t1 = await Type.create({ name: "incredibleType" });
        expect(t1.dataValues).to.deep.equal({
          id: 1,
          name: "incredibleType",
        });
      });
    });
  });
});
