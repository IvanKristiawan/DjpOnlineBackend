const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Cabang = require("../Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const KategoriKlu = sequelize.define(
  "kategoriklus",
  {
    kodeKategoriKlu: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
      unique: true,
    },
    namaKategoriKlu: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    ketKategoriKlu: {
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

KategoriKlu.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = KategoriKlu;

(async () => {
  await sequelize.sync();
})();
