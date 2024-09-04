const express = require("express");
const controller = require("../../controllers/KewajibanPerpajakan/KewajibanPerpajakanController.js");
const verify = require("../../../utils/verifyToken.js");
const getKewajibanPerpajakans = controller.getKewajibanPerpajakans;
const getKewajibanPerpajakanById = controller.getKewajibanPerpajakanById;
const getKewajibanPerpajakanByUserId =
  controller.getKewajibanPerpajakanByUserId;
const saveKewajibanPerpajakan = controller.saveKewajibanPerpajakan;
const updateKewajibanPerpajakan = controller.updateKewajibanPerpajakan;
const deleteKewajibanPerpajakan = controller.deleteKewajibanPerpajakan;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/kewajibanPerpajakan", verifyUser, getKewajibanPerpajakans);
router.post("/kewajibanPerpajakan/:id", verifyUser, getKewajibanPerpajakanById);
router.post(
  "/kewajibanPerpajakanByUserId",
  verifyUser,
  getKewajibanPerpajakanByUserId
);
router.post("/saveKewajibanPerpajakan", verifyUser, saveKewajibanPerpajakan);
router.post(
  "/updateKewajibanPerpajakan/:id",
  verifyUser,
  updateKewajibanPerpajakan
);
router.post(
  "/deleteKewajibanPerpajakan/:id",
  verifyUser,
  deleteKewajibanPerpajakan
);

module.exports = router;
