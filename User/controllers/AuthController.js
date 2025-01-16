const { sequelize } = require("../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const User = require("../models/UserModel.js");
const HakAkses = require("../models/HakAkses/HakAksesModel.js");
const KewajibanPerpajakan = require("../models/KewajibanPerpajakan/KewajibanPerpajakanModel.js");
const KelompokKegiatanEkonomiKlu = require("../../Master/models/KelompokKegiatanEkonomiKlu/KelompokKegiatanEkonomiKluModel.js");
const Cabang = require("../../Master/models/Cabang/CabangModel.js");
const { createError } = require("../../utils/error.js");
const jwt = require("jsonwebtoken");
const {
  generateRandomNumberString,
  getRandomIndonesianLocation,
  getRandomIndonesianName,
} = require("../../helper/helper.js");

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

const saveUserData = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const { User: dataUser } = req.body.jsonData;

    // console.log(dataUser);

    for (let data of dataUser) {
      let tempData = {
        nama: data.nama.toUpperCase(),
      };

      let isUnique = false;
      while (!isUnique) {
        // Generate a random number string
        makeNpwp = generateRandomNumberString(15);

        // Check if the generated number already exists in the database
        const existingUsers = await User.findOne(
          {
            where: {
              npwp15: makeNpwp, // Compare with generated npwp
            },
          },
          { transaction }
        );

        // If no users are found, the value is unique
        if (!existingUsers) {
          isUnique = true;
        }
      }
      let npwp15 = makeNpwp;
      let nikNpwp16 = `0${makeNpwp}`;
      let nitku = `0${makeNpwp}000000`;

      tempData["npwp15"] = npwp15;
      tempData["nikNpwp16"] = nikNpwp16;
      tempData["nitku"] = nitku;

      let kelompokKegiatanEkonomiKlus =
        await KelompokKegiatanEkonomiKlu.findOne({});
      tempData["kelompokKegiatanEkonomiKluId"] = kelompokKegiatanEkonomiKlus.id;

      tempData["password"] = generateRandomNumberString(10);
      tempData["cabangId"] = req.body.cabangId;
      tempData["bentukBadan"] = "PERSEROAN KOMANDITER";

      tempData["alamat"] = getRandomIndonesianLocation();
      tempData["nomorTelepon"] = generateRandomNumberString(10);
      tempData["email"] = `${getRandomIndonesianName()}@GMAIL.COM`;
      tempData["kppAdministrasi"] = "KPP PRATAMA SLEMAN";
      tempData["noTeleponKpp"] = "(0274) 91284921";
      tempData["accountRepresentative"] = data.nama.toUpperCase();
      tempData["statusWp"] = "AKTIF";
      tempData["statusPkp"] = "NON PKP";
      tempData["namaPenanggungJawab"] = data.nama.toUpperCase();
      tempData["nikPenanggungJawab"] = generateRandomNumberString(16);
      tempData["npwpPenanggungJawab"] = "92.453.192.7-438.823";
      tempData["jabatanPenanggungJawab"] = "STAFF";
      tempData["kebangsaanPenanggungJawab"] = "WNI";
      tempData["alamatPjBadanPenanggungJawab"] = "JL. DAMON 1";
      tempData["nomorAkta"] = "19";
      tempData["tempatAkta"] = "YOGYAKARTA";
      tempData["namaNotaris"] = "ASRI INTI";
      tempData["nomorAktaPerubahan"] = "-";
      tempData["passphrase"] = "PASSPHRASE";
      tempData["tipeUser"] = "ADMIN";

      // Hak Akses Data
      tempData["akses"] = {
        kategoriKlu: true,
        golonganPokokKlu: true,
        golonganKlu: true,
        subGolonganKlu: true,
        kelompokKegiatanEkonomiKlu: true,
        jenisPajak: true,
        jenisSetoran: true,
        objekPajak: true,
        ptkp: true,
        ter: true,
        jenisObjekPajak: true,
        pkp: true,
        tarifPph21PP68Tahun2009: true,
        tarifPph21PP149Tahun2000: true,
        negara: true,
        tahun: true,
        cabang: true,
        profilUser: true,
        daftarUser: true,
        setting: true,
      };

      // Kewajiban Perpajakan Data
      tempData["kewajibanPerpajakan"] = {
        pphPasal25: true,
        pphPasal29: true,
        pphFinal: true,
        pphPasal4Ayat2: true,
        pphPasal15: true,
        pphPasal19: true,
        pphPasal21: true,
        pphPasal23: true,
        pphPasal26: true,
      };

      // console.log(tempData);

      const newUser = await User.create(
        {
          ...tempData,
        },
        { transaction }
      );

      const insertedHakAkses = await HakAkses.create(
        {
          ...tempData.akses,
          userId: newUser.dataValues.id,
        },
        { transaction }
      );

      const insertedKewajibanPerpajakan = await KewajibanPerpajakan.create(
        {
          ...tempData.kewajibanPerpajakan,
          userId: newUser.dataValues.id,
        },
        { transaction }
      );
    }

    await transaction.commit();
    res.status(200).send("Finish Impor User!");
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  loginAdmin,
  saveUserData,
};
