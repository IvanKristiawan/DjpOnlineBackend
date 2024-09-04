const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const Cabang = require("../../models/Cabang/CabangModel.js");
const Setting = require("../../../Setting/models/SettingModel.js");
const { findNextKode } = require("../../../helper/helper");

const getCabangs = async (req, res) => {
  try {
    const cabangs = await Cabang.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json(cabangs);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getCabangsPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        id: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        namaCabang: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        alamatCabang: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        teleponCabang: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        picCabang: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };

  const totalRows = await Cabang.count({
    where: tempWhere,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const cabangs = await Cabang.findAll({
      where: tempWhere,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      cabangs,
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

const getCabangNextKode = async (req, res) => {
  try {
    const cabangs = await Cabang.findAll();
    let nextKodeCabang = findNextKode(cabangs.length, 3);
    res.status(200).json(nextKodeCabang);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getCabangById = async (req, res) => {
  try {
    const cabang = await Cabang.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(cabang);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveCabang = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  const cabangs = await Cabang.findAll();
  let nextKodeCabang = findNextKode(cabangs.length, 3);
  try {
    transaction = await sequelize.transaction();
    const insertedCabang = await Cabang.create(
      {
        id: nextKodeCabang,
        ...req.body,
      },
      { transaction }
    );
    const findSampleSetting = await Setting.findOne({});
    const { id, ...otherDetails } = findSampleSetting.dataValues;

    const settings = await Setting.findAll({
      where: {
        cabangId: nextKodeCabang,
      },
    });
    if (settings.length === 0) {
      const insertedSetting = await Setting.create(
        {
          ...otherDetails,
          cabangId: nextKodeCabang,
        },
        { transaction }
      );
    }
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedCabang);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateCabang = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await Cabang.update(req.body, {
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Cabang Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({ message: `Cabang ${req.params.id} not found!` });
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

const deleteCabang = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await Setting.destroy({
      where: {
        cabangId: req.params.id,
      },
      transaction,
    });

    await Cabang.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });
    await transaction.commit();
    res.status(200).json({ message: "Cabang Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getCabangs,
  getCabangsPagination,
  getCabangNextKode,
  getCabangById,
  saveCabang,
  updateCabang,
  deleteCabang,
};
