const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Cabang = require("../Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const TarifPph21PP68Tahun2009 = sequelize.define(
  "tarifpph21pp68tahun2009s",
  {
    kodeTarifPph21PP68Tahun2009: {
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

TarifPph21PP68Tahun2009.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = TarifPph21PP68Tahun2009;

(async () => {
  await sequelize.sync();
})();
