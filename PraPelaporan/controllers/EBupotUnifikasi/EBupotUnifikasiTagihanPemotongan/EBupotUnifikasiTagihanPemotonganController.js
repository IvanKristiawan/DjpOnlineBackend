const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupotUnifikasiTagihanPemotongan = require("../../../models/EBupotUnifikasi/EBupotUnifikasiTagihanPemotongan/EBupotUnifikasiTagihanPemotonganModel.js");
const User = require("../../../../User/models/UserModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const JenisSetoran = require("../../../../Master/models/JenisSetoran/JenisSetoranModel.js");
const JenisPajak = require("../../../../Master/models/JenisPajak/JenisPajakModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
const {
  findNextKode,
  formatDate,
  generateIdBilling,
  generateRandomString,
} = require("../../../../helper/helper");

const getEBupotUnifikasiTagihanPemotongans = async (req, res) => {
  try {
    const eBupotUnifikasiTagihanPemotongans =
      await EBupotUnifikasiTagihanPemotongan.findAll({
        include: [
          { model: User },
          {
            model: ObjekPajak,
            include: [
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
            ],
          },
          { model: Cabang },
        ],
      });
    res.status(200).json(eBupotUnifikasiTagihanPemotongans);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupotUnifikasiTagihanPemotongansPagination = async (req, res) => {
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
      model: ObjekPajak,
      include: [
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
      ],
    },
    ,
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiTagihanPemotongan.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiTagihanPemotongans =
      await EBupotUnifikasiTagihanPemotongan.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiTagihanPemotongans,
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

const getEBupotUnifikasiTagihanPemotongansByUserPagination = async (
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
        npwpNitku: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: User },
    {
      model: ObjekPajak,
      include: [
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
      ],
    },
    ,
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiTagihanPemotongan.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiTagihanPemotongans =
      await EBupotUnifikasiTagihanPemotongan.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiTagihanPemotongans,
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

const getEBupotUnifikasiTagihanPemotongansByUserSearchPagination = async (
  req,
  res
) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupotUnifikasiTagihanPemotonganId:
      req.body.userEBupotUnifikasiTagihanPemotonganId,
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
      model: ObjekPajak,
      include: [
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
      ],
    },
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiTagihanPemotongan.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiTagihanPemotongans =
      await EBupotUnifikasiTagihanPemotongan.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiTagihanPemotongans,
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

const getEBupotUnifikasiTagihanPemotonganByNtpnUser = async (req, res) => {
  try {
    let eBupotUnifikasiTagihanPemotongan =
      await EBupotUnifikasiTagihanPemotongan.findOne({
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
            model: ObjekPajak,
            include: [
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
            ],
          },
          { model: Cabang },
        ],
      });

    res.status(200).json(eBupotUnifikasiTagihanPemotongan);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getEBupotUnifikasiTagihanPemotonganById = async (req, res) => {
  try {
    let eBupotUnifikasiTagihanPemotongan =
      await EBupotUnifikasiTagihanPemotongan.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          { model: User },
          {
            model: ObjekPajak,
            include: [
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
            ],
          },
          { model: Cabang },
        ],
      });

    res.status(200).json(eBupotUnifikasiTagihanPemotongan);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveEBupotUnifikasiTagihanPemotongan = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    // 01.) Find Tanggal Tagihan Pemotongan
    let tanggalTagihanPemotongan = new Date();

    // 02.) Find Objek Pajak
    let findObjekPajak = await ObjekPajak.findOne({
      where: {
        kodeObjekPajak: req.body.kodeObjekPajak,
      },
    });

    // 03.) Cari Bulan
    let bulanPajak = getMonthIndex(req.body.masaPajak);

    const insertedEBupotUnifikasiTagihanPemotongan =
      await EBupotUnifikasiTagihanPemotongan.create(
        {
          ...req.body,
          userEBupotUnifikasiTagihanPemotonganId: req.body.userId,
          tanggalTagihanPemotongan,
          objekPajakId: findObjekPajak.id,
          bulanPajak,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedEBupotUnifikasiTagihanPemotongan);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const generateIdBillingEBupotUnifikasiTagihanPemotongan = async (req, res) => {
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

    let updatedEBupotUnifikasiTagihanPemotongan =
      await EBupotUnifikasiTagihanPemotongan.update(
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
    res.status(201).json(updatedEBupotUnifikasiTagihanPemotongan);
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const setorEBupotUnifikasiTagihanPemotongan = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    let updatedEBupotUnifikasiTagihanPemotongan =
      await EBupotUnifikasiTagihanPemotongan.increment(
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
    res.status(201).json(updatedEBupotUnifikasiTagihanPemotongan);
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateEBupotUnifikasiTagihanPemotongan = async (req, res) => {
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

    let updatedEBupotUnifikasiTagihanPemotongan =
      await EBupotUnifikasiTagihanPemotongan.update(
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
      );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(updatedEBupotUnifikasiTagihanPemotongan);
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteEBupotUnifikasiTagihanPemotongan = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupotUnifikasiTagihanPemotongan.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res
      .status(201)
      .json({ message: "E-Bupot Unifikasi Pph 42152223 Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEBupotUnifikasiTagihanPemotongans,
  getEBupotUnifikasiTagihanPemotongansPagination,
  getEBupotUnifikasiTagihanPemotongansByUserPagination,
  getEBupotUnifikasiTagihanPemotongansByUserSearchPagination,
  getEBupotUnifikasiTagihanPemotonganByNtpnUser,
  getEBupotUnifikasiTagihanPemotonganById,
  saveEBupotUnifikasiTagihanPemotongan,
  generateIdBillingEBupotUnifikasiTagihanPemotongan,
  setorEBupotUnifikasiTagihanPemotongan,
  updateEBupotUnifikasiTagihanPemotongan,
  deleteEBupotUnifikasiTagihanPemotongan,
};
