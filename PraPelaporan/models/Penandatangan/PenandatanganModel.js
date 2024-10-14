const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const User = require("../../../User/models/UserModel.js");
const Cabang = require("../../../Master/models/Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const Penandatangan = sequelize.define(
  "penandatangans",
  {
    // Foreign Key User Penandatangan
    userPenandatanganId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bertindakSebagai: {
      type: DataTypes.STRING, // Wakil Wajib Pajak (Pengurus), Kuasa
      allowNull: false,
    },
    jenisIdentitas: {
      type: DataTypes.STRING, // NPWP, NIK
      allowNull: false,
    },
    nomorIdentitas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    namaIdentitas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN, // 0 Tidak Aktif, 1 Aktif
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

Penandatangan.belongsTo(User, {
  foreignKey: "userPenandatanganId",
  targetKey: "id",
});

Penandatangan.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = Penandatangan;

(async () => {
  await sequelize.sync();
})();
