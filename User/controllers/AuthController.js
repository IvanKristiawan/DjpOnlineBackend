const { sequelize } = require("../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const User = require("../models/UserModel.js");
const HakAkses = require("../models/HakAkses/HakAksesModel.js");
const KewajibanPerpajakan = require("../models/KewajibanPerpajakan/KewajibanPerpajakanModel.js");
const KelompokKegiatanEkonomiKlu = require("../../Master/models/KelompokKegiatanEkonomiKlu/KelompokKegiatanEkonomiKluModel.js");
const Cabang = require("../../Master/models/Cabang/CabangModel.js");
const { createError } = require("../../utils/error.js");
const jwt = require("jsonwebtoken");
const { generateRandomNumberString } = require("../../helper/helper.js");

const register = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    let makeNpwp;
    let isUnique = false;

    while (!isUnique) {
      // Generate a random number string
      makeNpwp = generateRandomNumberString(15);

      // Check if the generated number already exists in the database
      const existingUsers = await User.findOne({
        where: {
          npwp15: makeNpwp, // Compare with generated npwp
        },
      });

      // If no users are found, the value is unique
      if (!existingUsers) {
        isUnique = true;
      }
    }
    let npwp15 = makeNpwp;
    let nikNpwp16 = `0${makeNpwp}`;
    let nitku = `0${makeNpwp}000000`;

    let kelompokKegiatanEkonomiKlus = await KelompokKegiatanEkonomiKlu.findOne({
      where: {
        kodeKelompokKegiatanEkonomiKlu: req.body.kodeKelompokKegiatanEkonomiKlu,
      },
    });

    const newUser = await User.create(
      {
        ...req.body,
        npwp15,
        nikNpwp16,
        nitku,
        kelompokKegiatanEkonomiKluId: kelompokKegiatanEkonomiKlus.id,
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
    res.status(200).send(newUser);
    // res.status(200).send(`User ${req.body.npwp15} has been created.`);
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
      include: [{ model: KelompokKegiatanEkonomiKlu }, { model: Cabang }],
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

const loginAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        nama: req.body.nama,
        [Op.or]: [
          {
            tipeUser: "MANAGER",
          },
          {
            tipeUser: "OWNER",
          },
        ],
      },
      include: [{ model: Cabang }],
    });
    if (!user) return next(createError(404, "User not found!"));

    if (req.body.password !== user.password) {
      return next(createError(400, "Nama atau Password Salah!"));
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
  loginAdmin,
};
