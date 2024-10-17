const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const EbupotUnifikasiPenyiapanSpt = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPenyiapanSpt/EBupotUnifikasiPenyiapanSptModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupotUnifikasiTagihanPemotongan = sequelize.define(
  "ebupotunifikasitagihanpemotongans",
  {
    jenis: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    tanggalTagihanPemotongan: {
      type: DataTypes.DATE,
      default: new Date(),
      allowNull: false,
    },
    // Foreign Key User E-BupotUnifikasiTagihanPemotongan
    userEBupotUnifikasiTagihanPemotonganId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Foreign Key EbupotUnifikasiPenyiapanSpt
    ebupotUnifikasiPenyiapanSptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    nop: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    // Foreign Key Objek Pajak
    objekPajakId: {
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
    nomorKetetapan: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    pphYangDipotong: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pphYangDisetor: {
      type: DataTypes.DOUBLE,
      default: 0,
      allowNull: false,
    },

    uraian: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    npwpPenyetor: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    nitkuPenyetor: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    namaPenyetor: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    idBilling: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    masaAktifKodeBilling: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    ntpnBilling: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    // Setor
    isSetor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

EBupotUnifikasiTagihanPemotongan.belongsTo(User, {
  foreignKey: "userEBupotUnifikasiTagihanPemotonganId",
  targetKey: "id",
});

EBupotUnifikasiTagihanPemotongan.belongsTo(EbupotUnifikasiPenyiapanSpt, {
  foreignKey: "ebupotUnifikasiPenyiapanSptId",
  targetKey: "id",
});

EBupotUnifikasiTagihanPemotongan.belongsTo(ObjekPajak, {
  foreignKey: "objekPajakId",
  targetKey: "id",
});

EBupotUnifikasiTagihanPemotongan.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupotUnifikasiTagihanPemotongan;

(async () => {
  await sequelize.sync();
})();
