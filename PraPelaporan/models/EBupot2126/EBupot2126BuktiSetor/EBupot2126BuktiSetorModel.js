const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const EBupot2126TagihanPemotongan = require("../../../models/EBupot2126/EBupot2126TagihanPemotongan/EBupot2126TagihanPemotonganModel.js");
const JenisSetoran = require("../../../../Master/models/JenisSetoran/JenisSetoranModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupot2126BuktiSetor = sequelize.define(
  "ebupot2126buktisetors",
  {
    // Foreign Key User E-EBupot2126BuktiSetor
    userEBupot2126BuktiSetorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Foreign Key EBupot2126TagihanPemotongan
    eBupot2126TagihanPemotonganId: {
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

    pphYangDisetor: {
      type: DataTypes.DOUBLE,
      default: 0,
      allowNull: false,
    },

    // Foreign Key Jenis Setoran
    jenisSetoranId: {
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

EBupot2126BuktiSetor.belongsTo(User, {
  foreignKey: "userEBupot2126BuktiSetorId",
  targetKey: "id",
});

EBupot2126BuktiSetor.belongsTo(EBupot2126TagihanPemotongan, {
  foreignKey: "eBupot2126TagihanPemotonganId",
  targetKey: "id",
});

EBupot2126BuktiSetor.belongsTo(JenisSetoran, {
  foreignKey: "jenisSetoranId",
  targetKey: "id",
});

EBupot2126BuktiSetor.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupot2126BuktiSetor;

(async () => {
  await sequelize.sync();
})();
