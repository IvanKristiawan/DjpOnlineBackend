const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBilling = require("../../models/EBilling/EBillingModel.js");
const User = require("../../../User/models/UserModel.js");
const JenisSetoran = require("../../../Master/models/JenisSetoran/JenisSetoranModel.js");
const Tahun = require("../../../Master/models/Tahun/TahunModel.js");
const Cabang = require("../../../Master/models/Cabang/CabangModel.js");

const getEBillings = async (req, res) => {
  try {
    const eBillings = await EBilling.findAll({
      order: [["kodeBilling", "ASC"]],
      include: [
        { model: User },
        { model: JenisSetoran },
        { model: Tahun },
        { model: Cabang },
      ],
    });
    res.status(200).json(eBillings);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBillingsPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodeBilling: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: User },
    { model: JenisSetoran },
    { model: Tahun },
    { model: Cabang },
  ];

  const totalRows = await EBilling.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBillings = await EBilling.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
      order: [["kodeBilling", "ASC"]],
    });
    res.status(200).json({
      eBillings,
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

const getEBillingById = async (req, res) => {
  try {
    const eBilling = await EBilling.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: User },
        { model: JenisSetoran },
        { model: Tahun },
        { model: Cabang },
      ],
    });
    res.status(200).json(eBilling);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveEBilling = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();

    // Find Next Kode Billing
    const maxKodeBilling = await EBilling.max("kodeBilling");
    let nextKodeEBilling = findNextKode(parseInt(maxKodeBilling), 15);

    // Find Next Month
    let masaAktifKodeBilling = addMonths(new Date(), 2);

    const insertedEBilling = await EBilling.create(
      {
        ...req.body,
        userEBillingId: req.body.userId,
        jenisSetoranId: req.body.jenisSetoran,
        tahunPajakId: req.body.tahunPajak,
        kodeBilling: nextKodeEBilling,
        masaAktifKodeBilling,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedEBilling);
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

const updateEBilling = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await EBilling.update(
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
        res.status(200).json({ message: "E-Billing Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `E-Billing ${req.params.id} not found!` });
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

const deleteEBilling = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await EBilling.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "E-Billing Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `E-Billing ${req.params.id} not found!` });
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
  getEBillings,
  getEBillingsPagination,
  getEBillingById,
  saveEBilling,
  updateEBilling,
  deleteEBilling,
};
