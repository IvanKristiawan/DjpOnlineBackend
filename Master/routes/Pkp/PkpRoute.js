const express = require("express");
const controller = require("../../controllers/Pkp/PkpController.js");
const verify = require("../../../utils/verifyToken.js");
const getPkps = controller.getPkps;
const getPkpsPagination = controller.getPkpsPagination;
const getPkpTarifByJumlahPenghasilan =
  controller.getPkpTarifByJumlahPenghasilan;
const getPkpByKode = controller.getPkpByKode;
const getPkpById = controller.getPkpById;
const savePkp = controller.savePkp;
const updatePkp = controller.updatePkp;
const deletePkp = controller.deletePkp;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/pkps", verifyUser, getPkps);
router.post("/pkpsPagination", verifyUser, getPkpsPagination);
router.post(
  "/pkpTarifByJumlahPenghasilan",
  verifyUser,
  getPkpTarifByJumlahPenghasilan
);
router.post("/pkpByKode", verifyUser, getPkpByKode);
router.post("/pkps/:id", verifyUser, getPkpById);
router.post("/savePkp", verifyUser, savePkp);
router.post("/updatePkp/:id", verifyUser, updatePkp);
router.post("/deletePkp/:id", verifyUser, deletePkp);

module.exports = router;
