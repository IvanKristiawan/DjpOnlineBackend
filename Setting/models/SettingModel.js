const { Sequelize } = require("sequelize");
const { sequelize } = require("../../config/Database.js");
const Cabang = require("../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const Setting = sequelize.define(
  "settings",
  {
    namaProgram: {
      type: DataTypes.STRING,
      defaultValue: "TECHKU",
      allowNull: true,
    },
    namaSoftware: {
      type: DataTypes.STRING,
      defaultValue: "PAJAK",
      allowNull: true,
    },
    namaPerusahaan: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    alamatPerusahaan: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    kotaPerusahaan: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    provinsiPerusahaan: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    kabupatenPerusahaan: {
      type: DataTypes.STRING,
      defaultValue: "",
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

Setting.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = Setting;

(async () => {
  await sequelize.sync();
})();
