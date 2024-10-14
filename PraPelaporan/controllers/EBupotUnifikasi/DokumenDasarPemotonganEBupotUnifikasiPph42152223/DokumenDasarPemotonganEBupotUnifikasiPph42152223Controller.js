const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const DokumenDasarPemotonganEBupotUnifikasiPph42152223 = require("../../../models/EBupotUnifikasi/DokumenDasarPemotonganEBupotUnifikasiPph42152223/DokumenDasarPemotonganEBupotUnifikasiPph42152223Model.js");
const EBupotUnifikasiPph42152223 = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPph42152223/EBupotUnifikasiPph42152223Model.js");
const User = require("../../../../User/models/UserModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const Penandatangan = require("../../../models/Penandatangan/PenandatanganModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
const { findNextKode } = require("../../../../helper/helper");

const getDokumenDasarPemotonganEBupotUnifikasiPph42152223s = async (
  req,
  res
) => {
  try {
    const dokumenDasarPemotonganEBupotUnifikasiPph42152223s =
      await DokumenDasarPemotonganEBupotUnifikasiPph42152223.findAll({
        include: [
          { model: EBupotUnifikasiPph42152223, include: [{ model: User }] },
          { model: Cabang },
        ],
      });
    res.status(200).json(dokumenDasarPemotonganEBupotUnifikasiPph42152223s);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getDokumenDasarPemotonganEBupotUnifikasiPph42152223sPagination = async (
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
    { model: EBupotUnifikasiPph42152223, include: [{ model: User }] },
    { model: Cabang },
  ];

  const totalRows =
    await DokumenDasarPemotonganEBupotUnifikasiPph42152223.count({
      where: tempWhere,
      include: tempInclude,
    });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const dokumenDasarPemotonganEBupotUnifikasiPph42152223s =
      await DokumenDasarPemotonganEBupotUnifikasiPph42152223.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      dokumenDasarPemotonganEBupotUnifikasiPph42152223s,
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

const getDokumenDasarPemotonganEBupotUnifikasiPph42152223ById = async (
  req,
  res
) => {
  try {
    const dokumenDasarPemotonganEBupotUnifikasiPph42152223 =
      await DokumenDasarPemotonganEBupotUnifikasiPph42152223.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          { model: EBupotUnifikasiPph42152223, include: [{ model: User }] },
          { model: Cabang },
        ],
      });
    res.status(200).json(dokumenDasarPemotonganEBupotUnifikasiPph42152223);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveDokumenDasarPemotonganEBupotUnifikasiPph42152223 = async (
  req,
  res
) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    // 01.) Find EBupotUnifikasiPph42152223
    let findEBupotUnifikasiPph42152223 =
      await EBupotUnifikasiPph42152223.findOne({
        where: {
          id: req.body.EBupotUnifikasiPph42152223Id,
        },
      });

    const insertedDokumenDasarPemotonganEBupotUnifikasiPph42152223 =
      await DokumenDasarPemotonganEBupotUnifikasiPph42152223.create(
        {
          ...req.body,
          eBupotUnifikasiPph42152223Id: findEBupotUnifikasiPph42152223.id,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );

    // Status 201 = Created
    await transaction.commit();
    res
      .status(201)
      .json(insertedDokumenDasarPemotonganEBupotUnifikasiPph42152223);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateDokumenDasarPemotonganEBupotUnifikasiPph42152223 = async (
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

    // 01.) Find EBupotUnifikasiPph42152223
    let findEBupotUnifikasiPph42152223 =
      await EBupotUnifikasiPph42152223.findOne({
        where: {
          id: req.body.EBupotUnifikasiPph42152223Id,
        },
      });

    await DokumenDasarPemotonganEBupotUnifikasiPph42152223.update(
      {
        ...req.body,
        eBupotUnifikasiPph42152223Id: findEBupotUnifikasiPph42152223.id,
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
        res
          .status(200)
          .json({
            message:
              "Dokumen Dasar Pemotongan E-Bupot Unifikasi Pph 42152223 Updated!",
          });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `Dokumen Dasar Pemotongan E-Bupot Unifikasi Pph 42152223 ${req.params.id} not found!`,
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

const deleteDokumenDasarPemotonganEBupotUnifikasiPph42152223 = async (
  req,
  res
) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await DokumenDasarPemotonganEBupotUnifikasiPph42152223.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res
      .status(201)
      .json({
        message:
          "Dokumen Dasar Pemotongan E-Bupot Unifikasi Pph 42152223 Deleted!",
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
  getDokumenDasarPemotonganEBupotUnifikasiPph42152223s,
  getDokumenDasarPemotonganEBupotUnifikasiPph42152223sPagination,
  getDokumenDasarPemotonganEBupotUnifikasiPph42152223ById,
  saveDokumenDasarPemotonganEBupotUnifikasiPph42152223,
  updateDokumenDasarPemotonganEBupotUnifikasiPph42152223,
  deleteDokumenDasarPemotonganEBupotUnifikasiPph42152223,
};
