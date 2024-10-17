const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const EBupotUnifikasiTagihanPemotongan = require("../../../models/EBupotUnifikasi/EBupotUnifikasiTagihanPemotongan/EBupotUnifikasiTagihanPemotonganModel.js");
const JenisSetoran = require("../../../../Master/models/JenisSetoran/JenisSetoranModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupotUnifikasiBuktiSetor = sequelize.define(
  "ebupotunifikasibuktisetors",
  {
    // Foreign Key User E-EBupotUnifikasiBuktiSetor
    userEBupotUnifikasiBuktiSetorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Foreign Key EBupotUnifikasiTagihanPemotongan
    eBupotUnifikasiTagihanPemotonganId: {
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

EBupotUnifikasiBuktiSetor.belongsTo(User, {
  foreignKey: "userEBupotUnifikasiBuktiSetorId",
  targetKey: "id",
});

EBupotUnifikasiBuktiSetor.belongsTo(EBupotUnifikasiTagihanPemotongan, {
  foreignKey: "eBupotUnifikasiTagihanPemotonganId",
  targetKey: "id",
});

EBupotUnifikasiBuktiSetor.belongsTo(JenisSetoran, {
  foreignKey: "jenisSetoranId",
  targetKey: "id",
});

EBupotUnifikasiBuktiSetor.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupotUnifikasiBuktiSetor;

(async () => {
  await sequelize.sync();
})();
