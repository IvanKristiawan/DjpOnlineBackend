const { Sequelize } = require("sequelize");
const db = {};
const sequelize = new Sequelize("pajak_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: "false",
  logging: false,
});

// Akun MySql Hosting
// const sequelize = new Sequelize(
//   "mega5536_pajak",
//   "mega5536_ivan",
//   "pajakKu",
//   {
//     host: "127.0.0.1",
//     dialect: "mysql",
//   }
// );

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
