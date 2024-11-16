const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const EBupot2126ImporData = require("../../../models/EBupot2126/EBupot2126ImporData/EBupot2126ImporDataModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupot2126DetilValidasi = sequelize.define(
  "ebupot2126detilvalidasis",
  {
    // Foreign Key User E-Bupot2126ImporData
    userEBupot2126DetilValidasiId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Foreign Key User E-Bupot2126ImporData
    userEBupot2126ImporDataId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pasal: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    barisExcel: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    statusValidasi: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    keteranganValidasi: {
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

EBupot2126DetilValidasi.belongsTo(User, {
  foreignKey: "userEBupot2126DetilValidasiId",
  targetKey: "id",
});

EBupot2126DetilValidasi.belongsTo(EBupot2126ImporData, {
  foreignKey: "userEBupot2126ImporDataId",
  targetKey: "id",
});

EBupot2126DetilValidasi.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupot2126DetilValidasi;

(async () => {
  await sequelize.sync();
})();
