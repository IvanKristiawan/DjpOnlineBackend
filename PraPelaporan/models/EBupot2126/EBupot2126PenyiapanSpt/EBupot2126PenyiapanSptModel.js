const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const EBupot2126Penandatangan = require("../../../models/EBupot2126/Penandatangan/EBupot2126PenandatanganModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupot2126PenyiapanSpt = sequelize.define(
  "ebupot2126penyiapanspts",
  {
    tanggalTagihanPemotongan: {
      type: DataTypes.DATE,
      default: new Date(),
      allowNull: false,
    },
    // Foreign Key User E-Bupot2126PenyiapanSpt
    userEBupot2126PenyiapanSptId: {
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

    pph21Dtp: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false,
    },
    stpPph: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false,
    },
    kelebihanSetorJanuari: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    kelebihanSetorFebruari: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    kelebihanSetorMaret: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    kelebihanSetorApril: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    kelebihanSetorMei: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    kelebihanSetorJuni: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    kelebihanSetorJuli: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    kelebihanSetorAgustus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    kelebihanSetorSeptember: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    kelebihanSetorOktober: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    kelebihanSetorNovember: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    kelebihanSetorDesember: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    tahunPajakPenyiapanSpt: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    kelebihanSetor: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    jumlahAngka1213: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false,
    },
    tempTotalKurangAtauLebih: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false,
    },
    totalKurangAtauLebih: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false,
    },
    totalKurangAtauLebihPadaSptYangDibetulkan: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false,
    },
    totalKurangAtauLebihKarenaPembetulan: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false,
    },

    masaPajakKompensasi: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    tahunPajakKompensasi: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    statusSpt: {
      type: DataTypes.STRING,
      default: "Draft",
      allowNull: true,
    },
    keteranganSpt: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    // Foreign Key EBupot2126Penandatangan
    eBupot2126PenandatanganId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },

    // Kirim Spt
    noBpeNtte: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    pembetulanKe: {
      type: DataTypes.DOUBLE,
      default: 0,
      allowNull: false,
    },
    tanggalKirim: {
      type: DataTypes.DATE,
      default: null,
      allowNull: true,
    },
    ajukanUnduhBuktiPotong: {
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

EBupot2126PenyiapanSpt.belongsTo(User, {
  foreignKey: "userEBupot2126PenyiapanSptId",
  targetKey: "id",
});

EBupot2126PenyiapanSpt.belongsTo(EBupot2126Penandatangan, {
  foreignKey: "eBupot2126PenandatanganId",
  targetKey: "id",
});

EBupot2126PenyiapanSpt.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupot2126PenyiapanSpt;

(async () => {
  await sequelize.sync();
})();
