const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const GolonganPokokKlu = require("../GolonganPokokKlu/GolonganPokokKluModel.js");
const Cabang = require("../Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const GolonganKlu = sequelize.define(
  "golonganklus",
  {
    kodeGolonganKlu: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
      unique: true,
    },
    namaGolonganKlu: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    ketGolonganKlu: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    // Foreign Key Golongan Pokok Klu
    golonganPokokKluId: {
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

GolonganKlu.belongsTo(GolonganPokokKlu, {
  foreignKey: "golonganPokokKluId",
  targetKey: "id",
});

GolonganKlu.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = GolonganKlu;

(async () => {
  await sequelize.sync();
})();
