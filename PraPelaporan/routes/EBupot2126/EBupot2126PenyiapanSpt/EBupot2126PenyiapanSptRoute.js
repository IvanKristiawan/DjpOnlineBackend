const express = require("express");
const controller = require("../../../controllers/EBupot2126/EBupot2126PenyiapanSpt/EBupot2126PenyiapanSptController.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupot2126PenyiapanSpts = controller.getEBupot2126PenyiapanSpts;
const getEBupot2126PenyiapanSptsPagination =
  controller.getEBupot2126PenyiapanSptsPagination;
const getEBupot2126PenyiapanSptsByUserPagination =
  controller.getEBupot2126PenyiapanSptsByUserPagination;
const getEBupot2126PenyiapanSptsByUserSearchPagination =
  controller.getEBupot2126PenyiapanSptsByUserSearchPagination;
const getEBupot2126PenyiapanSptsTerkirimByUserSearchPagination =
  controller.getEBupot2126PenyiapanSptsTerkirimByUserSearchPagination;
const getEBupot2126PenyiapanSptById = controller.getEBupot2126PenyiapanSptById;
const saveEBupot2126PenyiapanSpt = controller.saveEBupot2126PenyiapanSpt;
const kirimSptEBupot2126PenyiapanSpt =
  controller.kirimSptEBupot2126PenyiapanSpt;
const ajukanUnduhBuktiPotongEBupot2126PenyiapanSpt =
  controller.ajukanUnduhBuktiPotongEBupot2126PenyiapanSpt;
const updateEBupot2126PenyiapanSpt = controller.updateEBupot2126PenyiapanSpt;
const deleteEBupot2126PenyiapanSpt = controller.deleteEBupot2126PenyiapanSpt;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/eBupot2126PenyiapanSpts", verifyUser, getEBupot2126PenyiapanSpts);
router.post(
  "/eBupot2126PenyiapanSptsPagination",
  verifyUser,
  getEBupot2126PenyiapanSptsPagination
);
router.post(
  "/eBupot2126PenyiapanSptsByUserPagination",
  verifyUser,
  getEBupot2126PenyiapanSptsByUserPagination
);
router.post(
  "/eBupot2126PenyiapanSptsByUserSearchPagination",
  verifyUser,
  getEBupot2126PenyiapanSptsByUserSearchPagination
);
router.post(
  "/eBupot2126PenyiapanSptsTerkirimByUserSearchPagination",
  verifyUser,
  getEBupot2126PenyiapanSptsTerkirimByUserSearchPagination
);
router.post(
  "/eBupot2126PenyiapanSpts/:id",
  verifyUser,
  getEBupot2126PenyiapanSptById
);
router.post(
  "/saveEBupot2126PenyiapanSpt",
  verifyUser,
  saveEBupot2126PenyiapanSpt
);
router.post(
  "/kirimSptEBupot2126PenyiapanSpt/:id",
  verifyUser,
  kirimSptEBupot2126PenyiapanSpt
);
router.post(
  "/ajukanUnduhBuktiPotongEBupot2126PenyiapanSpt/:id",
  verifyUser,
  ajukanUnduhBuktiPotongEBupot2126PenyiapanSpt
);
router.post(
  "/updateEBupot2126PenyiapanSpt/:id",
  verifyUser,
  updateEBupot2126PenyiapanSpt
);
router.post(
  "/deleteEBupot2126PenyiapanSpt/:id",
  verifyUser,
  deleteEBupot2126PenyiapanSpt
);

module.exports = router;
