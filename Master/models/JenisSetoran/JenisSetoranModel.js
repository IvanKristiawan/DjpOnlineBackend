const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const JenisPajak = require("../JenisPajak/JenisPajakModel.js");
const Cabang = require("../Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const JenisSetoran = sequelize.define(
  "jenissetorans",
  {
    kodeJenisSetoran: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    namaJenisSetoran: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    ketJenisSetoran: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    // Kondisi
    masaBulan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    masaTahun: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mataUang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wpBadan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wpPemungut: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wpOp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    npwpNol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    npwpLain: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    butuhNop: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    butuhNosk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    getIsAllowed: {
      type: DataTypes.STRING,
      default: null,
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.STRING,
      default: new Date(),
      allowNull: true,
    },
    refWhitelist: {
      type: DataTypes.STRING,
      default: null,
      allowNull: true,
    },
    isAllowed: {
      type: DataTypes.STRING,
      default: null,
      allowNull: true,
    },

    // Foreign Key Kategori Klu
    jenisPajakId: {
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

JenisSetoran.belongsTo(JenisPajak, {
  foreignKey: "jenisPajakId",
  targetKey: "id",
});

JenisSetoran.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = JenisSetoran;

(async () => {
  await sequelize.sync();
})();
