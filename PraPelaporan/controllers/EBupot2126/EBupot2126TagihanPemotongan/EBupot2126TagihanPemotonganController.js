const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupot2126TagihanPemotongan = require("../../../models/EBupot2126/EBupot2126TagihanPemotongan/EBupot2126TagihanPemotonganModel.js");
const User = require("../../../../User/models/UserModel.js");
const JenisSetoran = require("../../../../Master/models/JenisSetoran/JenisSetoranModel.js");
const JenisPajak = require("../../../../Master/models/JenisPajak/JenisPajakModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
const {
  findNextKode,
  formatDate,
  generateIdBilling,
  generateRandomString,
} = require("../../../../helper/helper");

const getEBupot2126TagihanPemotongans = async (req, res) => {
  try {
    const eBupot2126TagihanPemotongans =
      await EBupot2126TagihanPemotongan.findAll({
        include: [
          { model: User },
          {
            model: JenisSetoran,
            as: "jenissetoran",
            include: [
              {
                model: JenisPajak,
                as: "jenispajak",
              },
            ],
          },
          { model: Cabang },
        ],
      });
    res.status(200).json(eBupot2126TagihanPemotongans);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupot2126TagihanPemotongansPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        npwpNitku: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: User },
    {
      model: JenisSetoran,
      as: "jenissetoran",
      include: [
        {
          model: JenisPajak,
          as: "jenispajak",
        },
      ],
    },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126TagihanPemotongan.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126TagihanPemotongans =
      await EBupot2126TagihanPemotongan.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupot2126TagihanPemotongans,
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

const getEBupot2126TagihanPemotongansByUserPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    userIdInput: req.body.userIdInput,
    [Op.or]: [
      {
        npwpNitku: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: User },
    {
      model: JenisSetoran,
      as: "jenissetoran",
      include: [
        {
          model: JenisPajak,
          as: "jenispajak",
        },
      ],
    },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126TagihanPemotongan.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126TagihanPemotongans =
      await EBupot2126TagihanPemotongan.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupot2126TagihanPemotongans,
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

const getEBupot2126TagihanPemotongansByUserSearchPagination = async (
  req,
  res
) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupot2126TagihanPemotonganId:
      req.body.userEBupot2126TagihanPemotonganId,
    [Op.and]: [
      {
        masaPajak: getMonthIndex(req.body.masaPajak),
      },
      {
        tahunPajak: req.body.tahunPajak,
      },
    ],
  };
  let tempInclude = [
    { model: User },
    {
      model: JenisSetoran,
      as: "jenissetoran",
      include: [
        {
          model: JenisPajak,
          as: "jenispajak",
        },
      ],
    },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126TagihanPemotongan.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126TagihanPemotongans =
      await EBupot2126TagihanPemotongan.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupot2126TagihanPemotongans,
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

const getEBupot2126TagihanPemotonganByNtpnUser = async (req, res) => {
  try {
    let eBupot2126TagihanPemotongan = await EBupot2126TagihanPemotongan.findOne(
      {
        where: {
          ntpnBilling: req.body.ntpnBilling,
          userIdInput: req.body.userIdInput,
          // isSetor: false,
          tahunPajak: req.body.tahunPajak,
          [Op.and]: [
            Sequelize.where(
              Sequelize.col("pphYangDipotong"),
              Op.ne,
              Sequelize.col("pphYangDisetor")
            ), // Ensure the two fields are not equal
          ],
        },
        include: [
          { model: User },
          {
            model: JenisSetoran,
            as: "jenissetoran",
            include: [
              {
                model: JenisPajak,
                as: "jenispajak",
              },
            ],
          },
          { model: Cabang },
        ],
      }
    );

    res.status(200).json(eBupot2126TagihanPemotongan);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getEBupot2126TagihanPemotonganById = async (req, res) => {
  try {
    let eBupot2126TagihanPemotongan = await EBupot2126TagihanPemotongan.findOne(
      {
        where: {
          id: req.params.id,
        },
        include: [
          { model: User },
          {
            model: JenisSetoran,
            as: "jenissetoran",
            include: [
              {
                model: JenisPajak,
                as: "jenispajak",
              },
            ],
          },
          { model: Cabang },
        ],
      }
    );

    res.status(200).json(eBupot2126TagihanPemotongan);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveEBupot2126TagihanPemotongan = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    // 01.) Find Tanggal Tagihan Pemotongan
    let tanggalTagihanPemotongan = new Date();

    // 02.) Find Jenis Setoran
    let findJenisSetoran = await JenisSetoran.findOne({
      where: {
        kodeJenisSetoran: req.body.kodeJenisSetoran,
      },
    });

    // 03.) Cari Bulan
    let bulanPajak = getMonthIndex(req.body.masaPajak);

    const insertedEBupot2126TagihanPemotongan =
      await EBupot2126TagihanPemotongan.create(
        {
          ...req.body,
          userEBupot2126TagihanPemotonganId: req.body.userId,
          tanggalTagihanPemotongan,
          jenisSetoranId: findJenisSetoran.id,
          bulanPajak,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedEBupot2126TagihanPemotongan);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const generateIdBillingEBupot2126TagihanPemotongan = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    let idBilling = generateIdBilling();

    // Find Next Month
    let masaAktifKodeBilling = addMonths(new Date(), 2);

    const ntpnBilling = generateRandomString(16);

    let updatedEBupot2126TagihanPemotongan =
      await EBupot2126TagihanPemotongan.update(
        {
          idBilling,
          masaAktifKodeBilling,
          ntpnBilling,
        },
        {
          where: {
            id: req.params.id,
          },
          transaction,
        }
      );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(updatedEBupot2126TagihanPemotongan);
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const setorEBupot2126TagihanPemotongan = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    let updatedEBupot2126TagihanPemotongan =
      await EBupot2126TagihanPemotongan.increment(
        {
          pphYangDisetor: req.body.pphYangDisetor,
        },
        {
          where: {
            id: req.params.id,
          },
          transaction, // Ensure transaction is used
        }
      );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(updatedEBupot2126TagihanPemotongan);
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateEBupot2126TagihanPemotongan = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    // 01.) Find Jenis Setoran
    let findJenisSetoran = await JenisSetoran.findOne({
      where: {
        kodeJenisSetoran: req.body.kodeJenisSetoran,
      },
    });

    let updatedEBupot2126TagihanPemotongan =
      await EBupot2126TagihanPemotongan.update(
        {
          ...req.body,
          jenisSetoranId: findJenisSetoran.id,
          cabangId: req.body.kodeCabang,
        },
        {
          where: {
            id: req.params.id,
          },
          transaction,
        }
      );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(updatedEBupot2126TagihanPemotongan);
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteEBupot2126TagihanPemotongan = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupot2126TagihanPemotongan.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json({ message: "E-Bupot 2126 Pph 2126 Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEBupot2126TagihanPemotongans,
  getEBupot2126TagihanPemotongansPagination,
  getEBupot2126TagihanPemotongansByUserPagination,
  getEBupot2126TagihanPemotongansByUserSearchPagination,
  getEBupot2126TagihanPemotonganByNtpnUser,
  getEBupot2126TagihanPemotonganById,
  saveEBupot2126TagihanPemotongan,
  generateIdBillingEBupot2126TagihanPemotongan,
  setorEBupot2126TagihanPemotongan,
  updateEBupot2126TagihanPemotongan,
  deleteEBupot2126TagihanPemotongan,
};
