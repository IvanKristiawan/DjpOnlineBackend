const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupotUnifikasiImporData = sequelize.define(
  "ebupotunifikasiimpordatas",
  {
    // Foreign Key User E-BupotUnifikasiImporData
    userEBupotUnifikasiImporDataId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    jumlahBuktiPotongPph42152223: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    jumlahBuktiPotongPphNonResiden: {
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

EBupotUnifikasiImporData.belongsTo(User, {
  foreignKey: "userEBupotUnifikasiImporDataId",
  targetKey: "id",
});

EBupotUnifikasiImporData.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupotUnifikasiImporData;

(async () => {
  await sequelize.sync();
})();
