const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const User = require("../../../User/models/UserModel.js");
const JenisSetoran = require("../../../Master/models/JenisSetoran/JenisSetoranModel.js");
const Tahun = require("../../../Master/models/Tahun/TahunModel.js");
const Cabang = require("../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBilling = sequelize.define(
  "ebillings",
  {
    // Foreign Key User E-Billing
    userEBillingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Foreign Key Jenis Setoran
    jenisSetoranId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    masaPajakDariBulan: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    masaPajakSampaiBulan: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    // Foreign Key Tahun Pajak
    tahunPajakId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    subjekPajak: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    subjekPajakNpwp: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    subjekPajakNitku: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    subjekPajakNikNpwp16: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    subjekPajakNama: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    subjekPajakAlamat: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    nop: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    nomorKetetapan: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    jumlahSetorMataUang: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    jumlahSetor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uraian: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    kodeBilling: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    masaAktifKodeBilling: {
      type: DataTypes.DATE,
      default: new Date(),
      allowNull: false,
    },
    tanggalSetorKodeBilling: {
      type: DataTypes.DATE,
      default: new Date(),
      allowNull: false,
    },

    ntpnBilling: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },

    // Lapor
    pralapor: {
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

EBilling.belongsTo(User, {
  foreignKey: "userEBillingId",
  targetKey: "id",
});

EBilling.belongsTo(JenisSetoran, {
  foreignKey: "jenisSetoranId",
  targetKey: "id",
});

EBilling.belongsTo(Tahun, {
  foreignKey: "tahunPajakId",
  targetKey: "id",
});

EBilling.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBilling;

(async () => {
  await sequelize.sync();
})();
