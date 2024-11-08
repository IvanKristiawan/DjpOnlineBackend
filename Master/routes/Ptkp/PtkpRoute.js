const express = require("express");
const controller = require("../../controllers/Ptkp/PtkpController.js");
const verify = require("../../../utils/verifyToken.js");
const getPtkps = controller.getPtkps;
const getPtkpsBupot = controller.getPtkpsBupot;
const getPtkpsPagination = controller.getPtkpsPagination;
const getPtkpByKode = controller.getPtkpByKode;
const getPtkpByNama = controller.getPtkpByNama;
const getPtkpById = controller.getPtkpById;
const savePtkp = controller.savePtkp;
const updatePtkp = controller.updatePtkp;
const deletePtkp = controller.deletePtkp;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/ptkps", verifyUser, getPtkps);
router.post("/ptkpsBupot", verifyUser, getPtkpsBupot);
router.post("/ptkpsPagination", verifyUser, getPtkpsPagination);
router.post("/ptkpByKode", verifyUser, getPtkpByKode);
router.post("/ptkpByNama", verifyUser, getPtkpByNama);
router.post("/ptkps/:id", verifyUser, getPtkpById);
router.post("/savePtkp", verifyUser, savePtkp);
router.post("/updatePtkp/:id", verifyUser, updatePtkp);
router.post("/deletePtkp/:id", verifyUser, deletePtkp);

module.exports = router;
