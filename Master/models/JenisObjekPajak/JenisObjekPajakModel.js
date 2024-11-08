const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const ObjekPajak = require("../ObjekPajak/ObjekPajakModel.js");
const Cabang = require("../Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const JenisObjekPajak = sequelize.define(
  "jenisobjekpajaks",
  {
    kodeJenisObjekPajak: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    namaJenisObjekPajak: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },

    // Foreign Key Objek Pajak
    objekPajakId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    bupot2126SkemaPenghitungan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bupot2126PtkpTahunan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bupot2126DasarPengenaanPajak: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    tarifBupot2126: {
      type: DataTypes.STRING, // TER, PKP, Formulasi Penghitungan, Bebas Input
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

JenisObjekPajak.belongsTo(ObjekPajak, {
  foreignKey: "objekPajakId",
  targetKey: "id",
});

JenisObjekPajak.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = JenisObjekPajak;

(async () => {
  await sequelize.sync();
})();
