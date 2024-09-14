const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const SubGolonganKlu = require("../SubGolonganKlu/SubGolonganKluModel.js");
const Cabang = require("../Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const KelompokKegiatanEkonomiKlu = sequelize.define(
  "kelompokkegiatanekonomiklus",
  {
    kodeKelompokKegiatanEkonomiKlu: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
      unique: true,
    },
    namaKelompokKegiatanEkonomiKlu: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    ketKelompokKegiatanEkonomiKlu: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    // Foreign Key Sub Golongan Klu
    subGolonganKluId: {
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

KelompokKegiatanEkonomiKlu.belongsTo(SubGolonganKlu, {
  foreignKey: "subGolonganKluId",
  targetKey: "id",
});

KelompokKegiatanEkonomiKlu.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = KelompokKegiatanEkonomiKlu;

(async () => {
  await sequelize.sync();
})();
