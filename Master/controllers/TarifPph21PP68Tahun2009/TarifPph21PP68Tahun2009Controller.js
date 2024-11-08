const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const TarifPph21PP68Tahun2009 = require("../../models/TarifPph21PP68Tahun2009/TarifPph21PP68Tahun2009Model.js");
const Cabang = require("../../models/Cabang/CabangModel.js");

const getTarifPph21PP68Tahun2009s = async (req, res) => {
  try {
    const tarifPph21PP68Tahun2009s = await TarifPph21PP68Tahun2009.findAll({
      order: [["kodeTarifPph21PP68Tahun2009", "ASC"]],
      include: [{ model: Cabang }],
    });
    res.status(200).json(tarifPph21PP68Tahun2009s);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getTarifPph21PP68Tahun2009NextKode = async (req, res) => {
  try {
    let maxTarifPph21PP68Tahun2009s = await TarifPph21PP68Tahun2009.findOne({
      where: {},
      include: [],
      order: [
        ["kodeTarifPph21PP68Tahun2009", "DESC"], // Order by 'kodeTarifPph21PP68Tahun2009' in descending order to get the max value
      ],
    });

    let lastKodeTarifPph21PP68Tahun2009 = 0;
    if (maxTarifPph21PP68Tahun2009s) {
      lastKodeTarifPph21PP68Tahun2009 =
        maxTarifPph21PP68Tahun2009s.kodeTarifPph21PP68Tahun2009.slice(-2);
    }

    let nextKodeTarifPph21PP68Tahun2009 = findNextKode(
      parseInt(lastKodeTarifPph21PP68Tahun2009),
      5
    );

    let createNewTarifPph21PP68Tahun2009 = `${nextKodeTarifPph21PP68Tahun2009}`;

    res.status(200).json(createNewTarifPph21PP68Tahun2009);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getTarifPph21PP68Tahun2009sPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodeTarifPph21PP68Tahun2009: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [{ model: Cabang }];

  const totalRows = await TarifPph21PP68Tahun2009.count({
    where: tempWhere,
    include: tempInclude,
    order: [["kodeTarifPph21PP68Tahun2009", "ASC"]],
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const tarifPph21PP68Tahun2009s = await TarifPph21PP68Tahun2009.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
      order: [["kodeTarifPph21PP68Tahun2009", "ASC"]],
    });
    res.status(200).json({
      tarifPph21PP68Tahun2009s,
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

const getTarifPph21PP68Tahun2009ByJumlahPenghasilan = async (req, res) => {
  try {
    let tempTarifPph21PP68Tahun2009 = {
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

    const tarifPph21PP68Tahun2009 = await TarifPph21PP68Tahun2009.findOne({
      where: tempTarifPph21PP68Tahun2009,
      include: [{ model: Cabang }],
    });
    res.status(200).json(tarifPph21PP68Tahun2009);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getTarifPph21PP68Tahun2009ByKode = async (req, res) => {
  try {
    const tarifPph21PP68Tahun2009 = await TarifPph21PP68Tahun2009.findOne({
      where: {
        kodeTarifPph21PP68Tahun2009: req.body.kodeTarifPph21PP68Tahun2009,
      },
      include: [{ model: Cabang }],
    });
    res.status(200).json(tarifPph21PP68Tahun2009);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getTarifPph21PP68Tahun2009ById = async (req, res) => {
  try {
    const tarifPph21PP68Tahun2009 = await TarifPph21PP68Tahun2009.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Cabang }],
    });
    res.status(200).json(tarifPph21PP68Tahun2009);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveTarifPph21PP68Tahun2009 = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let maxTarifPph21PP68Tahun2009s = await TarifPph21PP68Tahun2009.findOne({
      where: {},
      order: [
        ["kodeTarifPph21PP68Tahun2009", "DESC"], // Order by 'kodeTarifPph21PP68Tahun2009' in descending order to get the max value
      ],
    });

    let lastKodeTarifPph21PP68Tahun2009 = 0;
    if (maxTarifPph21PP68Tahun2009s) {
      lastKodeTarifPph21PP68Tahun2009 =
        maxTarifPph21PP68Tahun2009s.kodeTarifPph21PP68Tahun2009.slice(-2);
    }

    let nextKodeTarifPph21PP68Tahun2009 = findNextKode(
      parseInt(lastKodeTarifPph21PP68Tahun2009),
      5
    );

    const insertedTarifPph21PP68Tahun2009 =
      await TarifPph21PP68Tahun2009.create(
        {
          ...req.body,
          kodeTarifPph21PP68Tahun2009: nextKodeTarifPph21PP68Tahun2009,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedTarifPph21PP68Tahun2009);
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

const updateTarifPph21PP68Tahun2009 = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    await TarifPph21PP68Tahun2009.update(
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
        res
          .status(200)
          .json({ message: "Tarif Pph 21 PP 68 Tahun 2009 Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `Tarif Pph 21 PP 68 Tahun 2009 ${req.params.id} not found!`,
        });
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

const deleteTarifPph21PP68Tahun2009 = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await TarifPph21PP68Tahun2009.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res
          .status(200)
          .json({ message: "Tarif Pph 21 PP 68 Tahun 2009 Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `Tarif Pph 21 PP 68 Tahun 2009 ${req.params.id} not found!`,
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

module.exports = {
  getTarifPph21PP68Tahun2009s,
  getTarifPph21PP68Tahun2009NextKode,
  getTarifPph21PP68Tahun2009sPagination,
  getTarifPph21PP68Tahun2009ByJumlahPenghasilan,
  getTarifPph21PP68Tahun2009ByKode,
  getTarifPph21PP68Tahun2009ById,
  saveTarifPph21PP68Tahun2009,
  updateTarifPph21PP68Tahun2009,
  deleteTarifPph21PP68Tahun2009,
};
