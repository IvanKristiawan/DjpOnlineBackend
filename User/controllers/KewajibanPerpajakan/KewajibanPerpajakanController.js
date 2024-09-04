const { sequelize } = require("../../../config/Database.js");
const KewajibanPerpajakan = require("../../models/KewajibanPerpajakan/KewajibanPerpajakanModel.js");
const User = require("../../models/UserModel.js");

const getKewajibanPerpajakans = async (req, res) => {
  try {
    const kewajibanPerpajakans = await KewajibanPerpajakan.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(kewajibanPerpajakans);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getKewajibanPerpajakanById = async (req, res) => {
  try {
    const kewajibanPerpajakan = await KewajibanPerpajakan.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }],
    });
    res.status(200).json(kewajibanPerpajakan);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getKewajibanPerpajakanByUserId = async (req, res) => {
  try {
    const kewajibanPerpajakan = await KewajibanPerpajakan.findOne({
      where: {
        userId: req.body.userId,
      },
      include: [{ model: User }],
    });
    res.status(200).json(kewajibanPerpajakan);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveKewajibanPerpajakan = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const insertedKewajibanPerpajakan = await KewajibanPerpajakan.create(
      {
        ...req.body,
      },
      { transaction }
    );
    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedKewajibanPerpajakan);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateKewajibanPerpajakan = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await KewajibanPerpajakan.update(
      { ...req.body },
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
        res.status(200).json({ message: "Kewajiban Perpajakan Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({
            message: `Kewajiban Perpajakan ${req.params.id} not found!`,
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

const deleteKewajibanPerpajakan = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    await KewajibanPerpajakan.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "Kewajiban Perpajakan Deleted!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res
          .status(400)
          .json({
            message: `Kewajiban Perpajakan ${req.params.id} not found!`,
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
  getKewajibanPerpajakans,
  getKewajibanPerpajakanById,
  getKewajibanPerpajakanByUserId,
  saveKewajibanPerpajakan,
  updateKewajibanPerpajakan,
  deleteKewajibanPerpajakan,
};
