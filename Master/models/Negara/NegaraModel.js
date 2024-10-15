const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Cabang = require("../Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const Negara = sequelize.define(
  "negaras",
  {
    kodeNegara: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
      unique: true,
    },
    namaNegara: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    ketNegara: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    userIdInput: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userIdUpdate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Foreign Key Cabang
    cabangId: {
      type: DataTypes.STRING,
      default: "001",
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Negara.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = Negara;

(async () => {
  await sequelize.sync();
})();
