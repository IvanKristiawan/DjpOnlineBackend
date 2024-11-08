const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Cabang = require("../Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const TarifPph21PP149Tahun2000 = sequelize.define(
  "tarifpph21pp149tahun2000s",
  {
    kodeTarifPph21PP149Tahun2000: {
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

TarifPph21PP149Tahun2000.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = TarifPph21PP149Tahun2000;

(async () => {
  await sequelize.sync();
})();
