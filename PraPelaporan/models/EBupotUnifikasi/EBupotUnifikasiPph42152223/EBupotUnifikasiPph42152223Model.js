const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const Penandatangan = require("../../../models/Penandatangan/PenandatanganModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupotUnifikasiPph42152223 = sequelize.define(
  "ebupotunifikasipph42152223s",
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
    // 01.) Accordion 1
    // Foreign Key User E-BupotUnifikasiPph42152223Id
    userEBupotUnifikasiPph42152223Id: {
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

    // 02.) Accordion 2
    // Foreign Key Objek Pajak
    objekPajakId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nomorSuratKeteranganBebas: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    nomorPPhDitanggungPemerintah: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    nomorSuratKeteranganBerdasarkanPPNo232018: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    nomorFasilitasLainnyaberdasarkan: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
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

    // 03.) Accordion 3

    // 04.) Accordion 4
    // Foreign Key Penandatangan
    penandatanganId: {
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

EBupotUnifikasiPph42152223.belongsTo(User, {
  foreignKey: "userEBupotUnifikasiPph42152223Id",
  targetKey: "id",
});

EBupotUnifikasiPph42152223.belongsTo(ObjekPajak, {
  foreignKey: "objekPajakId",
  targetKey: "id",
});

EBupotUnifikasiPph42152223.belongsTo(Penandatangan, {
  foreignKey: "penandatanganId",
  targetKey: "id",
});

EBupotUnifikasiPph42152223.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupotUnifikasiPph42152223;

(async () => {
  await sequelize.sync();
})();
