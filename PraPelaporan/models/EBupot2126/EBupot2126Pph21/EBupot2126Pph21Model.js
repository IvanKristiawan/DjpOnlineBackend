const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const JenisObjekPajak = require("../../../../Master/models/JenisObjekPajak/JenisObjekPajakModel.js");
const Ptkp = require("../../../../Master/models/Ptkp/PtkpModel.js");
const EBupot2126Penandatangan = require("../../../models/EBupot2126/Penandatangan/EBupot2126PenandatanganModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupot2126Pph21 = sequelize.define(
  "ebupot2126pph21s",
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
    // Foreign Key User E-Bupot2126Pph21Id
    userEBupot2126Pph21Id: {
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
    identitas: {
      type: DataTypes.STRING, // NPWP/NITKU, NIK
      allowNull: false,
    },
    npwpNitku: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    nik: {
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

    // Kondisi
    isFasilitasValid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bupot2126SkemaPenghitungan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bupot2126PtkpTahunan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bupot2126JenisObjekPajak: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bupot2126DasarPengenaanPajak: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bupot2126DasarPengenaanPajakBebasInput: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bupot2126DasarPengenaanPajakAkumulasiPenghasilanBruto: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bupot2126FormulasiPenghitungan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bupot2126FasilitasDtpIkn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    // 02.) JENIS PEMOTONGAN PPH PASAL 21
    // Foreign Key Objek Pajak
    objekPajakId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    formulasiPenghitungan: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    nomorSuketDtpIkn: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    // 03.) PENANDATANGAN BUKTI PEMOTONGAN
    // Foreign Key Jenis Objek Pajak
    jenisObjekPajakId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    skemaPenghitungan: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    isAkumulasiPenghasilanBrutoValid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    akumulasiPenghasilanBruto: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false,
    },
    jumlahPenghasilan: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    // Foreign Key Ptkp
    ptkpId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dpp: {
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
    tindakanKelebihanPemotonganPph: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
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

EBupot2126Pph21.belongsTo(User, {
  foreignKey: "userEBupot2126Pph21Id",
  targetKey: "id",
});

EBupot2126Pph21.belongsTo(ObjekPajak, {
  foreignKey: "objekPajakId",
  targetKey: "id",
});

EBupot2126Pph21.belongsTo(JenisObjekPajak, {
  foreignKey: "jenisObjekPajakId",
  targetKey: "id",
});

EBupot2126Pph21.belongsTo(Ptkp, {
  foreignKey: "ptkpId",
  targetKey: "id",
});

EBupot2126Pph21.belongsTo(EBupot2126Penandatangan, {
  foreignKey: "eBupot2126PenandatanganId",
  targetKey: "id",
});

EBupot2126Pph21.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupot2126Pph21;

(async () => {
  await sequelize.sync();
})();
