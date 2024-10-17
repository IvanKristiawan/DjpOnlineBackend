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
