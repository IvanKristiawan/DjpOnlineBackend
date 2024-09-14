const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const KategoriKlu = require("../../models/KategoriKlu/KategoriKluModel.js");
const GolonganPokokKlu = require("../../models/GolonganPokokKlu/GolonganPokokKluModel.js");
const Cabang = require("../../models/Cabang/CabangModel.js");

const getGolonganPokokKlus = async (req, res) => {
  try {
    const golonganPokokKlus = await GolonganPokokKlu.findAll({
      order: [["kodeGolonganPokokKlu", "ASC"]],
      include: [{ model: KategoriKlu }, { model: Cabang }],
    });
    res.status(200).json(golonganPokokKlus);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getGolonganPokokKlusPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodeGolonganPokokKlu: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        namaGolonganPokokKlu: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$kategoriklu.kodeKategoriKlu$": {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$kategoriklu.namaKategoriKlu$": {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    {
      model: KategoriKlu,
      as: "kategoriklu",
    },
    { model: Cabang },
  ];

  const totalRows = await GolonganPokokKlu.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const golonganPokokKlus = await GolonganPokokKlu.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
      order: [["kodeGolonganPokokKlu", "ASC"]],
    });
    res.status(200).json({
      golonganPokokKlus,
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

const getGolonganPokokKluById = async (req, res) => {
  try {
    const golonganPokokKlu = await GolonganPokokKlu.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: KategoriKlu }, { model: Cabang }],
    });
    res.status(200).json(golonganPokokKlu);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveGolonganPokokKlu = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let kategoriKlus = await KategoriKlu.findOne({
      where: {
        kodeKategoriKlu: req.body.kodeKategoriKlu,
      },
    });

    const insertedGolonganPokokKlu = await GolonganPokokKlu.create(
      {
        ...req.body,
        kategoriKluId: kategoriKlus.id,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedGolonganPokokKlu);
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

const updateGolonganPokokKlu = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await GolonganPokokKlu.update(
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
        res.status(200).json({ message: "Golongan Pokok Klu Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Golongan Pokok Klu ${req.params.id} not found!` });
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

const deleteGolonganPokokKlu = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await GolonganPokokKlu.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Golongan Pokok Klu Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Golongan Pokok Klu ${req.params.id} not found!` });
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
  getGolonganPokokKlus,
  getGolonganPokokKlusPagination,
  getGolonganPokokKluById,
  saveGolonganPokokKlu,
  updateGolonganPokokKlu,
  deleteGolonganPokokKlu,
};
