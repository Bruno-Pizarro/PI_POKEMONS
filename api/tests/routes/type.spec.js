const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const controllers = require("../../src/controllers/controllers.js");
const { Type, conn } = require("../../src/db.js");

const agent = session(app);

describe("Type routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Type.sync({ force: true }).then(
      async () => await controllers.loadApiTypes()
    )
  );
  describe("GET /types", () => {
    it("should get 200.", () => agent.get("/types").expect(200));
    it("should get types.", () =>
      agent
        .get("/types")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body[0]).to.deep.equal({
            id: 1,
            name: "normal",
          });
        }));
    it("should get at least 18 types in an array", () =>
      agent
        .get("/types")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body.length).to.be.at.least(18);
        }));
  });
});
