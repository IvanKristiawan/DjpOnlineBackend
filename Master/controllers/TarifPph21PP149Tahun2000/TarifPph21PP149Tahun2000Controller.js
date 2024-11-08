const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const TarifPph21PP149Tahun2000 = require("../../models/TarifPph21PP149Tahun2000/TarifPph21PP149Tahun2000Model.js");
const Cabang = require("../../models/Cabang/CabangModel.js");

const getTarifPph21PP149Tahun2000s = async (req, res) => {
  try {
    const tarifPph21PP149Tahun2000s = await TarifPph21PP149Tahun2000.findAll({
      order: [["kodeTarifPph21PP149Tahun2000", "ASC"]],
      include: [{ model: Cabang }],
    });
    res.status(200).json(tarifPph21PP149Tahun2000s);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getTarifPph21PP149Tahun2000NextKode = async (req, res) => {
  try {
    let maxTarifPph21PP149Tahun2000s = await TarifPph21PP149Tahun2000.findOne({
      where: {},
      include: [],
      order: [
        ["kodeTarifPph21PP149Tahun2000", "DESC"], // Order by 'kodeTarifPph21PP149Tahun2000' in descending order to get the max value
      ],
    });

    let lastKodeTarifPph21PP149Tahun2000 = 0;
    if (maxTarifPph21PP149Tahun2000s) {
      lastKodeTarifPph21PP149Tahun2000 =
        maxTarifPph21PP149Tahun2000s.kodeTarifPph21PP149Tahun2000.slice(-2);
    }

    let nextKodeTarifPph21PP149Tahun2000 = findNextKode(
      parseInt(lastKodeTarifPph21PP149Tahun2000),
      5
    );

    let createNewTarifPph21PP149Tahun2000 = `${nextKodeTarifPph21PP149Tahun2000}`;

    res.status(200).json(createNewTarifPph21PP149Tahun2000);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getTarifPph21PP149Tahun2000sPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        kodeTarifPph21PP149Tahun2000: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [{ model: Cabang }];

  const totalRows = await TarifPph21PP149Tahun2000.count({
    where: tempWhere,
    include: tempInclude,
    order: [["kodeTarifPph21PP149Tahun2000", "ASC"]],
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const tarifPph21PP149Tahun2000s = await TarifPph21PP149Tahun2000.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
      order: [["kodeTarifPph21PP149Tahun2000", "ASC"]],
    });
    res.status(200).json({
      tarifPph21PP149Tahun2000s,
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

const getTarifPph21PP149Tahun2000ByJumlahPenghasilan = async (req, res) => {
  try {
    let tempTarifPph21PP149Tahun2000 = {
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

    const tarifPph21PP149Tahun2000 = await TarifPph21PP149Tahun2000.findOne({
      where: tempTarifPph21PP149Tahun2000,
      include: [{ model: Cabang }],
    });
    res.status(200).json(tarifPph21PP149Tahun2000);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getTarifPph21PP149Tahun2000ByKode = async (req, res) => {
  try {
    const TarifPph21PP149Tahun2000 = await TarifPph21PP149Tahun2000.findOne({
      where: {
        kodeTarifPph21PP149Tahun2000: req.body.kodeTarifPph21PP149Tahun2000,
      },
      include: [{ model: Cabang }],
    });
    res.status(200).json(TarifPph21PP149Tahun2000);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getTarifPph21PP149Tahun2000ById = async (req, res) => {
  try {
    const tarifPph21PP149Tahun2000 = await TarifPph21PP149Tahun2000.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Cabang }],
    });
    res.status(200).json(tarifPph21PP149Tahun2000);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveTarifPph21PP149Tahun2000 = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let maxTarifPph21PP149Tahun2000s = await TarifPph21PP149Tahun2000.findOne({
      where: {},
      order: [
        ["kodeTarifPph21PP149Tahun2000", "DESC"], // Order by 'kodeTarifPph21PP149Tahun2000' in descending order to get the max value
      ],
    });

    let lastKodeTarifPph21PP149Tahun2000 = 0;
    if (maxTarifPph21PP149Tahun2000s) {
      lastKodeTarifPph21PP149Tahun2000 =
        maxTarifPph21PP149Tahun2000s.kodeTarifPph21PP149Tahun2000.slice(-2);
    }

    let nextKodeTarifPph21PP149Tahun2000 = findNextKode(
      parseInt(lastKodeTarifPph21PP149Tahun2000),
      5
    );

    const insertedTarifPph21PP149Tahun2000 =
      await TarifPph21PP149Tahun2000.create(
        {
          ...req.body,
          kodeTarifPph21PP149Tahun2000: nextKodeTarifPph21PP149Tahun2000,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedTarifPph21PP149Tahun2000);
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

const updateTarifPph21PP149Tahun2000 = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    await TarifPph21PP149Tahun2000.update(
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
          .json({ message: "Tarif Pph 21 PP 149 Tahun 2000 Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `Tarif Pph 21 PP 149 Tahun 2000 ${req.params.id} not found!`,
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

const deleteTarifPph21PP149Tahun2000 = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await TarifPph21PP149Tahun2000.destroy({
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
          .json({ message: "Tarif Pph 21 PP 149 Tahun 2000 Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `Tarif Pph 21 PP 149 Tahun 2000 ${req.params.id} not found!`,
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
  getTarifPph21PP149Tahun2000s,
  getTarifPph21PP149Tahun2000NextKode,
  getTarifPph21PP149Tahun2000sPagination,
  getTarifPph21PP149Tahun2000ByJumlahPenghasilan,
  getTarifPph21PP149Tahun2000ByKode,
  getTarifPph21PP149Tahun2000ById,
  saveTarifPph21PP149Tahun2000,
  updateTarifPph21PP149Tahun2000,
  deleteTarifPph21PP149Tahun2000,
};
