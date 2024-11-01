const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const EBupotUnifikasiImporData = require("../../../models/EBupotUnifikasi/EBupotUnifikasiImporData/EBupotUnifikasiImporDataModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupotUnifikasiDetilValidasi = sequelize.define(
  "ebupotunifikasidetilvalidasis",
  {
    // Foreign Key User E-BupotUnifikasiImporData
    userEBupotUnifikasiDetilValidasiId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Foreign Key User E-BupotUnifikasiImporData
    userEBupotUnifikasiImporDataId: {
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

EBupotUnifikasiDetilValidasi.belongsTo(User, {
  foreignKey: "userEBupotUnifikasiDetilValidasiId",
  targetKey: "id",
});

EBupotUnifikasiDetilValidasi.belongsTo(EBupotUnifikasiImporData, {
  foreignKey: "userEBupotUnifikasiImporDataId",
  targetKey: "id",
});

EBupotUnifikasiDetilValidasi.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupotUnifikasiDetilValidasi;

(async () => {
  await sequelize.sync();
})();
