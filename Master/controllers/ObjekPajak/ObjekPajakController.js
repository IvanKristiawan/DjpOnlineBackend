const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const JenisSetoran = require("../../models/JenisSetoran/JenisSetoranModel.js");
const ObjekPajak = require("../../models/ObjekPajak/ObjekPajakModel.js");
const Cabang = require("../../models/Cabang/CabangModel.js");
const JenisPajak = require("../../models/JenisPajak/JenisPajakModel.js");

const getObjekPajaks = async (req, res) => {
  try {
    const objekPajaks = await ObjekPajak.findAll({
      order: [["kodeObjekPajak", "ASC"]],
      include: [
        {
          model: JenisSetoran,
          include: {
            model: JenisPajak,
          },
        },
        { model: Cabang },
      ],
    });
    res.status(200).json(objekPajaks);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getObjekPajaksBupot = async (req, res) => {
  try {
    const objekPajaks = await ObjekPajak.findAll({
      where: {
        untukBupotUnifikasi: req.body.untukBupotUnifikasi,
      },
      order: [["kodeObjekPajak", "ASC"]],
      include: [{ model: JenisSetoran }, { model: Cabang }],
    });
    res.status(200).json(objekPajaks);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getObjekPajaksBupot2126 = async (req, res) => {
  try {
    const objekPajaks = await ObjekPajak.findAll({
      where: {
        untukBupot2126: req.body.untukBupot2126,
        isActiveBupot2126: req.body.isActiveBupot2126,
      },
      order: [["kodeObjekPajak", "ASC"]],
      include: [{ model: JenisSetoran }, { model: Cabang }],
    });
    res.status(200).json(objekPajaks);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getObjekPajakNextKode = async (req, res) => {
  try {
    let maxObjekPajaks = await ObjekPajak.findOne({
      where: {
        "$jenissetoran.jenispajak.kodeJenisPajak$": req.body.kodeJenisPajak,
        "$jenissetoran.kodeJenisSetoran$": req.body.kodeJenisSetoran,
      },
      include: [
        {
          model: JenisSetoran,
          as: "jenissetoran",
          attributes: ["kodeJenisSetoran", "namaJenisSetoran"],
          include: [
            {
              model: JenisPajak,
              as: "jenispajak",
            },
          ],
        },
      ],
      order: [
        ["kodeObjekPajak", "DESC"], // Order by 'kodeObjekPajak' in descending order to get the max value
      ],
    });

    let lastKodeObjekPajak = 0;
    if (maxObjekPajaks) {
      lastKodeObjekPajak = maxObjekPajaks.kodeObjekPajak.slice(-2);
    }

    let nextKodeObjekPajak = findNextKode(parseInt(lastKodeObjekPajak), 2);

    let createNewObjekPajak = `${req.body.kodeJenisPajak.slice(-2)}-${
      req.body.kodeJenisSetoran
    }-${nextKodeObjekPajak}`;

    res.status(200).json(createNewObjekPajak);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getObjekPajaksByJenisSetoran = async (req, res) => {
  try {
    const objekPajaks = await ObjekPajak.findAll({
      where: {
        jenisSetoranId: req.body.jenisSetoranId,
      },
      order: [["kodeObjekPajak", "ASC"]],
      include: [{ model: JenisSetoran }, { model: Cabang }],
    });
    res.status(200).json(objekPajaks);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getObjekPajaksPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodeObjekPajak: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        namaObjekPajak: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$jenissetoran.kodeJenisSetoran$": {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$jenissetoran.namaJenisSetoran$": {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$jenissetoran.jenispajak.kodeJenisPajak$": {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        "$jenissetoran.jenispajak.namaJenisPajak$": {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    {
      model: JenisSetoran,
      as: "jenissetoran",
      attributes: ["kodeJenisSetoran", "namaJenisSetoran"],
      include: [
        {
          model: JenisPajak,
          as: "jenispajak",
        },
      ],
    },
    { model: Cabang },
  ];

  const totalRows = await ObjekPajak.count({
    where: tempWhere,
    include: tempInclude,
    order: [
      [JenisSetoran, "kodeJenisSetoran", "ASC"],
      ["kodeObjekPajak", "ASC"],
    ],
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const objekPajaks = await ObjekPajak.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
      order: [
        [JenisSetoran, "kodeJenisSetoran", "ASC"],
        ["kodeObjekPajak", "ASC"],
      ],
    });
    res.status(200).json({
      objekPajaks,
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

const getObjekPajakByKode = async (req, res) => {
  try {
    const objekPajak = await ObjekPajak.findOne({
      where: {
        kodeObjekPajak: req.body.kodeObjekPajak,
      },
      include: [
        {
          model: JenisSetoran,
          include: [
            {
              model: JenisPajak,
            },
          ],
        },
        { model: Cabang },
      ],
    });
    res.status(200).json(objekPajak);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getObjekPajakById = async (req, res) => {
  try {
    const objekPajak = await ObjekPajak.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: JenisSetoran,
          include: [
            {
              model: JenisPajak,
            },
          ],
        },
        { model: Cabang },
      ],
    });
    res.status(200).json(objekPajak);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveObjekPajak = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let jenisSetorans = await JenisSetoran.findOne({
      where: {
        "$jenispajak.kodeJenisPajak$": req.body.kodeJenisPajak,
        kodeJenisSetoran: req.body.kodeJenisSetoran,
      },
      include: [
        {
          model: JenisPajak,
          as: "jenispajak",
          attributes: ["kodeJenisPajak", "namaJenisPajak"],
        },
      ],
    });

    const insertedObjekPajak = await ObjekPajak.create(
      {
        ...req.body,
        jenisSetoranId: jenisSetorans.id,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedObjekPajak);
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

const updateObjekPajak = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    await ObjekPajak.update(
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
        res.status(200).json({ message: "Objek Pajak Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Objek Pajak ${req.params.id} not found!` });
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

const deleteObjekPajak = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await ObjekPajak.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Objek Pajak Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Objek Pajak ${req.params.id} not found!` });
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
  getObjekPajaks,
  getObjekPajaksBupot,
  getObjekPajaksBupot2126,
  getObjekPajakNextKode,
  getObjekPajaksByJenisSetoran,
  getObjekPajaksPagination,
  getObjekPajakByKode,
  getObjekPajakById,
  saveObjekPajak,
  updateObjekPajak,
  deleteObjekPajak,
};
