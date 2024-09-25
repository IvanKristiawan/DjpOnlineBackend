const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const JenisPajak = require("../../models/JenisPajak/JenisPajakModel.js");
const Cabang = require("../../models/Cabang/CabangModel.js");

const getJenisPajaks = async (req, res) => {
  try {
    const jenisPajaks = await JenisPajak.findAll({
      order: [["kodeJenisPajak", "ASC"]],
      include: [{ model: Cabang }],
    });
    res.status(200).json(jenisPajaks);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getJenisPajaksPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodeJenisPajak: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        namaJenisPajak: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };

  const totalRows = await JenisPajak.count({
    where: tempWhere,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const jenisPajaks = await JenisPajak.findAll({
      where: tempWhere,
      include: [{ model: Cabang }],
      offset: offset,
      limit: limit,
      order: [["kodeJenisPajak", "ASC"]],
    });
    res.status(200).json({
      jenisPajaks,
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

const getJenisPajakById = async (req, res) => {
  try {
    const jenisPajak = await JenisPajak.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Cabang }],
    });
    res.status(200).json(jenisPajak);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveJenisPajak = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();
    const insertedJenisPajak = await JenisPajak.create(
      {
        ...req.body,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedJenisPajak);
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

const updateJenisPajak = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await JenisPajak.update(
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
        res.status(200).json({ message: "Jenis Pajak Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Jenis Pajak ${req.params.id} not found!` });
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

const deleteJenisPajak = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await JenisPajak.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Jenis Pajak Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Jenis Pajak ${req.params.id} not found!` });
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
  getJenisPajaks,
  getJenisPajaksPagination,
  getJenisPajakById,
  saveJenisPajak,
  updateJenisPajak,
  deleteJenisPajak,
};
