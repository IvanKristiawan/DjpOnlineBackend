const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const SubGolonganKlu = require("../../models/SubGolonganKlu/SubGolonganKluModel.js");
const KelompokKegiatanEkonomiKlu = require("../../models/KelompokKegiatanEkonomiKlu/KelompokKegiatanEkonomiKluModel.js");
const Cabang = require("../../models/Cabang/CabangModel.js");

const getKelompokKegiatanEkonomiKlus = async (req, res) => {
  try {
    const kelompokKegiatanEkonomiKlus =
      await KelompokKegiatanEkonomiKlu.findAll({
        order: [["kodeKelompokKegiatanEkonomiKlu", "ASC"]],
        include: [{ model: SubGolonganKlu }, { model: Cabang }],
      });
    res.status(200).json(kelompokKegiatanEkonomiKlus);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getKelompokKegiatanEkonomiKlusPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodeKelompokKegiatanEkonomiKlu: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        namaKelompokKegiatanEkonomiKlu: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$subgolonganklu.kodeSubGolonganKlu$": {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$subgolonganklu.namaSubGolonganKlu$": {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    {
      model: SubGolonganKlu,
      as: "subgolonganklu",
    },
    { model: Cabang },
  ];

  const totalRows = await KelompokKegiatanEkonomiKlu.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const kelompokKegiatanEkonomiKlus =
      await KelompokKegiatanEkonomiKlu.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
        order: [["kodeKelompokKegiatanEkonomiKlu", "ASC"]],
      });
    res.status(200).json({
      kelompokKegiatanEkonomiKlus,
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

const getKelompokKegiatanEkonomiKluById = async (req, res) => {
  try {
    const kelompokKegiatanEkonomiKlu = await KelompokKegiatanEkonomiKlu.findOne(
      {
        where: {
          id: req.params.id,
        },
        include: [{ model: SubGolonganKlu }, { model: Cabang }],
      }
    );
    res.status(200).json(kelompokKegiatanEkonomiKlu);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveKelompokKegiatanEkonomiKlu = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let subGolonganKlus = await SubGolonganKlu.findOne({
      where: {
        kodeSubGolonganKlu: req.body.kodeSubGolonganKlu,
      },
    });

    const insertedKelompokKegiatanEkonomiKlu =
      await KelompokKegiatanEkonomiKlu.create(
        {
          ...req.body,
          subGolonganKluId: subGolonganKlus.id,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedKelompokKegiatanEkonomiKlu);
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

const updateKelompokKegiatanEkonomiKlu = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await KelompokKegiatanEkonomiKlu.update(
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
        res
          .status(200)
          .json({ message: "Kelompok Kegiatan Ekonomi Klu Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `Kelompok Kegiatan Ekonomi Klu ${req.params.id} not found!`,
        });
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

const deleteKelompokKegiatanEkonomiKlu = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await KelompokKegiatanEkonomiKlu.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res
          .status(200)
          .json({ message: "Kelompok Kegiatan Ekonomi Klu Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `Kelompok Kegiatan Ekonomi Klu ${req.params.id} not found!`,
        });
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
  getKelompokKegiatanEkonomiKlus,
  getKelompokKegiatanEkonomiKlusPagination,
  getKelompokKegiatanEkonomiKluById,
  saveKelompokKegiatanEkonomiKlu,
  updateKelompokKegiatanEkonomiKlu,
  deleteKelompokKegiatanEkonomiKlu,
};
