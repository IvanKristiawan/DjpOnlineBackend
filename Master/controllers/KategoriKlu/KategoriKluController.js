const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const KategoriKlu = require("../../models/KategoriKlu/KategoriKluModel.js");
const Cabang = require("../../models/Cabang/CabangModel.js");

const getKategoriKlus = async (req, res) => {
  try {
    const kategoriKlus = await KategoriKlu.findAll({
      order: [["kodeKategoriKlu", "ASC"]],
      include: [{ model: Cabang }],
    });
    res.status(200).json(kategoriKlus);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getKategoriKlusPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodeKategoriKlu: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        namaKategoriKlu: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };

  const totalRows = await KategoriKlu.count({
    where: tempWhere,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const kategoriKlus = await KategoriKlu.findAll({
      where: tempWhere,
      include: [{ model: Cabang }],
      offset: offset,
      limit: limit,
      order: [["kodeKategoriKlu", "ASC"]],
    });
    res.status(200).json({
      kategoriKlus,
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

const getKategoriKluById = async (req, res) => {
  try {
    const kategoriKlu = await KategoriKlu.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Cabang }],
    });
    res.status(200).json(kategoriKlu);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveKategoriKlu = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();
    const insertedKategoriKlu = await KategoriKlu.create(
      {
        ...req.body,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedKategoriKlu);
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

const updateKategoriKlu = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await KategoriKlu.update(
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
        res.status(200).json({ message: "Kategori Klu Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Kategori Klu ${req.params.id} not found!` });
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

const deleteKategoriKlu = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await KategoriKlu.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Kategori Klu Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Kategori Klu ${req.params.id} not found!` });
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
  getKategoriKlus,
  getKategoriKlusPagination,
  getKategoriKluById,
  saveKategoriKlu,
  updateKategoriKlu,
  deleteKategoriKlu,
};
