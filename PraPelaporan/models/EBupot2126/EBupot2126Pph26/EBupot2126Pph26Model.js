const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const Negara = require("../../../../Master/models/Negara/NegaraModel.js");
const EBupot2126Penandatangan = require("../../../models/EBupot2126/Penandatangan/EBupot2126PenandatanganModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupot2126Pph26 = sequelize.define(
  "ebupot2126pph26s",
  {
    nomorBuktiSetor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggalBuktiSetor: {
      type: DataTypes.DATE,
      default: new Date(),
      allowNull: false,
    },
    // 01.) IDENTITAS WAJIB PAJAK YANG DIPOTONG
    // Foreign Key User E-Bupot2126Pph26Id
    userEBupot2126Pph26Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tahunPajak: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bulanPajak: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    masaPajak: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tinPasporKitasKitap: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    nama: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    alamat: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    // Foreign Key Negara
    negaraId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },

    // Kondisi
    isFasilitasValid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    // 02.) JENIS PEMOTONGAN PPH PASAL 26
    // Foreign Key Objek Pajak
    objekPajakId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fasilitasPajakPenghasilan: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    nomorSkdWpln: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    // 03.) PENGHITUNGAN PPH PASAL 26
    jumlahPenghasilanBruto: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    tarif: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pPhYangDipotongDipungut: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    // 04.) PENANDATANGAN BUKTI PEMOTONGAN
    // Foreign Key EBupot2126Penandatangan
    eBupot2126PenandatanganId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // isPost
    isPost: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    // isHapus
    isHapus: {
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

EBupot2126Pph26.belongsTo(User, {
  foreignKey: "userEBupot2126Pph26Id",
  targetKey: "id",
});

EBupot2126Pph26.belongsTo(Negara, {
  foreignKey: "negaraId",
  targetKey: "id",
});

EBupot2126Pph26.belongsTo(ObjekPajak, {
  foreignKey: "objekPajakId",
  targetKey: "id",
});

EBupot2126Pph26.belongsTo(EBupot2126Penandatangan, {
  foreignKey: "eBupot2126PenandatanganId",
  targetKey: "id",
});

EBupot2126Pph26.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupot2126Pph26;

(async () => {
  await sequelize.sync();
})();
