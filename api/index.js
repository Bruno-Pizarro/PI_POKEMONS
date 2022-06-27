//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Pokemon, Type } = require("./src/db.js");
const controllers = require("./src/controllers/controllers.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await controllers.loadApiTypes();
  const p1 = await Pokemon.create({
    name: "pablo",
    image:
      "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg",
    hp: 1,
    attack: 1,
    defense: 1,
    speed: 1,
    height: 1,
    weight: 1,
  });
  await p1.addTypes(["1", "10"]);
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
