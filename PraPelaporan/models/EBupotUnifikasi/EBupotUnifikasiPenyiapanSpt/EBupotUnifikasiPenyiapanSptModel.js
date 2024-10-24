const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const User = require("../../../../User/models/UserModel.js");
const Penandatangan = require("../../../models/Penandatangan/PenandatanganModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const EBupotUnifikasiPenyiapanSpt = sequelize.define(
  "ebupotunifikasipenyiapanspts",
  {
    tanggalTagihanPemotongan: {
      type: DataTypes.DATE,
      default: new Date(),
      allowNull: false,
    },
    // Foreign Key User E-BupotUnifikasiPenyiapanSpt
    userEBupotUnifikasiPenyiapanSptId: {
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
    pembetulanKe: {
      type: DataTypes.DOUBLE,
      default: 0,
      allowNull: false,
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

    // DOSS
    penghasilanDariIndonesiaJumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    penghasilanDariIndonesiaJumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    penghasilanDariLuarIndonesiaJumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    penghasilanDariLuarIndonesiaJumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    pphPasal24YangDapatDiperhitungkanJumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    pphPasal24YangDapatDiperhitungkanJumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    pphYangDipotongPihakLainJumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    pphYangDipotongPihakLainJumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    pphYangDisetorSendiriJumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    pphYangDisetorSendiriJumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },

    // DOPP
    kode2210101JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2210101JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2240501JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2240501JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2240502JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2240502JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2710007JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2710007JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2710203JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2710203JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840101JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840101JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840104JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840104JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840105JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840105JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840106JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840106JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840401JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840401JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840402JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840402JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840403JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840403JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840404JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840404JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840405JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840405JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840406JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840406JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840407JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840407JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840408JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840408JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840409JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840409JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840410JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840410JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840411JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840411JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840601JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840601JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840701JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840701JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840801JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840801JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840503JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840503JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840412JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840412JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840413JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840413JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840414JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840414JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840415JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840415JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840416JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840416JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840417JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840417JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840418JumlahDasar: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    kode2840418JumlahPph: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },

    // Foreign Key Penandatangan
    penandatanganId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
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

EBupotUnifikasiPenyiapanSpt.belongsTo(User, {
  foreignKey: "userEBupotUnifikasiPenyiapanSptId",
  targetKey: "id",
});

EBupotUnifikasiPenyiapanSpt.belongsTo(Penandatangan, {
  foreignKey: "penandatanganId",
  targetKey: "id",
});

EBupotUnifikasiPenyiapanSpt.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = EBupotUnifikasiPenyiapanSpt;

(async () => {
  await sequelize.sync();
})();
