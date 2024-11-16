const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const Ebupot2126PenyiapanSpt = require("../../../models/EBupot2126/EBupot2126PenyiapanSpt/EBupot2126PenyiapanSptModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupot2126Posting = sequelize.define(
  "ebupot2126postings",
  {
    tanggalEBupot2126Posting: {
      type: DataTypes.DATE,
      default: new Date(),
      allowNull: false,
    },
    // Foreign Key User E-Bupot2126Posting
    userEBupot2126PostingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    masaPajak: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tahunPajak: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Foreign Key Ebupot2126PenyiapanSpt
    ebupot2126PenyiapanSptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Foreign Key Objek Pajak
    objekPajakId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlahDpp: {
      type: DataTypes.DOUBLE,
      default: 0,
      allowNull: false,
    },
    jumlahPph: {
      type: DataTypes.DOUBLE,
      default: 0,
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

EBupot2126Posting.belongsTo(User, {
  foreignKey: "userEBupot2126PostingId",
  targetKey: "id",
});

EBupot2126Posting.belongsTo(Ebupot2126PenyiapanSpt, {
  foreignKey: "ebupot2126PenyiapanSptId",
  targetKey: "id",
});

EBupot2126Posting.belongsTo(ObjekPajak, {
  foreignKey: "objekPajakId",
  targetKey: "id",
});

EBupot2126Posting.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupot2126Posting;

(async () => {
  await sequelize.sync();
})();
