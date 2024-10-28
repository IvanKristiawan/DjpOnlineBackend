const { Sequelize } = require("sequelize");
const { sequelize } = require("../../config/Database.js");
const KelompokKegiatanEkonomiKlu = require("../../Master/models/KelompokKegiatanEkonomiKlu/KelompokKegiatanEkonomiKluModel.js");
const Cabang = require("../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const User = sequelize.define(
  "users",
  {
    // Data Utama
    npwp15: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nikNpwp16: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nitku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bentukBadan: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Data Lainnya
    alamat: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    nomorTelepon: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },

    // Data KLU
    kelompokKegiatanEkonomiKluId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Info Perpajakan
    kppAdministrasi: {
      type: DataTypes.STRING,
      defaultValue: "KPP PRATAMA SLEMAN",
      allowNull: true,
    },
    noTeleponKpp: {
      type: DataTypes.STRING,
      defaultValue: "(0274) 4333940",
      allowNull: true,
    },
    accountRepresentative: {
      type: DataTypes.STRING,
      defaultValue: "GAET PRIYANTO",
      allowNull: true,
    },
    statusWp: {
      type: DataTypes.STRING,
      defaultValue: "AKTIF",
      allowNull: true,
    },
    statusPkp: {
      type: DataTypes.STRING,
      defaultValue: "NON PKP",
      allowNull: true,
    },

    // Identitas Penanggung Jawab
    namaPenanggungJawab: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    nikPenanggungJawab: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    npwpPenanggungJawab: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    jabatanPenanggungJawab: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    kebangsaanPenanggungJawab: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    alamatPjBadanPenanggungJawab: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },

    // Dokumen Pendirian
    nomorAkta: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    tempatAkta: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    namaNotaris: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    nomorAktaPerubahan: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passphrase: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipeUser: {
      type: DataTypes.STRING,
      default: "ADMIN", // ADMIN, MANAGER, OWNER
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

User.belongsTo(KelompokKegiatanEkonomiKlu, {
  foreignKey: "kelompokKegiatanEkonomiKluId",
  targetKey: "id",
});

User.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = User;

(async () => {
  await sequelize.sync();
})();
