const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const GolonganKlu = require("../GolonganKlu/GolonganKluModel.js");
const Cabang = require("../Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const SubGolonganKlu = sequelize.define(
  "subgolonganklus",
  {
    kodeSubGolonganKlu: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
      unique: true,
    },
    namaSubGolonganKlu: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    ketSubGolonganKlu: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    // Foreign Key Golongan Pokok Klu
    golonganKluId: {
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

SubGolonganKlu.belongsTo(GolonganKlu, {
  foreignKey: "golonganKluId",
  targetKey: "id",
});

SubGolonganKlu.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = SubGolonganKlu;

(async () => {
  await sequelize.sync();
})();
