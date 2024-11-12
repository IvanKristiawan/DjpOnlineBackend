const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupot2126Penandatangan = require("../../../models/EBupot2126/Penandatangan/EBupot2126PenandatanganModel.js");
const User = require("../../../../User/models/UserModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
const { findNextKode } = require("../../../../helper/helper");

const getEBupot2126Penandatangans = async (req, res) => {
  try {
    const eBupot2126Penandatangans = await EBupot2126Penandatangan.findAll({
      include: [{ model: User }, { model: Cabang }],
    });
    res.status(200).json(eBupot2126Penandatangans);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupot2126PenandatangansByUserByBertindakSebagai = async (
  req,
  res
) => {
  try {
    const eBupot2126Penandatangans = await EBupot2126Penandatangan.findAll({
      where: {
        userEBupot2126PenandatanganId: req.body.userEBupot2126PenandatanganId,
        bertindakSebagai: req.body.bertindakSebagai,
      },
      include: [{ model: User }, { model: Cabang }],
    });
    res.status(200).json(eBupot2126Penandatangans);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupot2126PenandatangansPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        nomorIdentitas: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [{ model: User }, { model: Cabang }];

  const totalRows = await EBupot2126Penandatangan.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126Penandatangans = await EBupot2126Penandatangan.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126Penandatangans,
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

const getEBupot2126PenandatangansByUserPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    userEBupot2126PenandatanganId: req.body.userEBupot2126PenandatanganId,
    [Op.or]: [
      {
        nomorIdentitas: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [{ model: User }, { model: Cabang }];

  const totalRows = await EBupot2126Penandatangan.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126Penandatangans = await EBupot2126Penandatangan.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126Penandatangans,
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

const getEBupot2126PenandatangansByUserSearchPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.body.kataKunciSearch || "";
  const offset = limit * page;
  let tempWhere = {
    userEBupot2126PenandatanganId: req.body.userEBupot2126PenandatanganId,
    [Op.or]: [
      {
        nomorIdentitas: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        namaIdentitas: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [{ model: User }, { model: Cabang }];

  if (req.body.pencairanBerdasarkan === "Nomor Identitas") {
    tempWhere = {
      userEBupot2126PenandatanganId: req.body.userEBupot2126PenandatanganId,
      [Op.or]: [
        {
          nomorIdentitas: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    };
  } else if (req.body.pencairanBerdasarkan === "Nama") {
    tempWhere = {
      userEBupot2126PenandatanganId: req.body.userEBupot2126PenandatanganId,
      [Op.or]: [
        {
          namaIdentitas: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    };
  }

  const totalRows = await EBupot2126Penandatangan.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126Penandatangans = await EBupot2126Penandatangan.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126Penandatangans,
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

const getEBupot2126PenandatanganById = async (req, res) => {
  try {
    const eBupot2126Penandatangan = await EBupot2126Penandatangan.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }, { model: Cabang }],
    });
    res.status(200).json(eBupot2126Penandatangan);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveEBupot2126Penandatangan = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const eBupot2126Penandatangan = await EBupot2126Penandatangan.findOne({
      where: {
        nomorIdentitas: req.body.nomorIdentitas,
      },
      include: [{ model: User }, { model: Cabang }],
    });

    if (eBupot2126Penandatangan) {
      // Error 400 = Kesalahan dari sisi user
      res.status(400).json({
        message: "PT004 - Data EBupot2126Penandatangan sudah pernah disimpan.",
      });
      return;
    }

    const insertedEBupot2126Penandatangan =
      await EBupot2126Penandatangan.create(
        {
          ...req.body,
          userEBupot2126PenandatanganId: req.body.userId,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedEBupot2126Penandatangan);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateEBupot2126PenandatanganStatus = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const eBupot2126Penandatangan = await EBupot2126Penandatangan.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }, { model: Cabang }],
    });

    await EBupot2126Penandatangan.update(
      {
        status: !eBupot2126Penandatangan.status,
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
        res.status(200).json({ message: "EBupot2126Penandatangan Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `EBupot2126Penandatangan ${req.params.id} not found!`,
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

const updateEBupot2126Penandatangan = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupot2126Penandatangan.update(
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
    ).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "EBupot2126Penandatangan Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `EBupot2126Penandatangan ${req.params.id} not found!`,
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

const deleteEBupot2126Penandatangan = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupot2126Penandatangan.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json({ message: "EBupot2126Penandatangan Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEBupot2126Penandatangans,
  getEBupot2126PenandatangansByUserByBertindakSebagai,
  getEBupot2126PenandatangansPagination,
  getEBupot2126PenandatangansByUserPagination,
  getEBupot2126PenandatangansByUserSearchPagination,
  getEBupot2126PenandatanganById,
  saveEBupot2126Penandatangan,
  updateEBupot2126PenandatanganStatus,
  updateEBupot2126Penandatangan,
  deleteEBupot2126Penandatangan,
};
