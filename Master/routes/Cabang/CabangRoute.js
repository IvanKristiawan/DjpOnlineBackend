const express = require("express");
const controller = require("../../controllers/Cabang/CabangController.js");
const verify = require("../../../utils/verifyToken.js");
const getCabangs = controller.getCabangs;
const getCabangsPagination = controller.getCabangsPagination;
const getCabangNextKode = controller.getCabangNextKode;
const getCabangById = controller.getCabangById;
const saveCabang = controller.saveCabang;
const updateCabang = controller.updateCabang;
const deleteCabang = controller.deleteCabang;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/cabangs", verifyUser, getCabangs);
router.post("/cabangsPagination", verifyUser, getCabangsPagination);
router.post("/cabangNextKode", verifyUser, getCabangNextKode);
router.post("/cabangs/:id", verifyUser, getCabangById);
router.post("/saveCabang", saveCabang);
router.post("/updateCabang/:id", verifyUser, updateCabang);
router.post("/deleteCabang/:id", verifyUser, deleteCabang);

module.exports = router;
