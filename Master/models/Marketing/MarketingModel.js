const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Cabang = require("../Cabang/CabangModel.js");

const { DataTypes } = Sequelize;

const Marketing = sequelize.define(
  "marketings",
  {
    kodeMarketing: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    namaMarketing: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    teleponMarketing: {
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

Marketing.belongsTo(Cabang, {
  foreignKey: "cabangId",
  targetKey: "id",
});

module.exports = Marketing;

(async () => {
  await sequelize.sync();
})();
