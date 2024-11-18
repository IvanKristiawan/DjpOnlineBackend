const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const EbupotUnifikasiPenyiapanSpt = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPenyiapanSpt/EBupotUnifikasiPenyiapanSptModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupotUnifikasiPosting = sequelize.define(
  "ebupotunifikasipostings",
  {
    tanggalEBupotUnifikasiPosting: {
      type: DataTypes.DATE,
      default: new Date(),
      allowNull: false,
    },
    // Foreign Key User E-BupotUnifikasiPosting
    userEBupotUnifikasiPostingId: {
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
    // Foreign Key EbupotUnifikasiPenyiapanSpt
    ebupotUnifikasiPenyiapanSptId: {
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
      defaultValue: 0,
      allowNull: false,
    },
    jumlahPph: {
      type: DataTypes.DOUBLE,
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

EBupotUnifikasiPosting.belongsTo(User, {
  foreignKey: "userEBupotUnifikasiPostingId",
  targetKey: "id",
});

EBupotUnifikasiPosting.belongsTo(EbupotUnifikasiPenyiapanSpt, {
  foreignKey: "ebupotUnifikasiPenyiapanSptId",
  targetKey: "id",
});

EBupotUnifikasiPosting.belongsTo(ObjekPajak, {
  foreignKey: "objekPajakId",
  targetKey: "id",
});

EBupotUnifikasiPosting.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupotUnifikasiPosting;

(async () => {
  await sequelize.sync();
})();
