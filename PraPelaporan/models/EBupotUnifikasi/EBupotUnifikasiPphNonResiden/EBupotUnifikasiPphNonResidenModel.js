const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const Negara = require("../../../../Master/models/Negara/NegaraModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const Penandatangan = require("../../../models/Penandatangan/PenandatanganModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupotUnifikasiPphNonResiden = sequelize.define(
  "ebupotunifikasipphNonResidens",
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
    // Foreign Key User E-BupotUnifikasiPphNonResidenId
    userEBupotUnifikasiPphNonResidenId: {
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
    tin: {
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
    tempatLahir: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    noPaspor: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    // Foreign Key Negara
    negaraId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tanggalLahir: {
      type: DataTypes.DATE,
      default: new Date(),
      allowNull: false,
    },
    noKitasKitap: {
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
    nomorSkdWpln: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    nomorPPhDitanggungPemerintah: {
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
    perkiraanPenghasilanNetto: {
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

EBupotUnifikasiPphNonResiden.belongsTo(User, {
  foreignKey: "userEBupotUnifikasiPphNonResidenId",
  targetKey: "id",
});

EBupotUnifikasiPphNonResiden.belongsTo(Negara, {
  foreignKey: "negaraId",
  targetKey: "id",
});

EBupotUnifikasiPphNonResiden.belongsTo(ObjekPajak, {
  foreignKey: "objekPajakId",
  targetKey: "id",
});

EBupotUnifikasiPphNonResiden.belongsTo(Penandatangan, {
  foreignKey: "penandatanganId",
  targetKey: "id",
});

EBupotUnifikasiPphNonResiden.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupotUnifikasiPphNonResiden;

(async () => {
  await sequelize.sync();
})();
