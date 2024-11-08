const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const Ptkp = require("../../models/Ptkp/PtkpModel.js");
const Cabang = require("../../models/Cabang/CabangModel.js");
const { findNextKode } = require("../../../helper/helper.js");

const getPtkps = async (req, res) => {
  try {
    const ptkps = await Ptkp.findAll({
      order: [["kodePtkp", "ASC"]],
      include: [{ model: Cabang }],
    });
    res.status(200).json(ptkps);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getPtkpsBupot = async (req, res) => {
  try {
    const ptkps = await Ptkp.findAll({
      where: {
        untukBupotUnifikasi: req.body.untukBupotUnifikasi,
      },
      order: [["kodePtkp", "ASC"]],
      include: [{ model: Cabang }],
    });
    res.status(200).json(ptkps);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getPtkpsPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodePtkp: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        namaPtkp: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [{ model: Cabang }];

  const totalRows = await Ptkp.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const ptkps = await Ptkp.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
      order: [["kodePtkp", "ASC"]],
    });
    res.status(200).json({
      ptkps,
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

const getPtkpByKode = async (req, res) => {
  try {
    const ptkp = await Ptkp.findOne({
      where: {
        kodePtkp: req.body.kodePtkp,
      },
      include: [{ model: Cabang }],
    });
    res.status(200).json(ptkp);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getPtkpByNama = async (req, res) => {
  try {
    const ptkp = await Ptkp.findOne({
      where: {
        namaPtkp: req.body.namaPtkp,
      },
      include: [{ model: Cabang }],
    });
    res.status(200).json(ptkp);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getPtkpById = async (req, res) => {
  try {
    const ptkp = await Ptkp.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Cabang }],
    });
    res.status(200).json(ptkp);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const savePtkp = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const insertedPtkp = await Ptkp.create(
      {
        ...req.body,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedPtkp);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    let errorMessage = error.message;
    if (error.errors[0].message) {
      errorMessage = error.errors[0].message;
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: errorMessage });
  }
};

const updatePtkp = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    await Ptkp.update(
      {
        ...req.body,
        cabangId: req.body.kodeCabang,
      },
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
        res.status(200).json({ message: "Ptkp Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({ message: `Ptkp ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    let errorMessage = error.message;
    if (error.errors[0].message) {
      errorMessage = error.errors[0].message;
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: errorMessage });
  }
};

const deletePtkp = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await Ptkp.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Ptkp Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({ message: `Ptkp ${req.params.id} not found!` });
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
  getPtkps,
  getPtkpsBupot,
  getPtkpsPagination,
  getPtkpByKode,
  getPtkpByNama,
  getPtkpById,
  savePtkp,
  updatePtkp,
  deletePtkp,
};
