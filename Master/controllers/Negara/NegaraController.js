const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const Negara = require("../../models/Negara/NegaraModel.js");
const Cabang = require("../../models/Cabang/CabangModel.js");

const getNegaras = async (req, res) => {
  try {
    const negaras = await Negara.findAll({
      order: [["kodeNegara", "ASC"]],
      include: [{ model: Cabang }],
    });
    res.status(200).json(negaras);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getNegarasPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodeNegara: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        namaNegara: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };

  const totalRows = await Negara.count({
    where: tempWhere,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const negaras = await Negara.findAll({
      where: tempWhere,
      include: [{ model: Cabang }],
      offset: offset,
      limit: limit,
      order: [["kodeNegara", "ASC"]],
    });
    res.status(200).json({
      negaras,
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

const getNegaraById = async (req, res) => {
  try {
    const negara = await Negara.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Cabang }],
    });
    res.status(200).json(negara);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveNegara = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();
    const insertedNegara = await Negara.create(
      {
        ...req.body,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedNegara);
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

const updateNegara = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await Negara.update(
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
        res.status(200).json({ message: "Negara Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({ message: `Negara ${req.params.id} not found!` });
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

const deleteNegara = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await Negara.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Negara Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({ message: `Negara ${req.params.id} not found!` });
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
  getNegaras,
  getNegarasPagination,
  getNegaraById,
  saveNegara,
  updateNegara,
  deleteNegara,
};
