const express = require("express");
const controller = require("../../controllers/Penandatangan/PenandatanganController.js");
const verify = require("../../../utils/verifyToken.js");
const getPenandatangans = controller.getPenandatangans;
const getPenandatangansByUserByBertindakSebagai =
  controller.getPenandatangansByUserByBertindakSebagai;
const getPenandatangansPagination = controller.getPenandatangansPagination;
const getPenandatangansByUserPagination =
  controller.getPenandatangansByUserPagination;
const getPenandatangansByUserSearchPagination =
  controller.getPenandatangansByUserSearchPagination;
const getPenandatanganById = controller.getPenandatanganById;
const savePenandatangan = controller.savePenandatangan;
const updatePenandatanganStatus = controller.updatePenandatanganStatus;
const updatePenandatangan = controller.updatePenandatangan;
const deletePenandatangan = controller.deletePenandatangan;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/penandatangans", verifyUser, getPenandatangans);
router.post(
  "/penandatangansByUserByBertindakSebagai",
  verifyUser,
  getPenandatangansByUserByBertindakSebagai
);
router.post(
  "/penandatangansPagination",
  verifyUser,
  getPenandatangansPagination
);
router.post(
  "/penandatangansByUserPagination",
  verifyUser,
  getPenandatangansByUserPagination
);
router.post(
  "/penandatangansByUserSearchPagination",
  verifyUser,
  getPenandatangansByUserSearchPagination
);
router.post("/penandatangans/:id", verifyUser, getPenandatanganById);
router.post("/savePenandatangan", verifyUser, savePenandatangan);
router.post(
  "/updatePenandatanganStatus/:id",
  verifyUser,
  updatePenandatanganStatus
);
router.post("/updatePenandatangan/:id", verifyUser, updatePenandatangan);
router.post("/deletePenandatangan/:id", verifyUser, deletePenandatangan);

module.exports = router;
