const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupot2126BuktiSetor = require("../../../models/EBupot2126/EBupot2126BuktiSetor/EBupot2126BuktiSetorModel.js");
const User = require("../../../../User/models/UserModel.js");
const EBupot2126TagihanPemotongan = require("../../../models/EBupot2126/EBupot2126TagihanPemotongan/EBupot2126TagihanPemotonganModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
const JenisSetoran = require("../../../../Master/models/JenisSetoran/JenisSetoranModel.js");
const JenisPajak = require("../../../../Master/models/JenisPajak/JenisPajakModel.js");
const { findNextKode, getMonthIndex } = require("../../../../helper/helper");

const getEBupot2126BuktiSetors = async (req, res) => {
  try {
    const eBupot2126BuktiSetors = await EBupot2126BuktiSetor.findAll({
      include: [
        { model: User },
        { model: EBupot2126TagihanPemotongan },
        { model: JenisSetoran },
        { model: Cabang },
      ],
    });
    res.status(200).json(eBupot2126BuktiSetors);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupot2126BuktiSetorsPagination = async (req, res) => {
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
    { model: EBupot2126TagihanPemotongan },
    { model: JenisSetoran },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126BuktiSetor.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126BuktiSetors = await EBupot2126BuktiSetor.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126BuktiSetors,
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

const getEBupot2126BuktiSetorsByUserPagination = async (req, res) => {
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
    { model: EBupot2126TagihanPemotongan },
    { model: JenisSetoran },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126BuktiSetor.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126BuktiSetors = await EBupot2126BuktiSetor.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126BuktiSetors,
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

const getEBupot2126BuktiSetorsByUserSearchPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupot2126BuktiSetorId: req.body.userEBupot2126BuktiSetorId,
    [Op.and]: [
      {
        "$ebupot2126tagihanpemotongan.masaPajak$": getMonthIndex(
          req.body.masaPajak
        ),
      },
      {
        "$ebupot2126tagihanpemotongan.tahunPajak$": req.body.tahunPajak,
      },
    ],
  };
  let tempInclude = [
    { model: User },
    {
      model: EBupot2126TagihanPemotongan,
      as: "ebupot2126tagihanpemotongan",
    },
    { model: JenisSetoran, include: [{ model: JenisPajak }] },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126BuktiSetor.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126BuktiSetors = await EBupot2126BuktiSetor.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126BuktiSetors,
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

const getEBupot2126BuktiSetorsByUserForPenyiapanSptPagination = async (
  req,
  res
) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupot2126BuktiSetorId: req.body.userEBupot2126BuktiSetorId,
    [Op.and]: [
      {
        "$ebupot2126tagihanpemotongan.masaPajak$": req.body.masaPajak,
      },
      {
        "$ebupot2126tagihanpemotongan.tahunPajak$": req.body.tahunPajak,
      },
    ],
  };
  let tempInclude = [
    { model: User },
    {
      model: EBupot2126TagihanPemotongan,
      as: "ebupot2126tagihanpemotongan",
    },
    { model: JenisSetoran, include: [{ model: JenisPajak }] },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126BuktiSetor.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126BuktiSetors = await EBupot2126BuktiSetor.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126BuktiSetors,
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

const getEBupot2126BuktiSetorById = async (req, res) => {
  try {
    const eBupot2126BuktiSetor = await EBupot2126BuktiSetor.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: User },
        { model: EBupot2126TagihanPemotongan },
        { model: JenisSetoran },
        { model: Cabang },
      ],
    });
    res.status(200).json(eBupot2126BuktiSetor);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveEBupot2126BuktiSetor = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    // 01.) Find Next EBupot 2126 Bukti Setor
    let maxNomorBuktiSetor = await EBupot2126BuktiSetor.max("nomorBuktiSetor", {
      where: {
        userIdInput: req.body.userIdInput, // Apply the where clause to filter by userIdInput
      },
    });

    if (maxNomorBuktiSetor === null) {
      maxNomorBuktiSetor = "0000000000";
    }

    let nextNomorBuktiSetor = findNextKode(parseInt(maxNomorBuktiSetor), 10);

    // 02.) Find Tanggal Bukti Setor
    let tanggalBuktiSetor = new Date();

    // 03.) Find Jenis Setoran
    let findJenisSetoran = await JenisSetoran.findOne({
      where: {
        kodeJenisSetoran: req.body.kodeJenisSetoran,
      },
    });

    const insertedEBupot2126BuktiSetor = await EBupot2126BuktiSetor.create(
      {
        ...req.body,
        userEBupot2126BuktiSetorId: req.body.userId,
        nomorBuktiSetor: nextNomorBuktiSetor,
        tanggalBuktiSetor,
        jenisSetoranId: findJenisSetoran.id,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );

    await EBupot2126TagihanPemotongan.update(
      { isSetor: true },
      {
        where: {
          id: req.body.eBupot2126TagihanPemotonganId,
        },
        transaction,
      }
    );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedEBupot2126BuktiSetor);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const saveEBupot2126BuktiSetorFunction = async (req, transaction) => {
  // 01.) Find Next EBupot 2126 Bukti Setor
  let maxNomorBuktiSetor = await EBupot2126BuktiSetor.max("nomorBuktiSetor", {
    where: {
      userIdInput: req.userIdInput, // Apply the where clause to filter by userIdInput
    },
  });

  if (maxNomorBuktiSetor === null) {
    maxNomorBuktiSetor = "0000000000";
  }

  let nextNomorBuktiSetor = findNextKode(parseInt(maxNomorBuktiSetor), 10);

  // 02.) Find Tanggal Bukti Setor
  let tanggalBuktiSetor = new Date();

  // 03.) Find Jenis Setoran
  let findJenisSetoran = await JenisSetoran.findOne({
    where: {
      kodeJenisSetoran: req.kodeJenisSetoran,
    },
  });

  const insertedEBupot2126BuktiSetor = await EBupot2126BuktiSetor.create(
    {
      ...req,
      userEBupot2126BuktiSetorId: req.userId,
      nomorBuktiSetor: nextNomorBuktiSetor,
      tanggalBuktiSetor,
      jenisSetoranId: findJenisSetoran.id,
      cabangId: req.kodeCabang,
    },
    { transaction }
  );

  await EBupot2126TagihanPemotongan.update(
    { isSetor: true },
    {
      where: {
        id: req.eBupot2126TagihanPemotonganId,
      },
      transaction,
    }
  );

  return insertedEBupot2126BuktiSetor;
};

const setorEBupot2126TagihanPemotongan = async (req, transaction) => {
  let updatedEBupot2126TagihanPemotongan =
    await EBupot2126TagihanPemotongan.increment(
      {
        pphYangDisetor: req.pphYangDisetor,
      },
      {
        where: {
          id: req.idEBupot2126TagihanPemotongan,
        },
        transaction, // Ensure transaction is used
      }
    );

  return updatedEBupot2126TagihanPemotongan;
};

const transaksiEBupot2126BuktiSetor = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    // Ensure the functions are awaited properly
    let savedEBupot2126BuktiSetor = await saveEBupot2126BuktiSetorFunction(
      req.body.eBupot2126BuktiSetor,
      transaction
    );
    let setoredEBupot2126TagihanPemotongan =
      await setorEBupot2126TagihanPemotongan(
        req.body.eBupot2126TagihanPemotongan,
        transaction
      );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(savedEBupot2126BuktiSetor);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateEBupot2126BuktiSetor = async (req, res) => {
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

    await EBupot2126BuktiSetor.update(
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
    ).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "E-Bupot 2126 Bukti Setor Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `E-Bupot 2126 Bukti Setor ${req.params.id} not found!`,
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

const statusDeleteEBupot2126BuktiSetor = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupot2126BuktiSetor.update(
      {
        isHapus: true,
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
        res.status(200).json({ message: "E-Bupot 2126 Pph Disetor Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `E-Bupot 2126 Pph Disetor ${req.params.id} not found!`,
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

const deleteEBupot2126BuktiSetor = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const eBupot2126BuktiSetor = await EBupot2126BuktiSetor.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: User },
        { model: EBupot2126TagihanPemotongan },
        { model: JenisSetoran },
        { model: Cabang },
      ],
    });

    await EBupot2126TagihanPemotongan.decrement(
      {
        pphYangDisetor: eBupot2126BuktiSetor.pphYangDisetor,
      },
      {
        where: {
          id: eBupot2126BuktiSetor.ebupot2126tagihanpemotongan.id,
        },
        transaction, // Ensure transaction is used
      }
    );

    await EBupot2126BuktiSetor.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json({ message: "E-Bupot 2126 Bukti Setor Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEBupot2126BuktiSetors,
  getEBupot2126BuktiSetorsPagination,
  getEBupot2126BuktiSetorsByUserPagination,
  getEBupot2126BuktiSetorsByUserSearchPagination,
  getEBupot2126BuktiSetorsByUserForPenyiapanSptPagination,
  getEBupot2126BuktiSetorById,
  saveEBupot2126BuktiSetor,
  transaksiEBupot2126BuktiSetor,
  updateEBupot2126BuktiSetor,
  statusDeleteEBupot2126BuktiSetor,
  deleteEBupot2126BuktiSetor,
};
