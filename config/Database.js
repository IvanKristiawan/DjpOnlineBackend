const { Sequelize } = require("sequelize");
const db = {};
const sequelize = new Sequelize("pajak_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: "false",
  logging: false,
});

// Akun MySql Hosting
// const sequelize = new Sequelize("baka3593_pajak", "baka3593_ivan", "password", {
//   host: "127.0.0.1",
//   dialect: "mysql",
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
