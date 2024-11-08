const express = require("express");
const controller = require("../../controllers/ObjekPajak/ObjekPajakController.js");
const verify = require("../../../utils/verifyToken.js");
const getObjekPajaks = controller.getObjekPajaks;
const getObjekPajaksBupot = controller.getObjekPajaksBupot;
const getObjekPajaksBupot2126 = controller.getObjekPajaksBupot2126;
const getObjekPajakNextKode = controller.getObjekPajakNextKode;
const getObjekPajaksByJenisSetoran = controller.getObjekPajaksByJenisSetoran;
const getObjekPajaksPagination = controller.getObjekPajaksPagination;
const getObjekPajakByKode = controller.getObjekPajakByKode;
const getObjekPajakById = controller.getObjekPajakById;
const saveObjekPajak = controller.saveObjekPajak;
const updateObjekPajak = controller.updateObjekPajak;
const deleteObjekPajak = controller.deleteObjekPajak;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/objekPajaks", verifyUser, getObjekPajaks);
router.post("/objekPajaksBupot", verifyUser, getObjekPajaksBupot);
router.post("/objekPajaksBupot2126", verifyUser, getObjekPajaksBupot2126);
router.post("/objekPajakNextKode", verifyUser, getObjekPajakNextKode);
router.post(
  "/objekPajaksByJenisSetoran",
  verifyUser,
  getObjekPajaksByJenisSetoran
);
router.post("/objekPajaksPagination", verifyUser, getObjekPajaksPagination);
router.post("/objekPajakByKode", verifyUser, getObjekPajakByKode);
router.post("/objekPajaks/:id", verifyUser, getObjekPajakById);
router.post("/saveObjekPajak", verifyUser, saveObjekPajak);
router.post("/updateObjekPajak/:id", verifyUser, updateObjekPajak);
router.post("/deleteObjekPajak/:id", verifyUser, deleteObjekPajak);

module.exports = router;
