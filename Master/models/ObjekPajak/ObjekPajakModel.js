const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const JenisSetoran = require("../JenisSetoran/JenisSetoranModel.js");
const Cabang = require("../Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const ObjekPajak = sequelize.define(
  "objekpajaks",
  {
    kodeObjekPajak: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
      unique: true,
    },
    namaObjekPajak: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    ketObjekPajak: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    tarifPersen: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    kodeBupot: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pilihanPerkiraanPenghasilanNetto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    perkiraanPenghasilanNetto: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    // Foreign Key Jenis Setoran
    jenisSetoranId: {
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

ObjekPajak.belongsTo(JenisSetoran, {
  foreignKey: "jenisSetoranId",
  targetKey: "id",
});

ObjekPajak.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = ObjekPajak;

(async () => {
  await sequelize.sync();
})();
