const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const User = require("../../models/UserModel.js");

const { DataTypes } = Sequelize;

const HakAkses = sequelize.define(
  "hakaksess",
  {
    // FITUR PRALAPOR
    eBupot2126: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    eBupotUnifikasi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    eBupotPphPasal2326: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    // FITUR LAPOR LAINNYA
    pbb: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    // FITUR LAYANAN
    programPengungkapanSukarela: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    ePbk: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    fasilitasDanInsentif: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    ePspt: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    eCbcr: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    eObjection: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    ePhtb: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    eSkd: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    eSktd: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    infoKswp: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    portalLayanan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    rumahKonfirmasi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    eReportingInvestasi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    eReportingFasilitasDanInsentif: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    penyusutanDanAmortisasi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    // MASTER
    kategoriKlu: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    golonganPokokKlu: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    golonganKlu: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    subGolonganKlu: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    kelompokKegiatanEkonomiKlu: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    jenisPajak: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    jenisSetoran: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    tahun: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    cabang: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    // UTILITY
    profilUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    daftarUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    setting: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    // Foreign Key Cabang
    userId: {
      type: DataTypes.INTEGER,
      default: 1,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

HakAkses.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

module.exports = HakAkses;

(async () => {
  await sequelize.sync();
})();
