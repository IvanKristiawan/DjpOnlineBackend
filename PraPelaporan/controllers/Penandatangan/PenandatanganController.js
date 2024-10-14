const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const Penandatangan = require("../../models/Penandatangan/PenandatanganModel.js");
const User = require("../../../User/models/UserModel.js");
const EBilling = require("../../../EBilling/models/EBilling/EBillingModel.js");
const Cabang = require("../../../Master/models/Cabang/CabangModel.js");
const { findNextKode } = require("../../../helper/helper");

const getPenandatangans = async (req, res) => {
  try {
    const penandatangans = await Penandatangan.findAll({
      include: [{ model: User }, { model: Cabang }],
    });
    res.status(200).json(penandatangans);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getPenandatangansByUserByBertindakSebagai = async (req, res) => {
  try {
    const penandatangans = await Penandatangan.findAll({
      where: {
        userPenandatanganId: req.body.userPenandatanganId,
        bertindakSebagai: req.body.bertindakSebagai,
      },
      include: [{ model: User }, { model: Cabang }],
    });
    res.status(200).json(penandatangans);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getPenandatangansPagination = async (req, res) => {
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

  const totalRows = await Penandatangan.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const penandatangans = await Penandatangan.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      penandatangans,
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

const getPenandatangansByUserPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    userPenandatanganId: req.body.userPenandatanganId,
    [Op.or]: [
      {
        nomorIdentitas: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [{ model: User }, { model: Cabang }];

  const totalRows = await Penandatangan.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const penandatangans = await Penandatangan.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      penandatangans,
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

const getPenandatangansByUserSearchPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.body.kataKunciSearch || "";
  const offset = limit * page;
  let tempWhere = {
    userPenandatanganId: req.body.userPenandatanganId,
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
      userPenandatanganId: req.body.userPenandatanganId,
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
      userPenandatanganId: req.body.userPenandatanganId,
      [Op.or]: [
        {
          namaIdentitas: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    };
  }

  const totalRows = await Penandatangan.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const penandatangans = await Penandatangan.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      penandatangans,
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

const getPenandatanganById = async (req, res) => {
  try {
    const penandatangan = await Penandatangan.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }, { model: Cabang }],
    });
    res.status(200).json(penandatangan);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const savePenandatangan = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const penandatangan = await Penandatangan.findOne({
      where: {
        nomorIdentitas: req.body.nomorIdentitas,
      },
      include: [{ model: User }, { model: Cabang }],
    });

    if (penandatangan) {
      // Error 400 = Kesalahan dari sisi user
      res
        .status(400)
        .json({ message: "PT004 - Data Penandatangan sudah pernah disimpan." });
      return;
    }

    const insertedPenandatangan = await Penandatangan.create(
      {
        ...req.body,
        userPenandatanganId: req.body.userId,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedPenandatangan);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updatePenandatanganStatus = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const penandatangan = await Penandatangan.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }, { model: Cabang }],
    });

    await Penandatangan.update(
      {
        status: !penandatangan.status,
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
        res.status(200).json({ message: "Penandatangan Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `Penandatangan ${req.params.id} not found!`,
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

const updatePenandatangan = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await Penandatangan.update(
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
        res.status(200).json({ message: "Penandatangan Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `Penandatangan ${req.params.id} not found!`,
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

const deletePenandatangan = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await Penandatangan.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json({ message: "Penandatangan Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPenandatangans,
  getPenandatangansByUserByBertindakSebagai,
  getPenandatangansPagination,
  getPenandatangansByUserPagination,
  getPenandatangansByUserSearchPagination,
  getPenandatanganById,
  savePenandatangan,
  updatePenandatanganStatus,
  updatePenandatangan,
  deletePenandatangan,
};
