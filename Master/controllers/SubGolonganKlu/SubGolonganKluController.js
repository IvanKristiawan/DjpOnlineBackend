const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const GolonganKlu = require("../../models/GolonganKlu/GolonganKluModel.js");
const SubGolonganKlu = require("../../models/SubGolonganKlu/SubGolonganKluModel.js");
const Cabang = require("../../models/Cabang/CabangModel.js");

const getSubGolonganKlus = async (req, res) => {
  try {
    const subGolonganKlus = await SubGolonganKlu.findAll({
      order: [["kodeSubGolonganKlu", "ASC"]],
      include: [{ model: GolonganKlu }, { model: Cabang }],
    });
    res.status(200).json(subGolonganKlus);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getSubGolonganKlusPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodeSubGolonganKlu: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        namaSubGolonganKlu: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$golonganklu.kodeGolonganKlu$": {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$golonganklu.namaGolonganKlu$": {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    {
      model: GolonganKlu,
      as: "golonganklu",
    },
    { model: Cabang },
  ];

  const totalRows = await SubGolonganKlu.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const subGolonganKlus = await SubGolonganKlu.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
      order: [["kodeSubGolonganKlu", "ASC"]],
    });
    res.status(200).json({
      subGolonganKlus,
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

const getSubGolonganKluById = async (req, res) => {
  try {
    const subGolonganKlu = await SubGolonganKlu.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: GolonganKlu }, { model: Cabang }],
    });
    res.status(200).json(subGolonganKlu);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveSubGolonganKlu = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let golonganKlus = await GolonganKlu.findOne({
      where: {
        kodeGolonganKlu: req.body.kodeGolonganKlu,
      },
    });

    const insertedSubGolonganKlu = await SubGolonganKlu.create(
      {
        ...req.body,
        golonganKluId: golonganKlus.id,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedSubGolonganKlu);
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

const updateSubGolonganKlu = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await SubGolonganKlu.update(
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
        res.status(200).json({ message: "Sub Golongan Klu Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Sub Golongan Klu ${req.params.id} not found!` });
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

const deleteSubGolonganKlu = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await SubGolonganKlu.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Sub Golongan Klu Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Sub Golongan Klu ${req.params.id} not found!` });
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
  getSubGolonganKlus,
  getSubGolonganKlusPagination,
  getSubGolonganKluById,
  saveSubGolonganKlu,
  updateSubGolonganKlu,
  deleteSubGolonganKlu,
};
