const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const DokumenDasarPemotonganEBupotUnifikasiPphNonResiden = require("../../../models/EBupotUnifikasi/DokumenDasarPemotonganEBupotUnifikasiPphNonResiden/DokumenDasarPemotonganEBupotUnifikasiPphNonResidenModel.js");
const EBupotUnifikasiPphNonResiden = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPphNonResiden/EBupotUnifikasiPphNonResidenModel.js");
const User = require("../../../../User/models/UserModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
const { findNextKode } = require("../../../../helper/helper");

const getDokumenDasarPemotonganEBupotUnifikasiPphNonResidens = async (
  req,
  res
) => {
  try {
    const dokumenDasarPemotonganEBupotUnifikasiPphNonResidens =
      await DokumenDasarPemotonganEBupotUnifikasiPphNonResiden.findAll({
        include: [
          { model: EBupotUnifikasiPphNonResiden, include: [{ model: User }] },
          { model: Cabang },
        ],
      });
    res.status(200).json(dokumenDasarPemotonganEBupotUnifikasiPphNonResidens);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getDokumenDasarPemotonganEBupotUnifikasiPphNonResidensPagination = async (
  req,
  res
) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        noDokumen: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: EBupotUnifikasiPphNonResiden, include: [{ model: User }] },
    { model: Cabang },
  ];

  const totalRows =
    await DokumenDasarPemotonganEBupotUnifikasiPphNonResiden.count({
      where: tempWhere,
      include: tempInclude,
    });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const dokumenDasarPemotonganEBupotUnifikasiPphNonResidens =
      await DokumenDasarPemotonganEBupotUnifikasiPphNonResiden.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      dokumenDasarPemotonganEBupotUnifikasiPphNonResidens,
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

const getDokumenDasarPemotonganEBupotUnifikasiPphNonResidenById = async (
  req,
  res
) => {
  try {
    const dokumenDasarPemotonganEBupotUnifikasiPphNonResiden =
      await DokumenDasarPemotonganEBupotUnifikasiPphNonResiden.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          { model: EBupotUnifikasiPphNonResiden, include: [{ model: User }] },
          { model: Cabang },
        ],
      });
    res.status(200).json(dokumenDasarPemotonganEBupotUnifikasiPphNonResiden);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveDokumenDasarPemotonganEBupotUnifikasiPphNonResiden = async (
  req,
  res
) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    // 01.) Find EBupotUnifikasiPphNonResiden
    let findEBupotUnifikasiPphNonResiden =
      await EBupotUnifikasiPphNonResiden.findOne({
        where: {
          id: req.body.EBupotUnifikasiPphNonResidenId,
        },
      });

    const insertedDokumenDasarPemotonganEBupotUnifikasiPphNonResiden =
      await DokumenDasarPemotonganEBupotUnifikasiPphNonResiden.create(
        {
          ...req.body,
          eBupotUnifikasiPphNonResidenId: findEBupotUnifikasiPphNonResiden.id,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );

    // Status 201 = Created
    await transaction.commit();
    res
      .status(201)
      .json(insertedDokumenDasarPemotonganEBupotUnifikasiPphNonResiden);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateDokumenDasarPemotonganEBupotUnifikasiPphNonResiden = async (
  req,
  res
) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    // 01.) Find EBupotUnifikasiPphNonResiden
    let findEBupotUnifikasiPphNonResiden =
      await EBupotUnifikasiPphNonResiden.findOne({
        where: {
          id: req.body.EBupotUnifikasiPphNonResidenId,
        },
      });

    await DokumenDasarPemotonganEBupotUnifikasiPphNonResiden.update(
      {
        ...req.body,
        eBupotUnifikasiPphNonResidenId: findEBupotUnifikasiPphNonResiden.id,
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
        res.status(200).json({
          message:
            "Dokumen Dasar Pemotongan E-Bupot Unifikasi Pph NonResiden Updated!",
        });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `Dokumen Dasar Pemotongan E-Bupot Unifikasi Pph NonResiden ${req.params.id} not found!`,
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

const deleteDokumenDasarPemotonganEBupotUnifikasiPphNonResiden = async (
  req,
  res
) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await DokumenDasarPemotonganEBupotUnifikasiPphNonResiden.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json({
      message:
        "Dokumen Dasar Pemotongan E-Bupot Unifikasi Pph NonResiden Deleted!",
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
  getDokumenDasarPemotonganEBupotUnifikasiPphNonResidens,
  getDokumenDasarPemotonganEBupotUnifikasiPphNonResidensPagination,
  getDokumenDasarPemotonganEBupotUnifikasiPphNonResidenById,
  saveDokumenDasarPemotonganEBupotUnifikasiPphNonResiden,
  updateDokumenDasarPemotonganEBupotUnifikasiPphNonResiden,
  deleteDokumenDasarPemotonganEBupotUnifikasiPphNonResiden,
};
