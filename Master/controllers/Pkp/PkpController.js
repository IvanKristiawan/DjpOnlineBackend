const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const Pkp = require("../../models/Pkp/PkpModel.js");
const Cabang = require("../../models/Cabang/CabangModel.js");

const getPkps = async (req, res) => {
  try {
    const pkps = await Pkp.findAll({
      order: [["kodePkp", "ASC"]],
      include: [{ model: Cabang }],
    });
    res.status(200).json(pkps);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getPkpNextKode = async (req, res) => {
  try {
    let maxPkps = await Pkp.findOne({
      where: {},
      include: [],
      order: [
        ["kodePkp", "DESC"], // Order by 'kodePkp' in descending order to get the max value
      ],
    });

    let lastKodePkp = 0;
    if (maxPkps) {
      lastKodePkp = maxPkps.kodePkp.slice(-2);
    }

    let nextKodePkp = findNextKode(parseInt(lastKodePkp), 5);

    let createNewPkp = `${nextKodePkp}`;

    res.status(200).json(createNewPkp);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getPkpsPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodePkp: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [{ model: Cabang }];

  const totalRows = await Pkp.count({
    where: tempWhere,
    include: tempInclude,
    order: [["kodePkp", "ASC"]],
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const pkps = await Pkp.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
      order: [["kodePkp", "ASC"]],
    });
    res.status(200).json({
      pkps,
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

const getPkpTarifByJumlahPenghasilan = async (req, res) => {
  try {
    let tempPkp = {
      [Op.and]: [
        {
          jumlahPenghasilanMin: {
            [Op.lte]: req.body.jumlahPenghasilan,
          },
        },
        {
          jumlahPenghasilanMax: {
            [Op.gte]: req.body.jumlahPenghasilan,
          },
        },
      ],
    };

    const pkp = await Pkp.findOne({
      where: tempPkp,
      include: [{ model: Cabang }],
    });
    res.status(200).json(pkp);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getPkpByKode = async (req, res) => {
  try {
    const Pkp = await Pkp.findOne({
      where: {
        kodePkp: req.body.kodePkp,
      },
      include: [{ model: Cabang }],
    });
    res.status(200).json(Pkp);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getPkpById = async (req, res) => {
  try {
    const pkp = await Pkp.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Cabang }],
    });
    res.status(200).json(pkp);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const savePkp = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let maxPkps = await Pkp.findOne({
      where: {},
      order: [
        ["kodePkp", "DESC"], // Order by 'kodePkp' in descending order to get the max value
      ],
    });

    let lastKodePkp = 0;
    if (maxPkps) {
      lastKodePkp = maxPkps.kodePkp.slice(-2);
    }

    let nextKodePkp = findNextKode(parseInt(lastKodePkp), 5);

    const insertedPkp = await Pkp.create(
      {
        ...req.body,
        kodePkp: nextKodePkp,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedPkp);
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

const updatePkp = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    await Pkp.update(
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
        res.status(200).json({ message: "Pkp Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({ message: `Pkp ${req.params.id} not found!` });
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

const deletePkp = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await Pkp.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Pkp Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({ message: `Pkp ${req.params.id} not found!` });
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
  getPkps,
  getPkpNextKode,
  getPkpsPagination,
  getPkpTarifByJumlahPenghasilan,
  getPkpByKode,
  getPkpById,
  savePkp,
  updatePkp,
  deletePkp,
};
