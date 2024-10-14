const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const EBilling = require("../../../../EBilling/models/EBilling/EBillingModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupotUnifikasiPphDisetorSendiri = sequelize.define(
  "ebupotunifikasipphdisetorsendiris",
  {
    // Foreign Key User E-BupotUnifikasiPphDisetorSendiri
    userEBupotUnifikasiPphDisetorSendiriId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nomorBuktiSetor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenisBuktiPenyetoran: {
      type: DataTypes.STRING, // Surat Setoran Pajak, Pemindahbukuan
      allowNull: false,
    },
    tanggalBuktiSetor: {
      type: DataTypes.DATE,
      default: new Date(),
      allowNull: false,
    },

    // Foreign Key EBilling
    eBillingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Foreign Key Objek Pajak
    objekPajakId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    jumlahPenghasilanBruto: {
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

EBupotUnifikasiPphDisetorSendiri.belongsTo(User, {
  foreignKey: "userEBupotUnifikasiPphDisetorSendiriId",
  targetKey: "id",
});

EBupotUnifikasiPphDisetorSendiri.belongsTo(EBilling, {
  foreignKey: "eBillingId",
  targetKey: "id",
});

EBupotUnifikasiPphDisetorSendiri.belongsTo(ObjekPajak, {
  foreignKey: "objekPajakId",
  targetKey: "id",
});

EBupotUnifikasiPphDisetorSendiri.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupotUnifikasiPphDisetorSendiri;

(async () => {
  await sequelize.sync();
})();
