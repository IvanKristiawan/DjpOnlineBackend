const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Cabang = require("../Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const JenisPajak = sequelize.define(
  "jenispajaks",
  {
    kodeJenisPajak: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
      unique: true,
    },
    namaJenisPajak: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    ketJenisPajak: {
      type: DataTypes.STRING,
      default: "",
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

JenisPajak.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = JenisPajak;

(async () => {
  await sequelize.sync();
})();
