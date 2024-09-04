const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const Marketing = require("../../models/Marketing/MarketingModel.js");
const Cabang = require("../../models/Cabang/CabangModel.js");
const { findNextKode } = require("../../../helper/helper");

const getMarketings = async (req, res) => {
  try {
    const marketings = await Marketing.findAll({
      where: {
        cabangId: req.body.kodeCabang,
      },
      order: [["kodeMarketing", "ASC"]],
      include: [{ model: Cabang }],
    });
    res.status(200).json(marketings);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getMarketingsPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodeMarketing: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        namaMarketing: {
          [Op.like]: "%" + search + "%",
        },
      },
      {
        teleponMarketing: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };

  const totalRows = await Marketing.count({
    where: tempWhere,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const marketings = await Marketing.findAll({
      where: tempWhere,
      include: [{ model: Cabang }],
      offset: offset,
      limit: limit,
      order: [["kodeMarketing", "ASC"]],
    });
    res.status(200).json({
      marketings,
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

const getMarketingNextKode = async (req, res) => {
  try {
    const marketings = await Marketing.findAll({
      where: {
        cabangId: req.body.kodeCabang,
      },
      attributes: ["kodeMarketing"],
    });

    let tempMaxKodeMarketing = 0;

    for (let marketing of marketings) {
      let tempKodeMarketing = parseInt(marketing.kodeMarketing);

      if (tempKodeMarketing > tempMaxKodeMarketing) {
        tempMaxKodeMarketing = tempKodeMarketing;
      }
    }

    let nextKodeMarketing = findNextKode(tempMaxKodeMarketing, 3);
    res.status(200).json(nextKodeMarketing);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getMarketingById = async (req, res) => {
  try {
    const marketing = await Marketing.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Cabang }],
    });
    res.status(200).json(marketing);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveMarketing = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  const marketings = await Marketing.findAll({
    where: {
      cabangId: req.body.kodeCabang,
    },
    attributes: ["kodeMarketing"],
  });

  let tempMaxKodeMarketing = 0;

  for (let marketing of marketings) {
    let tempKodeMarketing = parseInt(marketing.kodeMarketing);

    if (tempKodeMarketing > tempMaxKodeMarketing) {
      tempMaxKodeMarketing = tempKodeMarketing;
    }
  }

  let nextKodeMarketing = findNextKode(tempMaxKodeMarketing, 3);
  try {
    transaction = await sequelize.transaction();
    const insertedMarketing = await Marketing.create(
      {
        kodeMarketing: nextKodeMarketing,
        ...req.body,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedMarketing);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateMarketing = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await Marketing.update(
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
        res.status(200).json({ message: "Marketing Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Marketing ${req.params.id} not found!` });
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

const deleteMarketing = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await Marketing.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Marketing Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({ message: `Marketing ${req.params.id} not found!` });
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
  getMarketings,
  getMarketingsPagination,
  getMarketingNextKode,
  getMarketingById,
  saveMarketing,
  updateMarketing,
  deleteMarketing,
};
