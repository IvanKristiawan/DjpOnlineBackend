const { sequelize } = require("../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const User = require("../models/UserModel.js");
const HakAkses = require("../models/HakAkses/HakAksesModel.js");
const KewajibanPerpajakan = require("../models/KewajibanPerpajakan/KewajibanPerpajakanModel.js");
const KelompokKegiatanEkonomiKlu = require("../../Master/models/KelompokKegiatanEkonomiKlu/KelompokKegiatanEkonomiKluModel.js");
const Cabang = require("../../Master/models/Cabang/CabangModel.js");
const jwt = require("jsonwebtoken");

const updateUser = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    let findUser;
    findUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    let tempPassword;
    if (req.body.password) {
      tempPassword = req.body.password;
    } else {
      tempPassword = findUser.password;
    }

    let kelompokKegiatanEkonomiKlus = await KelompokKegiatanEkonomiKlu.findOne({
      where: {
        kodeKelompokKegiatanEkonomiKlu: req.body.kodeKelompokKegiatanEkonomiKlu,
      },
    });

    await User.update(
      {
        ...req.body,
        kelompokKegiatanEkonomiKluId: kelompokKegiatanEkonomiKlus.id,
        password: tempPassword,
        cabangId: req.body.cabangId,
        akses: JSON.stringify(req.body.akses),
      },
      {
        where: {
          id: req.params.id,
        },
        transaction,
      }
    );

    await HakAkses.update(
      { ...req.body.akses },
      {
        where: {
          userId: req.params.id,
        },
        transaction,
      }
    );

    await KewajibanPerpajakan.update(
      { ...req.body.kewajibanPerpajakan },
      {
        where: {
          userId: req.params.id,
        },
        transaction,
      }
    );

    findUser = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Cabang }],
    });

    const hakAkses = await HakAkses.findOne({
      where: {
        userId: req.params.id,
      },
    });

    const kewajibanPerpajakan = await KewajibanPerpajakan.findOne({
      where: {
        userId: req.params.id,
      },
    });

    const { ...otherDetails } = findUser.dataValues;

    await transaction.commit();
    res.status(200).json({
      ...otherDetails,
      akses: hakAkses,
      kewajibanPerpajakan,
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateUserPassword = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    let findUser;
    findUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (req.body.passwordLama === findUser.password) {
      await User.update(
        {
          password: req.body.password,
        },
        {
          where: {
            id: req.params.id,
          },
          transaction,
        }
      );

      await transaction.commit();
      res.status(200).json({ message: "User Updated!" });
    } else {
      if (transaction) {
        await transaction.rollback();
      }
      // Error 400 = Kesalahan dari sisi user
      res.status(400).json({ message: "Password lama berbeda!" });
    }
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateUserHakAkses = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    let findUser;
    findUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    await HakAkses.update(
      { ...req.body.akses },
      {
        where: {
          userId: req.params.id,
        },
        transaction,
      }
    );

    findUser = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Cabang }],
    });

    const hakAkses = await HakAkses.findOne({
      where: {
        userId: req.params.id,
      },
    });

    const kewajibanPerpajakan = await KewajibanPerpajakan.findOne({
      where: {
        userId: req.params.id,
      },
    });

    const { ...otherDetails } = findUser.dataValues;

    await transaction.commit();
    res.status(200).json({
      ...otherDetails,
      akses: hakAkses,
      kewajibanPerpajakan,
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateUserThenLogin = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const findUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    let tempPassword;
    if (req.body.password) {
      tempPassword = req.body.password;
    } else {
      tempPassword = findUser.password;
    }

    let kelompokKegiatanEkonomiKlus = await KelompokKegiatanEkonomiKlu.findOne({
      where: {
        kodeKelompokKegiatanEkonomiKlu: req.body.kodeKelompokKegiatanEkonomiKlu,
      },
    });

    await User.update(
      {
        ...req.body,
        kelompokKegiatanEkonomiKluId: kelompokKegiatanEkonomiKlus.id,
        password: tempPassword,
        cabangId: req.body.cabangId,
        akses: JSON.stringify(req.body.akses),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    await HakAkses.update(
      { ...req.body.akses },
      {
        where: {
          userId: req.params.id,
        },
        transaction,
      }
    );

    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: KelompokKegiatanEkonomiKlu }, { model: Cabang }],
    });

    const hakAkses = await HakAkses.findOne({
      where: {
        userId: req.params.id,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT, {
      expiresIn: "15d",
    });

    const { password, ...otherDetails } = user.dataValues;

    await transaction.commit();
    res.status(200).json({
      details: {
        ...otherDetails,
        token,
        akses: hakAkses,
      },
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await KewajibanPerpajakan.destroy({
      where: {
        userId: req.params.id,
      },
      transaction,
    });
    await HakAkses.destroy({
      where: {
        userId: req.params.id,
      },
      transaction,
    });
    await User.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "User Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({ message: `User ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: KelompokKegiatanEkonomiKlu }, { model: Cabang }],
    });
    const hakAkses = await HakAkses.findOne({
      where: {
        userId: req.params.id,
      },
    });
    const kewajibanPerpajakan = await KewajibanPerpajakan.findOne({
      where: {
        userId: user.dataValues.id,
      },
    });
    const { ...otherDetails } = user.dataValues;
    res.status(200).json({
      ...otherDetails,
      akses: hakAkses,
      kewajibanPerpajakan,
    });
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    let tempAllUser = [];
    const users = await User.findAll({
      include: [{ model: KelompokKegiatanEkonomiKlu }, { model: Cabang }],
    });

    for (let user of users) {
      let hakAkses = await HakAkses.findOne({
        where: {
          userId: user.dataValues.id,
        },
      });
      const { ...otherDetails } = user.dataValues;
      let objectUser = {
        ...otherDetails,
        akses: hakAkses,
      };
      tempAllUser.push(objectUser);
    }

    res.status(200).json(tempAllUser);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getUsersPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        nama: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        tipeUser: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$cabang.id$": {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$cabang.namaCabang$": {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: KelompokKegiatanEkonomiKlu },
    {
      model: Cabang,
      as: "cabang",
    },
  ];

  const totalRows = await User.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const users = await User.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
      order: [["cabangId", "ASC"]],
    });

    let tempAllUser = [];
    for (let user of users) {
      let hakAkses = await HakAkses.findOne({
        where: {
          userId: user.dataValues.id,
        },
      });
      const { ...otherDetails } = user.dataValues;
      let objectUser = {
        ...otherDetails,
        akses: hakAkses,
      };
      tempAllUser.push(objectUser);
    }

    res.status(200).json({
      users: tempAllUser,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getNama = async (req, res) => {
  try {
    let tempAllUser = [];
    const users = await User.findAll({
      where: {
        nama: req.body.nama,
      },
      include: [{ model: KelompokKegiatanEkonomiKlu }, { model: Cabang }],
    });

    for (let user of users) {
      let hakAkses = await HakAkses.findOne({
        where: {
          userId: user.dataValues.id,
        },
      });
      const { ...otherDetails } = user.dataValues;
      let objectUser = {
        ...otherDetails,
        akses: hakAkses,
      };
      tempAllUser.push(objectUser);
    }

    res.status(200).json(tempAllUser);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getUsersPerCabang = async (req, res) => {
  try {
    let tempAllUser = [];
    const users = await User.findAll({
      where: {
        cabangId: req.body.kodeCabang,
      },
      include: [{ model: KelompokKegiatanEkonomiKlu }, { model: Cabang }],
    });

    for (let user of users) {
      let hakAkses = await HakAkses.findOne({
        where: {
          userId: user.dataValues.id,
        },
      });
      const { ...otherDetails } = user.dataValues;
      let objectUser = {
        ...otherDetails,
        akses: hakAkses,
      };
      tempAllUser.push(objectUser);
    }

    res.status(200).json(tempAllUser);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getUsersPerCabangPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    cabangId: req.body.kodeCabang,
    [Op.or]: [
      {
        npwp15: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        nama: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        tipeUser: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$cabang.id$": {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$cabang.namaCabang$": {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: KelompokKegiatanEkonomiKlu },
    {
      model: Cabang,
      as: "cabang",
    },
  ];

  const totalRows = await User.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const users = await User.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
      order: [["cabangId", "ASC"]],
    });

    let tempAllUser = [];
    for (let user of users) {
      let hakAkses = await HakAkses.findOne({
        where: {
          userId: user.dataValues.id,
        },
      });
      const kewajibanPerpajakan = await KewajibanPerpajakan.findOne({
        where: {
          userId: user.dataValues.id,
        },
      });
      const { ...otherDetails } = user.dataValues;
      let objectUser = {
        ...otherDetails,
        akses: hakAkses,
        kewajibanPerpajakan,
      };
      tempAllUser.push(objectUser);
    }

    res.status(200).json({
      users: tempAllUser,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getUsersPerCabangExceptOwnerPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    cabangId: req.body.kodeCabang,
    tipeUser: {
      [Op.not]: "OWNER",
    },
    [Op.or]: [
      {
        nama: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        tipeUser: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$cabang.id$": {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$cabang.namaCabang$": {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: KelompokKegiatanEkonomiKlu },
    {
      model: Cabang,
      as: "cabang",
    },
  ];

  const totalRows = await User.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const users = await User.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
      order: [["cabangId", "ASC"]],
    });

    let tempAllUser = [];
    for (let user of users) {
      let hakAkses = await HakAkses.findOne({
        where: {
          userId: user.dataValues.id,
        },
      });
      const { ...otherDetails } = user.dataValues;
      let objectUser = {
        ...otherDetails,
        akses: hakAkses,
      };
      tempAllUser.push(objectUser);
    }

    res.status(200).json({
      users: tempAllUser,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateUser,
  updateUserPassword,
  updateUserHakAkses,
  updateUserThenLogin,
  deleteUser,
  getUser,
  getUsers,
  getUsersPagination,
  getNama,
  getUsersPerCabang,
  getUsersPerCabangPagination,
  getUsersPerCabangExceptOwnerPagination,
};
