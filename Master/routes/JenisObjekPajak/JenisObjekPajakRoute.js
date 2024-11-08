const express = require("express");
const controller = require("../../controllers/JenisObjekPajak/JenisObjekPajakController.js");
const verify = require("../../../utils/verifyToken.js");
const getJenisObjekPajaks = controller.getJenisObjekPajaks;
const getJenisObjekPajaksBupot = controller.getJenisObjekPajaksBupot;
const getJenisObjekPajaksPagination = controller.getJenisObjekPajaksPagination;
const getJenisObjekPajakByKode = controller.getJenisObjekPajakByKode;
const getJenisObjekPajakByNama = controller.getJenisObjekPajakByNama;
const getJenisObjekPajakById = controller.getJenisObjekPajakById;
const saveJenisObjekPajak = controller.saveJenisObjekPajak;
const updateJenisObjekPajak = controller.updateJenisObjekPajak;
const deleteJenisObjekPajak = controller.deleteJenisObjekPajak;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/jenisObjekPajaks", verifyUser, getJenisObjekPajaks);
router.post("/jenisObjekPajaksBupot", verifyUser, getJenisObjekPajaksBupot);
router.post(
  "/jenisObjekPajaksPagination",
  verifyUser,
  getJenisObjekPajaksPagination
);
router.post("/jenisObjekPajakByKode", verifyUser, getJenisObjekPajakByKode);
router.post("/jenisObjekPajakByNama", verifyUser, getJenisObjekPajakByNama);
router.post("/jenisObjekPajaks/:id", verifyUser, getJenisObjekPajakById);
router.post("/saveJenisObjekPajak", verifyUser, saveJenisObjekPajak);
router.post("/updateJenisObjekPajak/:id", verifyUser, updateJenisObjekPajak);
router.post("/deleteJenisObjekPajak/:id", verifyUser, deleteJenisObjekPajak);

module.exports = router;
