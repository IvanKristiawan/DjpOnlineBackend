const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupotUnifikasiImporData = require("../../../models/EBupotUnifikasi/EBupotUnifikasiImporData/EBupotUnifikasiImporDataModel.js");
const EBupotUnifikasiDetilValidasi = require("../../../models/EBupotUnifikasi/EBupotUnifikasiDetilValidasi/EBupotUnifikasiDetilValidasiModel.js");
const User = require("../../../../User/models/UserModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");

const getEBupotUnifikasiDetilValidasis = async (req, res) => {
  try {
    const eBupotUnifikasiDetilValidasis =
      await EBupotUnifikasiDetilValidasi.findAll({
        include: [
          { model: User },
          { model: EBupotUnifikasiImporData },
          { model: Cabang },
        ],
      });
    res.status(200).json(eBupotUnifikasiDetilValidasis);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupotUnifikasiDetilValidasisPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {};
  let tempInclude = [
    { model: User },
    { model: EBupotUnifikasiImporData },
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiDetilValidasi.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiDetilValidasis =
      await EBupotUnifikasiDetilValidasi.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiDetilValidasis,
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

const getEBupotUnifikasiDetilValidasisByUserPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    userIdInput: req.body.userIdInput,
  };
  let tempInclude = [
    { model: User },
    { model: EBupotUnifikasiImporData },
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiDetilValidasi.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiDetilValidasis =
      await EBupotUnifikasiDetilValidasi.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiDetilValidasis,
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

const getEBupotUnifikasiDetilValidasisByUserSearchPagination = async (
  req,
  res
) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupotUnifikasiDetilValidasiId:
      req.body.userEBupotUnifikasiDetilValidasiId,
  };
  let tempInclude = [
    { model: User },
    { model: EBupotUnifikasiImporData },
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiDetilValidasi.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiDetilValidasis =
      await EBupotUnifikasiDetilValidasi.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiDetilValidasis,
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

const getEBupotUnifikasiDetilValidasisByUserByImporDataSearchPagination =
  async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;

    let tempWhere = {
      userEBupotUnifikasiDetilValidasiId:
        req.body.userEBupotUnifikasiDetilValidasiId,
      userEBupotUnifikasiImporDataId: req.body.userEBupotUnifikasiImporDataId,
    };
    let tempInclude = [
      { model: User },
      { model: EBupotUnifikasiImporData },
      { model: Cabang },
    ];

    const totalRows = await EBupotUnifikasiDetilValidasi.count({
      where: tempWhere,
      include: tempInclude,
    });
    const totalPage = Math.ceil(totalRows / limit);
    try {
      const eBupotUnifikasiDetilValidasis =
        await EBupotUnifikasiDetilValidasi.findAll({
          where: tempWhere,
          include: tempInclude,
          offset: offset,
          limit: limit,
        });
      res.status(200).json({
        eBupotUnifikasiDetilValidasis,
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

const getEBupotUnifikasiDetilValidasiById = async (req, res) => {
  try {
    let eBupotUnifikasiDetilValidasi =
      await EBupotUnifikasiDetilValidasi.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          { model: User },
          { model: EBupotUnifikasiImporData },
          { model: Cabang },
        ],
      });

    res.status(200).json(eBupotUnifikasiDetilValidasi);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveEBupotUnifikasiDetilValidasi = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();
    const insertedEBupotUnifikasiDetilValidasi =
      await EBupotUnifikasiDetilValidasi.create(
        {
          ...req.body,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );

    // Commit transaction and respond with success
    await transaction.commit();
    res.status(201).json(insertedEBupotUnifikasiDetilValidasi);
  } catch (error) {
    if (transaction) await transaction.rollback();
    res.status(400).json({ message: error.message });
  }
};

const updateEBupotUnifikasiDetilValidasi = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let updatedEBupotUnifikasiDetilValidasi =
      await EBupotUnifikasiDetilValidasi.update(
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
    res.status(201).json(updatedEBupotUnifikasiDetilValidasi);
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteEBupotUnifikasiDetilValidasi = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupotUnifikasiDetilValidasi.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res
      .status(201)
      .json({ message: "E-Bupot Unifikasi Detil Validasi Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEBupotUnifikasiDetilValidasis,
  getEBupotUnifikasiDetilValidasisPagination,
  getEBupotUnifikasiDetilValidasisByUserPagination,
  getEBupotUnifikasiDetilValidasisByUserSearchPagination,
  getEBupotUnifikasiDetilValidasisByUserByImporDataSearchPagination,
  getEBupotUnifikasiDetilValidasiById,
  saveEBupotUnifikasiDetilValidasi,
  updateEBupotUnifikasiDetilValidasi,
  deleteEBupotUnifikasiDetilValidasi,
};
