const express = require("express");
const controller = require("../../../controllers/EBupotUnifikasi/EBupotUnifikasiPenyiapanSpt/EBupotUnifikasiPenyiapanSptController.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupotUnifikasiPenyiapanSpts =
  controller.getEBupotUnifikasiPenyiapanSpts;
const getEBupotUnifikasiPenyiapanSptsPagination =
  controller.getEBupotUnifikasiPenyiapanSptsPagination;
const getEBupotUnifikasiPenyiapanSptsByUserPagination =
  controller.getEBupotUnifikasiPenyiapanSptsByUserPagination;
const getEBupotUnifikasiPenyiapanSptsByUserSearchPagination =
  controller.getEBupotUnifikasiPenyiapanSptsByUserSearchPagination;
const getEBupotUnifikasiPenyiapanSptsTerkirimByUserSearchPagination =
  controller.getEBupotUnifikasiPenyiapanSptsTerkirimByUserSearchPagination;
const getEBupotUnifikasiCombinedPagination =
  controller.getEBupotUnifikasiCombinedPagination;
const getEBupotUnifikasiPenyiapanSptById =
  controller.getEBupotUnifikasiPenyiapanSptById;
const saveEBupotUnifikasiPenyiapanSpt =
  controller.saveEBupotUnifikasiPenyiapanSpt;
const kirimSptEBupotUnifikasiPenyiapanSpt =
  controller.kirimSptEBupotUnifikasiPenyiapanSpt;
const ajukanUnduhBuktiPotongEBupotUnifikasiPenyiapanSpt =
  controller.ajukanUnduhBuktiPotongEBupotUnifikasiPenyiapanSpt;
const updateEBupotUnifikasiPenyiapanSpt =
  controller.updateEBupotUnifikasiPenyiapanSpt;
const deleteEBupotUnifikasiPenyiapanSpt =
  controller.deleteEBupotUnifikasiPenyiapanSpt;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post(
  "/eBupotUnifikasiPenyiapanSpts",
  verifyUser,
  getEBupotUnifikasiPenyiapanSpts
);
router.post(
  "/eBupotUnifikasiPenyiapanSptsPagination",
  verifyUser,
  getEBupotUnifikasiPenyiapanSptsPagination
);
router.post(
  "/eBupotUnifikasiPenyiapanSptsByUserPagination",
  verifyUser,
  getEBupotUnifikasiPenyiapanSptsByUserPagination
);
router.post(
  "/eBupotUnifikasiPenyiapanSptsByUserSearchPagination",
  verifyUser,
  getEBupotUnifikasiPenyiapanSptsByUserSearchPagination
);
router.post(
  "/eBupotUnifikasiPenyiapanSptsTerkirimByUserSearchPagination",
  verifyUser,
  getEBupotUnifikasiPenyiapanSptsTerkirimByUserSearchPagination
);
router.post(
  "/eBupotUnifikasiCombinedPagination",
  verifyUser,
  getEBupotUnifikasiCombinedPagination
);
router.post(
  "/eBupotUnifikasiPenyiapanSpts/:id",
  verifyUser,
  getEBupotUnifikasiPenyiapanSptById
);
router.post(
  "/saveEBupotUnifikasiPenyiapanSpt",
  verifyUser,
  saveEBupotUnifikasiPenyiapanSpt
);
router.post(
  "/kirimSptEBupotUnifikasiPenyiapanSpt/:id",
  verifyUser,
  kirimSptEBupotUnifikasiPenyiapanSpt
);
router.post(
  "/ajukanUnduhBuktiPotongEBupotUnifikasiPenyiapanSpt/:id",
  verifyUser,
  ajukanUnduhBuktiPotongEBupotUnifikasiPenyiapanSpt
);
router.post(
  "/updateEBupotUnifikasiPenyiapanSpt/:id",
  verifyUser,
  updateEBupotUnifikasiPenyiapanSpt
);
router.post(
  "/deleteEBupotUnifikasiPenyiapanSpt/:id",
  verifyUser,
  deleteEBupotUnifikasiPenyiapanSpt
);

module.exports = router;
