const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const ObjekPajak = require("../../models/ObjekPajak/ObjekPajakModel.js");
const JenisObjekPajak = require("../../models/JenisObjekPajak/JenisObjekPajakModel.js");
const Cabang = require("../../models/Cabang/CabangModel.js");

const getJenisObjekPajaks = async (req, res) => {
  try {
    const jenisObjekPajaks = await JenisObjekPajak.findAll({
      order: [["kodeJenisObjekPajak", "ASC"]],
      include: [{ model: ObjekPajak }, { model: Cabang }],
    });
    res.status(200).json(jenisObjekPajaks);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getJenisObjekPajaksBupot = async (req, res) => {
  try {
    const jenisObjekPajaks = await JenisObjekPajak.findAll({
      where: {
        untukBupotUnifikasi: req.body.untukBupotUnifikasi,
      },
      order: [["kodeJenisObjekPajak", "ASC"]],
      include: [{ model: ObjekPajak }, { model: Cabang }],
    });
    res.status(200).json(jenisObjekPajaks);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getJenisObjekPajaksByObjekPajak = async (req, res) => {
  try {
    const jenisObjekPajaks = await JenisObjekPajak.findAll({
      where: {
        objekPajakId: req.body.objekPajakId,
      },
      order: [["kodeJenisObjekPajak", "ASC"]],
      include: [{ model: ObjekPajak }, { model: Cabang }],
    });
    res.status(200).json(jenisObjekPajaks);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getJenisObjekPajaksPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodeJenisObjekPajak: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [{ model: ObjekPajak }, { model: Cabang }];

  const totalRows = await JenisObjekPajak.count({
    where: tempWhere,
    include: tempInclude,
    order: [["kodeJenisObjekPajak", "ASC"]],
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const jenisObjekPajaks = await JenisObjekPajak.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
      order: [["kodeJenisObjekPajak", "ASC"]],
    });
    res.status(200).json({
      jenisObjekPajaks,
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

const getJenisObjekPajakByKode = async (req, res) => {
  try {
    const jenisObjekPajak = await JenisObjekPajak.findOne({
      where: {
        kodeJenisObjekPajak: req.body.kodeJenisObjekPajak,
      },
      include: [
        {
          model: ObjekPajak,
        },
        { model: Cabang },
      ],
    });
    res.status(200).json(jenisObjekPajak);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getJenisObjekPajakByNama = async (req, res) => {
  try {
    const jenisObjekPajak = await JenisObjekPajak.findOne({
      where: {
        namaJenisObjekPajak: req.body.namaJenisObjekPajak,
      },
      include: [
        {
          model: ObjekPajak,
        },
        { model: Cabang },
      ],
    });
    res.status(200).json(jenisObjekPajak);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getJenisObjekPajakById = async (req, res) => {
  try {
    const jenisObjekPajak = await JenisObjekPajak.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: ObjekPajak,
        },
        { model: Cabang },
      ],
    });
    res.status(200).json(jenisObjekPajak);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveJenisObjekPajak = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let objekPajaks = await ObjekPajak.findOne({
      where: {
        kodeObjekPajak: req.body.kodeObjekPajak,
      },
      include: [],
    });

    const insertedJenisObjekPajak = await JenisObjekPajak.create(
      {
        ...req.body,
        objekPajakId: objekPajaks.id,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedJenisObjekPajak);
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

const updateJenisObjekPajak = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    await JenisObjekPajak.update(
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
        res.status(200).json({ message: "Jenis Objek Pajak Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Jenis Objek Pajak ${req.params.id} not found!` });
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

const deleteJenisObjekPajak = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await JenisObjekPajak.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Jenis Objek Pajak Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Jenis Objek Pajak ${req.params.id} not found!` });
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
  getJenisObjekPajaks,
  getJenisObjekPajaksBupot,
  getJenisObjekPajaksByObjekPajak,
  getJenisObjekPajaksPagination,
  getJenisObjekPajakByKode,
  getJenisObjekPajakByNama,
  getJenisObjekPajakById,
  saveJenisObjekPajak,
  updateJenisObjekPajak,
  deleteJenisObjekPajak,
};
