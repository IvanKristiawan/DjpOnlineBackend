const { sequelize } = require("../../config/Database.js");
const User = require("../models/UserModel.js");
const HakAkses = require("../models/HakAkses/HakAksesModel.js");
const KewajibanPerpajakan = require("../models/KewajibanPerpajakan/KewajibanPerpajakanModel.js");
const Cabang = require("../../Master/models/Cabang/CabangModel.js");
const { createError } = require("../../utils/error.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    Object.keys(req.body).forEach(function (k) {
      if (typeof req.body[k] == "string") {
        req.body[k] = req.body[k].toUpperCase().trim();
      }
    });

    const newUser = await User.create(
      {
        ...req.body,
        password: req.body.password,
        cabangId: req.body.cabangId,
      },
      { transaction }
    );

    const insertedHakAkses = await HakAkses.create(
      {
        ...req.body.akses,
        userId: newUser.dataValues.id,
      },
      { transaction }
    );

    const insertedKewajibanPerpajakan = await KewajibanPerpajakan.create(
      {
        ...req.body.kewajibanPerpajakan,
        userId: newUser.dataValues.id,
      },
      { transaction }
    );

    await transaction.commit();
    res.status(200).send(`User ${req.body.npwp15} has been created.`);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        npwp15: req.body.npwp15,
      },
      include: [{ model: Cabang }],
    });
    if (!user) return next(createError(404, "User not found!"));

    if (req.body.password !== user.password) {
      return next(createError(400, "NPWP atau Password Salah!"));
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT, {
      expiresIn: "15d",
    });

    const { password, ...otherDetails } = user.dataValues;

    const hakAkses = await HakAkses.findOne({
      where: {
        userId: user.dataValues.id,
      },
    });

    const kewajibanPerpajakan = await KewajibanPerpajakan.findOne({
      where: {
        userId: user.dataValues.id,
      },
    });

    res.status(200).json({
      details: {
        ...otherDetails,
        token,
        akses: hakAkses,
        kewajibanPerpajakan,
      },
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
