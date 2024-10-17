const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupotUnifikasiBuktiSetor = require("../../../models/EBupotUnifikasi/EBupotUnifikasiBuktiSetor/EBupotUnifikasiBuktiSetorModel.js");
const User = require("../../../../User/models/UserModel.js");
const EBupotUnifikasiTagihanPemotongan = require("../../../models/EBupotUnifikasi/EBupotUnifikasiTagihanPemotongan/EBupotUnifikasiTagihanPemotonganModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
const JenisSetoran = require("../../../../Master/models/JenisSetoran/JenisSetoranModel.js");
const JenisPajak = require("../../../../Master/models/JenisPajak/JenisPajakModel.js");
const { findNextKode, getMonthIndex } = require("../../../../helper/helper");

const getEBupotUnifikasiBuktiSetors = async (req, res) => {
  try {
    const eBupotUnifikasiBuktiSetors = await EBupotUnifikasiBuktiSetor.findAll({
      include: [
        { model: User },
        { model: EBupotUnifikasiTagihanPemotongan },
        { model: JenisSetoran },
        { model: Cabang },
      ],
    });
    res.status(200).json(eBupotUnifikasiBuktiSetors);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupotUnifikasiBuktiSetorsPagination = async (req, res) => {
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
    { model: EBupotUnifikasiTagihanPemotongan },
    { model: JenisSetoran },
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiBuktiSetor.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiBuktiSetors = await EBupotUnifikasiBuktiSetor.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupotUnifikasiBuktiSetors,
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

const getEBupotUnifikasiBuktiSetorsByUserPagination = async (req, res) => {
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
    { model: EBupotUnifikasiTagihanPemotongan },
    { model: JenisSetoran },
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiBuktiSetor.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiBuktiSetors = await EBupotUnifikasiBuktiSetor.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupotUnifikasiBuktiSetors,
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

const getEBupotUnifikasiBuktiSetorsByUserSearchPagination = async (
  req,
  res
) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupotUnifikasiBuktiSetorId: req.body.userEBupotUnifikasiBuktiSetorId,
    [Op.and]: [
      {
        "$ebupotunifikasitagihanpemotongan.masaPajak$": getMonthIndex(
          req.body.masaPajak
        ),
      },
      {
        "$ebupotunifikasitagihanpemotongan.tahunPajak$": req.body.tahunPajak,
      },
    ],
  };
  let tempInclude = [
    { model: User },
    {
      model: EBupotUnifikasiTagihanPemotongan,
      as: "ebupotunifikasitagihanpemotongan",
    },
    { model: JenisSetoran, include: [{ model: JenisPajak }] },
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiBuktiSetor.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiBuktiSetors = await EBupotUnifikasiBuktiSetor.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupotUnifikasiBuktiSetors,
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

const getEBupotUnifikasiBuktiSetorById = async (req, res) => {
  try {
    const eBupotUnifikasiBuktiSetor = await EBupotUnifikasiBuktiSetor.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: User },
        { model: EBupotUnifikasiTagihanPemotongan },
        { model: JenisSetoran },
        { model: Cabang },
      ],
    });
    res.status(200).json(eBupotUnifikasiBuktiSetor);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveEBupotUnifikasiBuktiSetor = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    // 01.) Find Next EBupot Unifikasi Bukti Setor
    let maxNomorBuktiSetor = await EBupotUnifikasiBuktiSetor.max(
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

    // 03.) Find Jenis Setoran
    let findJenisSetoran = await JenisSetoran.findOne({
      where: {
        kodeJenisSetoran: req.body.kodeJenisSetoran,
      },
    });

    const insertedEBupotUnifikasiBuktiSetor =
      await EBupotUnifikasiBuktiSetor.create(
        {
          ...req.body,
          userEBupotUnifikasiBuktiSetorId: req.body.userId,
          nomorBuktiSetor: nextNomorBuktiSetor,
          tanggalBuktiSetor,
          jenisSetoranId: findJenisSetoran.id,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );

    await EBupotUnifikasiTagihanPemotongan.update(
      { isSetor: true },
      {
        where: {
          id: req.body.eBupotUnifikasiTagihanPemotonganId,
        },
        transaction,
      }
    );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedEBupotUnifikasiBuktiSetor);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const saveEBupotUnifikasiBuktiSetorFunction = async (req, transaction) => {
  // 01.) Find Next EBupot Unifikasi Bukti Setor
  let maxNomorBuktiSetor = await EBupotUnifikasiBuktiSetor.max(
    "nomorBuktiSetor",
    {
      where: {
        userIdInput: req.userIdInput, // Apply the where clause to filter by userIdInput
      },
    }
  );

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

  const insertedEBupotUnifikasiBuktiSetor =
    await EBupotUnifikasiBuktiSetor.create(
      {
        ...req,
        userEBupotUnifikasiBuktiSetorId: req.userId,
        nomorBuktiSetor: nextNomorBuktiSetor,
        tanggalBuktiSetor,
        jenisSetoranId: findJenisSetoran.id,
        cabangId: req.kodeCabang,
      },
      { transaction }
    );

  await EBupotUnifikasiTagihanPemotongan.update(
    { isSetor: true },
    {
      where: {
        id: req.eBupotUnifikasiTagihanPemotonganId,
      },
      transaction,
    }
  );

  return insertedEBupotUnifikasiBuktiSetor;
};

const setorEBupotUnifikasiTagihanPemotongan = async (req, transaction) => {
  let updatedEBupotUnifikasiTagihanPemotongan =
    await EBupotUnifikasiTagihanPemotongan.increment(
      {
        pphYangDisetor: req.pphYangDisetor,
      },
      {
        where: {
          id: req.idEBupotUnifikasiTagihanPemotongan,
        },
        transaction, // Ensure transaction is used
      }
    );

  return updatedEBupotUnifikasiTagihanPemotongan;
};

const transaksiEBupotUnifikasiBuktiSetor = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    // Ensure the functions are awaited properly
    let savedEBupotUnifikasiBuktiSetor =
      await saveEBupotUnifikasiBuktiSetorFunction(
        req.body.eBupotUnifikasiBuktiSetor,
        transaction
      );
    let setoredEBupotUnifikasiTagihanPemotongan =
      await setorEBupotUnifikasiTagihanPemotongan(
        req.body.eBupotUnifikasiTagihanPemotongan,
        transaction
      );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(savedEBupotUnifikasiBuktiSetor);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateEBupotUnifikasiBuktiSetor = async (req, res) => {
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

    await EBupotUnifikasiBuktiSetor.update(
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
        res
          .status(200)
          .json({ message: "E-Bupot Unifikasi Bukti Setor Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `E-Bupot Unifikasi Bukti Setor ${req.params.id} not found!`,
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

const statusDeleteEBupotUnifikasiBuktiSetor = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupotUnifikasiBuktiSetor.update(
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
        res
          .status(200)
          .json({ message: "E-Bupot Unifikasi Pph Disetor Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `E-Bupot Unifikasi Pph Disetor ${req.params.id} not found!`,
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

const deleteEBupotUnifikasiBuktiSetor = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const eBupotUnifikasiBuktiSetor = await EBupotUnifikasiBuktiSetor.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: User },
        { model: EBupotUnifikasiTagihanPemotongan },
        { model: JenisSetoran },
        { model: Cabang },
      ],
    });

    await EBupotUnifikasiTagihanPemotongan.decrement(
      {
        pphYangDisetor: eBupotUnifikasiBuktiSetor.pphYangDisetor,
      },
      {
        where: {
          id: eBupotUnifikasiBuktiSetor.ebupotunifikasitagihanpemotongan.id,
        },
        transaction, // Ensure transaction is used
      }
    );

    await EBupotUnifikasiBuktiSetor.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json({ message: "E-Bupot Unifikasi Bukti Setor Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEBupotUnifikasiBuktiSetors,
  getEBupotUnifikasiBuktiSetorsPagination,
  getEBupotUnifikasiBuktiSetorsByUserPagination,
  getEBupotUnifikasiBuktiSetorsByUserSearchPagination,
  getEBupotUnifikasiBuktiSetorById,
  saveEBupotUnifikasiBuktiSetor,
  transaksiEBupotUnifikasiBuktiSetor,
  updateEBupotUnifikasiBuktiSetor,
  statusDeleteEBupotUnifikasiBuktiSetor,
  deleteEBupotUnifikasiBuktiSetor,
};
