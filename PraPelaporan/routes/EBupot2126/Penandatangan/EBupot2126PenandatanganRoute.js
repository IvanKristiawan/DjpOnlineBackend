const express = require("express");
const controller = require("../../../controllers/EBupot2126/Penandatangan/EBupot2126PenandatanganController.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupot2126Penandatangans = controller.getEBupot2126Penandatangans;
const getEBupot2126PenandatangansByUserByBertindakSebagai =
  controller.getEBupot2126PenandatangansByUserByBertindakSebagai;
const getEBupot2126PenandatangansPagination =
  controller.getEBupot2126PenandatangansPagination;
const getEBupot2126PenandatangansByUserPagination =
  controller.getEBupot2126PenandatangansByUserPagination;
const getEBupot2126PenandatangansByUserSearchPagination =
  controller.getEBupot2126PenandatangansByUserSearchPagination;
const getEBupot2126PenandatanganById =
  controller.getEBupot2126PenandatanganById;
const saveEBupot2126Penandatangan = controller.saveEBupot2126Penandatangan;
const updateEBupot2126PenandatanganStatus =
  controller.updateEBupot2126PenandatanganStatus;
const updateEBupot2126Penandatangan = controller.updateEBupot2126Penandatangan;
const deleteEBupot2126Penandatangan = controller.deleteEBupot2126Penandatangan;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post(
  "/eBupot2126Penandatangans",
  verifyUser,
  getEBupot2126Penandatangans
);
router.post(
  "/eBupot2126PenandatangansByUserByBertindakSebagai",
  verifyUser,
  getEBupot2126PenandatangansByUserByBertindakSebagai
);
router.post(
  "/eBupot2126PenandatangansPagination",
  verifyUser,
  getEBupot2126PenandatangansPagination
);
router.post(
  "/eBupot2126PenandatangansByUserPagination",
  verifyUser,
  getEBupot2126PenandatangansByUserPagination
);
router.post(
  "/eBupot2126PenandatangansByUserSearchPagination",
  verifyUser,
  getEBupot2126PenandatangansByUserSearchPagination
);
router.post(
  "/eBupot2126Penandatangans/:id",
  verifyUser,
  getEBupot2126PenandatanganById
);
router.post(
  "/saveEBupot2126Penandatangan",
  verifyUser,
  saveEBupot2126Penandatangan
);
router.post(
  "/updateEBupot2126PenandatanganStatus/:id",
  verifyUser,
  updateEBupot2126PenandatanganStatus
);
router.post(
  "/updateEBupot2126Penandatangan/:id",
  verifyUser,
  updateEBupot2126Penandatangan
);
router.post(
  "/deleteEBupot2126Penandatangan/:id",
  verifyUser,
  deleteEBupot2126Penandatangan
);

module.exports = router;
