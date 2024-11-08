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

    // EBupot Unifikasi
    isBupotUnifikasi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    untukBupotUnifikasi: {
      type: DataTypes.STRING, // PPh 42152223, PPh Non Residen, PPh DOSS
      default: "",
      allowNull: true,
    },
    bupotUnifikasiDopp: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

    // EBupot 2126
    isBupot2126: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    untukBupot2126: {
      type: DataTypes.STRING, // PPh 21, PPh 26
      default: "",
      allowNull: true,
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
    bupot2126JenisObjekPajak: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bupot2126DasarPengenaanPajak: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bupot2126DasarPengenaanPajakBebasInput: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bupot2126DasarPengenaanPajakAkumulasiPenghasilanBruto: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bupot2126FormulasiPenghitungan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bupot2126FasilitasDtpIkn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    tarifBupot2126: {
      type: DataTypes.STRING, // TER, PKP, Formulasi Penghitungan, Bebas Input, Ditentukan Jenis Objek Pajak
      default: "",
      allowNull: true,
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
