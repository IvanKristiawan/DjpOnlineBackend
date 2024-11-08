const express = require("express");
const controller = require("../../controllers/Ter/TerController.js");
const verify = require("../../../utils/verifyToken.js");
const getTers = controller.getTers;
const getTersBupot = controller.getTersBupot;
const getTersPagination = controller.getTersPagination;
const getTerTarifByJumlahPenghasilan =
  controller.getTerTarifByJumlahPenghasilan;
const getTerByKode = controller.getTerByKode;
const getTerById = controller.getTerById;
const saveTer = controller.saveTer;
const updateTer = controller.updateTer;
const deleteTer = controller.deleteTer;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/ters", verifyUser, getTers);
router.post("/tersBupot", verifyUser, getTersBupot);
router.post("/tersPagination", verifyUser, getTersPagination);
router.post(
  "/terTarifByJumlahPenghasilan",
  verifyUser,
  getTerTarifByJumlahPenghasilan
);
router.post("/terByKode", verifyUser, getTerByKode);
router.post("/ters/:id", verifyUser, getTerById);
router.post("/saveTer", verifyUser, saveTer);
router.post("/updateTer/:id", verifyUser, updateTer);
router.post("/deleteTer/:id", verifyUser, deleteTer);

module.exports = router;
