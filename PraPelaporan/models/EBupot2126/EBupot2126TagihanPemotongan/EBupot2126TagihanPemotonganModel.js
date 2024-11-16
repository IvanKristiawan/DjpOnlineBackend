const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const Ebupot2126PenyiapanSpt = require("../../../models/EBupot2126/EBupot2126PenyiapanSpt/EBupot2126PenyiapanSptModel.js");
const JenisSetoran = require("../../../../Master/models/JenisSetoran/JenisSetoranModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupot2126TagihanPemotongan = sequelize.define(
  "ebupot2126tagihanpemotongans",
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
    // Foreign Key User E-Bupot2126TagihanPemotongan
    userEBupot2126TagihanPemotonganId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Foreign Key Ebupot2126PenyiapanSpt
    ebupot2126PenyiapanSptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    nop: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    // Foreign Key Jenis Setoran
    jenisSetoranId: {
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

EBupot2126TagihanPemotongan.belongsTo(User, {
  foreignKey: "userEBupot2126TagihanPemotonganId",
  targetKey: "id",
});

EBupot2126TagihanPemotongan.belongsTo(Ebupot2126PenyiapanSpt, {
  foreignKey: "ebupot2126PenyiapanSptId",
  targetKey: "id",
});

EBupot2126TagihanPemotongan.belongsTo(JenisSetoran, {
  foreignKey: "jenisSetoranId",
  targetKey: "id",
});

EBupot2126TagihanPemotongan.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupot2126TagihanPemotongan;

(async () => {
  await sequelize.sync();
})();
