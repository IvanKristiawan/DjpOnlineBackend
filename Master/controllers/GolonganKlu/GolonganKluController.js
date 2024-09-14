const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const GolonganPokokKlu = require("../../models/GolonganPokokKlu/GolonganPokokKluModel.js");
const GolonganKlu = require("../../models/GolonganKlu/GolonganKluModel.js");
const Cabang = require("../../models/Cabang/CabangModel.js");

const getGolonganKlus = async (req, res) => {
  try {
    const golonganKlus = await GolonganKlu.findAll({
      order: [["kodeGolonganKlu", "ASC"]],
      include: [{ model: GolonganPokokKlu }, { model: Cabang }],
    });
    res.status(200).json(golonganKlus);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getGolonganKlusPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodeGolonganKlu: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        namaGolonganKlu: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$golonganpokokklu.kodeGolonganPokokKlu$": {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$golonganpokokklu.namaGolonganPokokKlu$": {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    {
      model: GolonganPokokKlu,
      as: "golonganpokokklu",
    },
    { model: Cabang },
  ];

  const totalRows = await GolonganKlu.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const golonganKlus = await GolonganKlu.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
      order: [["kodeGolonganKlu", "ASC"]],
    });
    res.status(200).json({
      golonganKlus,
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

const getGolonganKluById = async (req, res) => {
  try {
    const golonganKlu = await GolonganKlu.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: GolonganPokokKlu }, { model: Cabang }],
    });
    res.status(200).json(golonganKlu);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveGolonganKlu = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let golonganPokokKlus = await GolonganPokokKlu.findOne({
      where: {
        kodeGolonganPokokKlu: req.body.kodeGolonganPokokKlu,
      },
    });

    const insertedGolonganKlu = await GolonganKlu.create(
      {
        ...req.body,
        golonganPokokKluId: golonganPokokKlus.id,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedGolonganKlu);
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

const updateGolonganKlu = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await GolonganKlu.update(
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
        res.status(200).json({ message: "Golongan Klu Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Golongan Klu ${req.params.id} not found!` });
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

const deleteGolonganKlu = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await GolonganKlu.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Golongan Klu Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Golongan Klu ${req.params.id} not found!` });
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
  getGolonganKlus,
  getGolonganKlusPagination,
  getGolonganKluById,
  saveGolonganKlu,
  updateGolonganKlu,
  deleteGolonganKlu,
};
