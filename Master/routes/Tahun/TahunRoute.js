const express = require("express");
const controller = require("../../controllers/Tahun/TahunController.js");
const verify = require("../../../utils/verifyToken.js");
const getTahuns = controller.getTahuns;
const getTahunsPagination = controller.getTahunsPagination;
const getTahunNextKode = controller.getTahunNextKode;
const getTahunById = controller.getTahunById;
const saveTahun = controller.saveTahun;
const updateTahun = controller.updateTahun;
const deleteTahun = controller.deleteTahun;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/tahuns", verifyUser, getTahuns);
router.post("/tahunsPagination", verifyUser, getTahunsPagination);
router.post("/tahunNextKode", verifyUser, getTahunNextKode);
router.post("/tahuns/:id", verifyUser, getTahunById);
router.post("/saveTahun", verifyUser, saveTahun);
router.post("/updateTahun/:id", verifyUser, updateTahun);
router.post("/deleteTahun/:id", verifyUser, deleteTahun);

module.exports = router;
