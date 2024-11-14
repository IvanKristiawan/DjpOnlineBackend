const express = require("express");
const controller = require("../../../controllers/EBupot2126/EBupot2126Pph21Tahunan/EBupot2126Pph21TahunanController.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupot2126Pph21Tahunans = controller.getEBupot2126Pph21Tahunans;
const getEBupot2126Pph21TahunansByUserForExcel =
  controller.getEBupot2126Pph21TahunansByUserForExcel;
const getEBupot2126Pph21TahunansPagination =
  controller.getEBupot2126Pph21TahunansPagination;
const getEBupot2126Pph21TahunansByUserPagination =
  controller.getEBupot2126Pph21TahunansByUserPagination;
const getEBupot2126Pph21TahunansByUserSearchPagination =
  controller.getEBupot2126Pph21TahunansByUserSearchPagination;
const getEBupot2126Pph21TahunanById = controller.getEBupot2126Pph21TahunanById;
const saveEBupot2126Pph21Tahunan = controller.saveEBupot2126Pph21Tahunan;
const updateEBupot2126Pph21Tahunan = controller.updateEBupot2126Pph21Tahunan;
const statusDeleteEBupot2126Pph21Tahunan =
  controller.statusDeleteEBupot2126Pph21Tahunan;
const deleteEBupot2126Pph21Tahunan = controller.deleteEBupot2126Pph21Tahunan;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/eBupot2126Pph21Tahunans", verifyUser, getEBupot2126Pph21Tahunans);
router.post(
  "/eBupot2126Pph21TahunansByUserForExcel",
  verifyUser,
  getEBupot2126Pph21TahunansByUserForExcel
);
router.post(
  "/eBupot2126Pph21TahunansPagination",
  verifyUser,
  getEBupot2126Pph21TahunansPagination
);
router.post(
  "/eBupot2126Pph21TahunansByUserPagination",
  verifyUser,
  getEBupot2126Pph21TahunansByUserPagination
);
router.post(
  "/eBupot2126Pph21TahunansByUserSearchPagination",
  verifyUser,
  getEBupot2126Pph21TahunansByUserSearchPagination
);
router.post(
  "/eBupot2126Pph21Tahunans/:id",
  verifyUser,
  getEBupot2126Pph21TahunanById
);
router.post(
  "/saveEBupot2126Pph21Tahunan",
  verifyUser,
  saveEBupot2126Pph21Tahunan
);
router.post(
  "/updateEBupot2126Pph21Tahunan/:id",
  verifyUser,
  updateEBupot2126Pph21Tahunan
);
router.post(
  "/statusDeleteEBupot2126Pph21Tahunan/:id",
  verifyUser,
  statusDeleteEBupot2126Pph21Tahunan
);
router.post(
  "/deleteEBupot2126Pph21Tahunan/:id",
  verifyUser,
  deleteEBupot2126Pph21Tahunan
);

module.exports = router;
