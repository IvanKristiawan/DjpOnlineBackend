const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const EBupotUnifikasiPphNonResiden = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPphNonResiden/EBupotUnifikasiPphNonResidenModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const DokumenDasarPemotonganEBupotUnifikasiPphNonResiden = sequelize.define(
  "dokumendasarpemotonganebupotunifikasipphNonResidens",
  {
    namaDokumen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noDokumen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggalDokumen: {
      type: DataTypes.DATE,
      default: new Date(),
      allowNull: false,
    },

    // Foreign Key E-BupotUnifikasiPphNonResiden
    eBupotUnifikasiPphNonResidenId: {
      type: DataTypes.INTEGER,
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

DokumenDasarPemotonganEBupotUnifikasiPphNonResiden.belongsTo(
  EBupotUnifikasiPphNonResiden,
  {
    foreignKey: "eBupotUnifikasiPphNonResidenId",
    targetKey: "id",
  }
);

DokumenDasarPemotonganEBupotUnifikasiPphNonResiden.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = DokumenDasarPemotonganEBupotUnifikasiPphNonResiden;

(async () => {
  await sequelize.sync();
})();
