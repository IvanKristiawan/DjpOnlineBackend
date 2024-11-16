const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupot2126ImporData = sequelize.define(
  "ebupot2126impordatas",
  {
    // Foreign Key User E-Bupot2126ImporData
    userEBupot2126ImporDataId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipe: {
      type: DataTypes.STRING, // Bulanan, Tahunan
      default: "",
      allowNull: true,
    },
    nomorTiket: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    namaFile: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    tanggalUpload: {
      type: DataTypes.DATE,
      default: new Date(),
      allowNull: false,
    },
    jumlahBaris: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    keteranganUpload: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    masaPajak: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tahunPajak: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jumlahBuktiPotongPph21: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    jumlahBuktiPotongPph26: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    jumlahBuktiPotongA1: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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

EBupot2126ImporData.belongsTo(User, {
  foreignKey: "userEBupot2126ImporDataId",
  targetKey: "id",
});

EBupot2126ImporData.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupot2126ImporData;

(async () => {
  await sequelize.sync();
})();
