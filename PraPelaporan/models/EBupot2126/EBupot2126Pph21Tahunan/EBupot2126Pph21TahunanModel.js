const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const Ptkp = require("../../../../Master/models/Ptkp/PtkpModel.js");
const Negara = require("../../../../Master/models/Negara/NegaraModel.js");
const EBupot2126Penandatangan = require("../../../models/EBupot2126/Penandatangan/EBupot2126PenandatanganModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupot2126Pph21Tahunan = sequelize.define(
  "ebupot2126pph21tahunans",
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
    // Foreign Key User E-Bupot2126Pph21TahunanId
    userEBupot2126Pph21TahunanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // 01.) IDENTITAS PENERIMA PENGHASILAN YANG DIPOTONG
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
    jenisKelamin: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    // Foreign Key Ptkp
    jumlahTanggunganKeluargaPtkpId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    namaJabatan: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    isStatusKaryawanAsing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    // Foreign Key Negara
    negaraId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },

    // 02.) JENIS PEMOTONGAN PPH PASAL 21
    // Foreign Key Objek Pajak
    objekPajakId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tahunPajak: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bulanPajakAwal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bulanPajakAkhir: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isFasilitasValid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bupot2126FasilitasDtpIkn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    fasilitasPajakPenghasilan: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    nomorSuketDtpIkn: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    // 03.) DATA PENGHASILAN MASA PAJAK TERAKHIR
    jumlahPenghasilan: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    // 04.) DATA PENGHASILAN SETAHUN
    gajiAtauUangPensiunanBerkala: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    tunjanganPph: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    tunjanganLainnya: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    honorarium: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    premiAsuransi: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    penerimaanNatura: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    tantiemBonusGratifikasiJasaProduksiThr: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    jumlahPenghasilanBruto1sd7: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    // 05.) PENGURANGAN
    biayaJabatan: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    iuranPensiun: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    zakatKeagamaan: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    jumlahPengurangan9sd11: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    // 06.) PENGHITUNGAN PPh PASAL 21
    jumlahPenghasilanNeto8sd12: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    penghasilanNetoMasaPajakSebelumnya: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    jumlahPenghasilanNetoPilihan: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    jumlahPenghasilanNetoSetahunAtauDisetahunkan: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    // Foreign Key Ptkp
    ptkpId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    jumlahPtkp: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pkpSetahunAtauDisetahunkan15sd16: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21PkpSetahunAtauDisetahunkan: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21TelahDipotongMasaPajakSebelumnya: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DtpTelahDipotongMasaPajakSebelumnya: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21Terutang18sd20: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21Dipotong: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DipotongJanuari: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DipotongFebruari: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DipotongMaret: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DipotongApril: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DipotongMei: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DipotongJuni: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DipotongJuli: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DipotongAgustus: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DipotongSeptember: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DipotongOktober: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DipotongNovember: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DipotongDesember: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21Dtp: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DtpJanuari: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DtpFebruari: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DtpMaret: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DtpApril: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DtpMei: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DtpJuni: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DtpJuli: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DtpAgustus: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DtpSeptember: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DtpOktober: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DtpNovember: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21DtpDesember: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21KurangLebihBayarMasaPajakTerakhir: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21KurangLebihBayarMasaPajakTerakhirDipotong: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pph21KurangLebihBayarMasaPajakTerakhirDtp: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    // 07.) PENANDATANGAN BUKTI PEMOTONGAN
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

EBupot2126Pph21Tahunan.belongsTo(User, {
  foreignKey: "userEBupot2126Pph21TahunanId",
  targetKey: "id",
});

EBupot2126Pph21Tahunan.belongsTo(Ptkp, {
  as: "TanggunganPtkp",
  foreignKey: "jumlahTanggunganKeluargaPtkpId",
  targetKey: "id",
});

EBupot2126Pph21Tahunan.belongsTo(Negara, {
  foreignKey: "negaraId",
  targetKey: "id",
});

EBupot2126Pph21Tahunan.belongsTo(ObjekPajak, {
  foreignKey: "objekPajakId",
  targetKey: "id",
});

EBupot2126Pph21Tahunan.belongsTo(Ptkp, {
  as: "Ptkp",
  foreignKey: "ptkpId",
  targetKey: "id",
});

EBupot2126Pph21Tahunan.belongsTo(EBupot2126Penandatangan, {
  foreignKey: "eBupot2126PenandatanganId",
  targetKey: "id",
});

EBupot2126Pph21Tahunan.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupot2126Pph21Tahunan;

(async () => {
  await sequelize.sync();
})();
