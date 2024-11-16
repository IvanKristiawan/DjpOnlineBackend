const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupot2126ImporData = require("../../../models/EBupot2126/EBupot2126ImporData/EBupot2126ImporDataModel.js");
const EBupot2126DetilValidasi = require("../../../models/EBupot2126/EBupot2126DetilValidasi/EBupot2126DetilValidasiModel.js");
const User = require("../../../../User/models/UserModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const getEBupot2126DetilValidasis = async (req, res) => {
  try {
    const eBupot2126DetilValidasis = await EBupot2126DetilValidasi.findAll({
      include: [
        { model: User },
        { model: EBupot2126ImporData },
        { model: Cabang },
      ],
    });
    res.status(200).json(eBupot2126DetilValidasis);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupot2126DetilValidasisPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {};
  let tempInclude = [
    { model: User },
    { model: EBupot2126ImporData },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126DetilValidasi.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126DetilValidasis = await EBupot2126DetilValidasi.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126DetilValidasis,
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

const getEBupot2126DetilValidasisByUserPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    userIdInput: req.body.userIdInput,
  };
  let tempInclude = [
    { model: User },
    { model: EBupot2126ImporData },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126DetilValidasi.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126DetilValidasis = await EBupot2126DetilValidasi.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126DetilValidasis,
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

const getEBupot2126DetilValidasisByUserSearchPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupot2126DetilValidasiId: req.body.userEBupot2126DetilValidasiId,
  };
  let tempInclude = [
    { model: User },
    { model: EBupot2126ImporData },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126DetilValidasi.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126DetilValidasis = await EBupot2126DetilValidasi.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126DetilValidasis,
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

const getEBupot2126DetilValidasisByUserByImporDataSearchPagination = async (
  req,
  res
) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupot2126DetilValidasiId: req.body.userEBupot2126DetilValidasiId,
    userEBupot2126ImporDataId: req.body.userEBupot2126ImporDataId,
  };
  let tempInclude = [
    { model: User },
    { model: EBupot2126ImporData },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126DetilValidasi.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126DetilValidasis = await EBupot2126DetilValidasi.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126DetilValidasis,
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

const getEBupot2126DetilValidasiById = async (req, res) => {
  try {
    let eBupot2126DetilValidasi = await EBupot2126DetilValidasi.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: User },
        { model: EBupot2126ImporData },
        { model: Cabang },
      ],
    });

    res.status(200).json(eBupot2126DetilValidasi);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveEBupot2126DetilValidasi = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();
    const insertedEBupot2126DetilValidasi =
      await EBupot2126DetilValidasi.create(
        {
          ...req.body,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );

    // Commit transaction and respond with success
    await transaction.commit();
    res.status(201).json(insertedEBupot2126DetilValidasi);
  } catch (error) {
    if (transaction) await transaction.rollback();
    res.status(400).json({ message: error.message });
  }
};

const updateEBupot2126DetilValidasi = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let updatedEBupot2126DetilValidasi = await EBupot2126DetilValidasi.update(
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
    );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(updatedEBupot2126DetilValidasi);
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteEBupot2126DetilValidasi = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupot2126DetilValidasi.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json({ message: "E-Bupot 2126 Detil Validasi Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEBupot2126DetilValidasis,
  getEBupot2126DetilValidasisPagination,
  getEBupot2126DetilValidasisByUserPagination,
  getEBupot2126DetilValidasisByUserSearchPagination,
  getEBupot2126DetilValidasisByUserByImporDataSearchPagination,
  getEBupot2126DetilValidasiById,
  saveEBupot2126DetilValidasi,
  updateEBupot2126DetilValidasi,
  deleteEBupot2126DetilValidasi,
};
