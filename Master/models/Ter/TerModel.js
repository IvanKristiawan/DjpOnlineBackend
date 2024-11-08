const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Ptkp = require("../Ptkp/PtkpModel.js");
const Cabang = require("../Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const Ter = sequelize.define(
  "ters",
  {
    kodeTer: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
      unique: true,
    },
    jumlahPenghasilanMin: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    jumlahPenghasilanMax: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    tarifPersen: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    kategori: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },

    // Foreign Key Ptkp
    ptkpId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

Ter.belongsTo(Ptkp, {
  foreignKey: "ptkpId",
  targetKey: "id",
});

Ter.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = Ter;

(async () => {
  await sequelize.sync();
})();
