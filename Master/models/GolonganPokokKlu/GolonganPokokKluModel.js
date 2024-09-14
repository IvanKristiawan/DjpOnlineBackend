const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const KategoriKlu = require("../KategoriKlu/KategoriKluModel.js");
const Cabang = require("../Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const GolonganPokokKlu = sequelize.define(
  "golonganpokokklus",
  {
    kodeGolonganPokokKlu: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
      unique: true,
    },
    namaGolonganPokokKlu: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    ketGolonganPokokKlu: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    // Foreign Key Kategori Klu
    kategoriKluId: {
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

GolonganPokokKlu.belongsTo(KategoriKlu, {
  foreignKey: "kategoriKluId",
  targetKey: "id",
});

GolonganPokokKlu.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = GolonganPokokKlu;

(async () => {
  await sequelize.sync();
})();
