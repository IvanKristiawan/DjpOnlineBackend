const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const EBupotUnifikasiPph42152223 = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPph42152223/EBupotUnifikasiPph42152223Model.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const DokumenDasarPemotonganEBupotUnifikasiPph42152223 = sequelize.define(
  "dokumendasarpemotonganebupotunifikasipph42152223s",
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

    // Foreign Key E-BupotUnifikasiPph42152223
    eBupotUnifikasiPph42152223Id: {
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

DokumenDasarPemotonganEBupotUnifikasiPph42152223.belongsTo(
  EBupotUnifikasiPph42152223,
  {
    foreignKey: "eBupotUnifikasiPph42152223Id",
    targetKey: "id",
  }
);

DokumenDasarPemotonganEBupotUnifikasiPph42152223.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = DokumenDasarPemotonganEBupotUnifikasiPph42152223;

(async () => {
  await sequelize.sync();
})();
