const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const Ptkp = require("../../models/Ptkp/PtkpModel.js");
const Ter = require("../../models/Ter/TerModel.js");
const Cabang = require("../../models/Cabang/CabangModel.js");

const getTers = async (req, res) => {
  try {
    const ters = await Ter.findAll({
      order: [["kodeTer", "ASC"]],
      include: [{ model: Ptkp }, { model: Cabang }],
    });
    res.status(200).json(ters);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getTersBupot = async (req, res) => {
  try {
    const ters = await Ter.findAll({
      where: {
        untukBupotUnifikasi: req.body.untukBupotUnifikasi,
      },
      order: [["kodeTer", "ASC"]],
      include: [{ model: Ptkp }, { model: Cabang }],
    });
    res.status(200).json(ters);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getTerNextKode = async (req, res) => {
  try {
    let maxTers = await Ter.findOne({
      where: {},
      include: [
        {
          model: Ptkp,
          as: "jenissetoran",
          attributes: ["kodePtkp", "namaPtkp"],
        },
      ],
      order: [
        ["kodeTer", "DESC"], // Order by 'kodeTer' in descending order to get the max value
      ],
    });

    let lastKodeTer = 0;
    if (maxTers) {
      lastKodeTer = maxTers.kodeTer.slice(-2);
    }

    let nextKodeTer = findNextKode(parseInt(lastKodeTer), 5);

    let createNewTer = `${nextKodeTer}`;

    res.status(200).json(createNewTer);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getTersByPtkp = async (req, res) => {
  try {
    const ters = await Ter.findAll({
      where: {
        ptkpId: req.body.ptkpId,
      },
      order: [["kodeTer", "ASC"]],
      include: [{ model: Ptkp }, { model: Cabang }],
    });
    res.status(200).json(ters);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getTersPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodeTer: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [{ model: Ptkp }, { model: Cabang }];

  const totalRows = await Ter.count({
    where: tempWhere,
    include: tempInclude,
    order: [["kodeTer", "ASC"]],
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const ters = await Ter.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
      order: [["kodeTer", "ASC"]],
    });
    res.status(200).json({
      ters,
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

const getTerTarifByJumlahPenghasilan = async (req, res) => {
  try {
    const ptkp = await Ptkp.findOne({
      where: {
        namaPtkp: req.body.namaPtkp,
      },
      include: [{ model: Cabang }],
    });

    let tempTer = {
      ptkpId: ptkp.id,
      [Op.and]: [
        {
          jumlahPenghasilanMin: {
            [Op.lte]: req.body.jumlahPenghasilan,
          },
        },
        {
          jumlahPenghasilanMax: {
            [Op.gte]: req.body.jumlahPenghasilan,
          },
        },
      ],
    };

    const ter = await Ter.findOne({
      where: tempTer,
      include: [
        {
          model: Ptkp,
        },
        { model: Cabang },
      ],
    });
    res.status(200).json(ter);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getTerByKode = async (req, res) => {
  try {
    const ter = await Ter.findOne({
      where: {
        kodeTer: req.body.kodeTer,
      },
      include: [
        {
          model: Ptkp,
        },
        { model: Cabang },
      ],
    });
    res.status(200).json(ter);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getTerById = async (req, res) => {
  try {
    const ter = await Ter.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Ptkp,
        },
        { model: Cabang },
      ],
    });
    res.status(200).json(ter);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveTer = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let ptkps = await Ptkp.findOne({
      where: {
        kodePtkp: req.body.kodePtkp,
      },
      include: [],
    });

    let maxTers = await Ter.findOne({
      where: {},
      include: [
        {
          model: Ptkp,
          as: "jenissetoran",
          attributes: ["kodePtkp", "namaPtkp"],
        },
      ],
      order: [
        ["kodeTer", "DESC"], // Order by 'kodeTer' in descending order to get the max value
      ],
    });

    let lastKodeTer = 0;
    if (maxTers) {
      lastKodeTer = maxTers.kodeTer.slice(-2);
    }

    let nextKodeTer = findNextKode(parseInt(lastKodeTer), 5);

    const insertedTer = await Ter.create(
      {
        ...req.body,
        kodeTer: nextKodeTer,
        ptkpId: ptkps.id,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedTer);
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

const updateTer = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    await Ter.update(
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
        res.status(200).json({ message: "Ter Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({ message: `Ter ${req.params.id} not found!` });
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

const deleteTer = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await Ter.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Ter Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({ message: `Ter ${req.params.id} not found!` });
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
  getTers,
  getTersBupot,
  getTerNextKode,
  getTersByPtkp,
  getTersPagination,
  getTerTarifByJumlahPenghasilan,
  getTerByKode,
  getTerById,
  saveTer,
  updateTer,
  deleteTer,
};
