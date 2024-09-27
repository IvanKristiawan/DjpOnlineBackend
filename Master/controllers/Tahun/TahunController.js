const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const Tahun = require("../../models/Tahun/TahunModel.js");
const Cabang = require("../../models/Cabang/CabangModel.js");
const { findNextKode } = require("../../../helper/helper");

const getTahuns = async (req, res) => {
  try {
    const tahuns = await Tahun.findAll({
      order: [["tahun", "DESC"]],
      include: [{ model: Cabang }],
    });
    res.status(200).json(tahuns);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getTahunsPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        tahun: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };

  const totalRows = await Tahun.count({
    where: tempWhere,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const tahuns = await Tahun.findAll({
      where: tempWhere,
      include: [{ model: Cabang }],
      offset: offset,
      limit: limit,
      order: [["tahun", "ASC"]],
    });
    res.status(200).json({
      tahuns,
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

const getTahunNextKode = async (req, res) => {
  try {
    const tahuns = await Tahun.findAll({
      attributes: ["tahun"],
    });

    let tempMaxTahun = 0;

    for (let tahun of tahuns) {
      let tempTahun = parseInt(tahun.tahun);

      if (tempTahun > tempMaxTahun) {
        tempMaxTahun = tempTahun;
      }
    }

    let nextTahun = findNextKode(tempMaxTahun, 4);
    res.status(200).json(nextTahun);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getTahunById = async (req, res) => {
  try {
    const tahun = await Tahun.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Cabang }],
    });
    res.status(200).json(tahun);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveTahun = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();
    const insertedTahun = await Tahun.create(
      {
        ...req.body,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedTahun);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateTahun = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await Tahun.update(
      { ...req.body, cabangId: req.body.kodeCabang },
      {
        where: {
          id: req.params.id,
        },
        transaction,
      }
    ).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Tahun Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({ message: `Tahun ${req.params.id} not found!` });
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

const deleteTahun = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await Tahun.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Tahun Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({ message: `Tahun ${req.params.id} not found!` });
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

module.exports = {
  getTahuns,
  getTahunsPagination,
  getTahunNextKode,
  getTahunById,
  saveTahun,
  updateTahun,
  deleteTahun,
};
