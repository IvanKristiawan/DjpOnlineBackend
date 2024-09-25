const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const JenisPajak = require("../../models/JenisPajak/JenisPajakModel.js");
const JenisSetoran = require("../../models/JenisSetoran/JenisSetoranModel.js");
const Cabang = require("../../models/Cabang/CabangModel.js");

const getJenisSetorans = async (req, res) => {
  try {
    const jenisSetorans = await JenisSetoran.findAll({
      order: [["kodeJenisSetoran", "ASC"]],
      include: [{ model: JenisPajak }, { model: Cabang }],
    });
    res.status(200).json(jenisSetorans);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getJenisSetoransPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodeJenisSetoran: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        namaJenisSetoran: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$jenispajak.kodeJenisPajak$": {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$jenispajak.namaJenisPajak$": {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    {
      model: JenisPajak,
      as: "jenispajak",
    },
    { model: Cabang },
  ];

  const totalRows = await JenisSetoran.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const jenisSetorans = await JenisSetoran.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
      order: [["kodeJenisSetoran", "ASC"]],
    });
    res.status(200).json({
      jenisSetorans,
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

const getJenisSetoranById = async (req, res) => {
  try {
    const jenisSetoran = await JenisSetoran.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: JenisPajak }, { model: Cabang }],
    });
    res.status(200).json(jenisSetoran);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveJenisSetoran = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let jenisPajaks = await JenisPajak.findOne({
      where: {
        kodeJenisPajak: req.body.kodeJenisPajak,
      },
    });

    const insertedJenisSetoran = await JenisSetoran.create(
      {
        ...req.body,
        jenisPajakId: jenisPajaks.id,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedJenisSetoran);
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

const updateJenisSetoran = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    let jenisPajaks = await JenisPajak.findOne({
      where: {
        kodeJenisPajak: req.body.kodeJenisPajak,
      },
    });

    await JenisSetoran.update(
      {
        ...req.body,
        jenisPajakId: jenisPajaks.id,
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
        res.status(200).json({ message: "Jenis Setoran Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Jenis Setoran ${req.params.id} not found!` });
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

const deleteJenisSetoran = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await JenisSetoran.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Jenis Setoran Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Jenis Setoran ${req.params.id} not found!` });
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
  getJenisSetorans,
  getJenisSetoransPagination,
  getJenisSetoranById,
  saveJenisSetoran,
  updateJenisSetoran,
  deleteJenisSetoran,
};
