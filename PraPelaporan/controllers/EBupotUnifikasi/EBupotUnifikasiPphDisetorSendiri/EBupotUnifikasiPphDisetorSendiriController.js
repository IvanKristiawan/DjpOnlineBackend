const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupotUnifikasiPphDisetorSendiri = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPphDisetorSendiri/EBupotUnifikasiPphDisetorSendiriModel.js");
const User = require("../../../../User/models/UserModel.js");
const EBilling = require("../../../../EBilling/models/EBilling/EBillingModel.js");
const Tahun = require("../../../../Master/models/Tahun/TahunModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
const JenisSetoran = require("../../../../Master/models/JenisSetoran/JenisSetoranModel.js");
const JenisPajak = require("../../../../Master/models/JenisPajak/JenisPajakModel.js");
const { findNextKode } = require("../../../../helper/helper");

const getEBupotUnifikasiPphDisetorSendiris = async (req, res) => {
  try {
    const eBupotUnifikasiPphDisetorSendiris =
      await EBupotUnifikasiPphDisetorSendiri.findAll({
        include: [
          { model: User },
          { model: EBilling },
          { model: ObjekPajak },
          { model: Cabang },
        ],
      });
    res.status(200).json(eBupotUnifikasiPphDisetorSendiris);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupotUnifikasiPphDisetorSendirisPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        jenisBuktiPenyetoran: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: User },
    { model: EBilling },
    { model: ObjekPajak },
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiPphDisetorSendiri.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiPphDisetorSendiris =
      await EBupotUnifikasiPphDisetorSendiri.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiPphDisetorSendiris,
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

const getEBupotUnifikasiPphDisetorSendirisByUserPagination = async (
  req,
  res
) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    userIdInput: req.body.userIdInput,
    [Op.or]: [
      {
        jenisBuktiPenyetoran: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: User },
    { model: EBilling },
    { model: ObjekPajak },
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiPphDisetorSendiri.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiPphDisetorSendiris =
      await EBupotUnifikasiPphDisetorSendiri.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiPphDisetorSendiris,
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

const getEBupotUnifikasiPphDisetorSendirisByUserSearchPagination = async (
  req,
  res
) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupotUnifikasiPphDisetorSendiriId:
      req.body.userEBupotUnifikasiPphDisetorSendiriId,
  };
  let tempInclude = [
    { model: User },
    {
      model: EBilling,
      as: "ebilling",
      include: [{ model: Tahun, as: "tahun" }],
    },
    { model: ObjekPajak },
    { model: Cabang },
  ];

  if (req.body.pencairanBerdasarkan === "Periode") {
    let [bulan, tahun] = req.body.masaTahunPajakSearch.split("-");
    tempWhere = {
      [Op.and]: [
        tempWhere,
        {
          "$ebilling.masaPajakDariBulan$": bulan,
        },
        {
          "$ebilling.tahun.tahun$": tahun,
        },
      ],
    };
  } else {
    tempWhere["nomorBuktiSetor"] = req.body.kataKunciSearch;
  }

  const totalRows = await EBupotUnifikasiPphDisetorSendiri.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiPphDisetorSendiris =
      await EBupotUnifikasiPphDisetorSendiri.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiPphDisetorSendiris,
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

const getEBupotUnifikasiPphDisetorSendiriById = async (req, res) => {
  try {
    const eBupotUnifikasiPphDisetorSendiri =
      await EBupotUnifikasiPphDisetorSendiri.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          { model: User },
          {
            model: EBilling,
            include: [
              {
                model: JenisSetoran,
                include: [
                  {
                    model: JenisPajak,
                  },
                ],
              },
            ],
          },
          { model: ObjekPajak },
          { model: Cabang },
        ],
      });
    res.status(200).json(eBupotUnifikasiPphDisetorSendiri);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveEBupotUnifikasiPphDisetorSendiri = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    // 01.) Find Next EBupot Unifikasi Pph Disetor Sendiri
    let maxNomorBuktiSetor = await EBupotUnifikasiPphDisetorSendiri.max(
      "nomorBuktiSetor",
      {
        where: {
          userIdInput: req.body.userIdInput, // Apply the where clause to filter by userIdInput
        },
      }
    );

    if (maxNomorBuktiSetor === null) {
      maxNomorBuktiSetor = "0000000000";
    }

    let nextNomorBuktiSetor = findNextKode(parseInt(maxNomorBuktiSetor), 10);

    // 02.) Find Tanggal Bukti Setor
    let tanggalBuktiSetor = new Date();

    // 03.) Find Objek Pajak
    let findObjekPajak = await ObjekPajak.findOne({
      where: {
        kodeObjekPajak: req.body.kodeObjekPajak,
      },
    });

    const insertedEBupotUnifikasiPphDisetorSendiri =
      await EBupotUnifikasiPphDisetorSendiri.create(
        {
          ...req.body,
          userEBupotUnifikasiPphDisetorSendiriId: req.body.userId,
          nomorBuktiSetor: nextNomorBuktiSetor,
          tanggalBuktiSetor,
          objekPajakId: findObjekPajak.id,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );

    await EBilling.update(
      { pralapor: true },
      {
        where: {
          id: req.body.eBillingId,
        },
        transaction,
      }
    );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedEBupotUnifikasiPphDisetorSendiri);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateEBupotUnifikasiPphDisetorSendiri = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    // 01.) Find Objek Pajak
    let findObjekPajak = await ObjekPajak.findOne({
      where: {
        kodeObjekPajak: req.body.kodeObjekPajak,
      },
    });

    await EBupotUnifikasiPphDisetorSendiri.update(
      {
        ...req.body,
        objekPajakId: findObjekPajak.id,
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
          .json({ message: "E-Bupot Unifikasi Pph Disetor Sendiri Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `E-Bupot Unifikasi Pph Disetor Sendiri ${req.params.id} not found!`,
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

const deleteEBupotUnifikasiPphDisetorSendiri = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const eBupotUnifikasiPphDisetorSendiri =
      await EBupotUnifikasiPphDisetorSendiri.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          { model: User },
          { model: EBilling },
          { model: ObjekPajak },
          { model: Cabang },
        ],
      });

    await EBilling.update(
      { pralapor: false },
      {
        where: {
          id: eBupotUnifikasiPphDisetorSendiri.ebilling.id,
        },
        transaction,
      }
    );

    await EBupotUnifikasiPphDisetorSendiri.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res
      .status(201)
      .json({ message: "E-Bupot Unifikasi Pph Disetor Sendiri Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEBupotUnifikasiPphDisetorSendiris,
  getEBupotUnifikasiPphDisetorSendirisPagination,
  getEBupotUnifikasiPphDisetorSendirisByUserPagination,
  getEBupotUnifikasiPphDisetorSendirisByUserSearchPagination,
  getEBupotUnifikasiPphDisetorSendiriById,
  saveEBupotUnifikasiPphDisetorSendiri,
  updateEBupotUnifikasiPphDisetorSendiri,
  deleteEBupotUnifikasiPphDisetorSendiri,
};
