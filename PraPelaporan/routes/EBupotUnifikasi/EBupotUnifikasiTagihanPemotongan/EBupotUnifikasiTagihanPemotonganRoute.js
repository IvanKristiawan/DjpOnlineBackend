const express = require("express");
const controller = require("../../../controllers/EBupotUnifikasi/EBupotUnifikasiTagihanPemotongan/EBupotUnifikasiTagihanPemotonganController.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupotUnifikasiTagihanPemotongans =
  controller.getEBupotUnifikasiTagihanPemotongans;
const getEBupotUnifikasiTagihanPemotongansPagination =
  controller.getEBupotUnifikasiTagihanPemotongansPagination;
const getEBupotUnifikasiTagihanPemotongansByUserPagination =
  controller.getEBupotUnifikasiTagihanPemotongansByUserPagination;
const getEBupotUnifikasiTagihanPemotongansByUserSearchPagination =
  controller.getEBupotUnifikasiTagihanPemotongansByUserSearchPagination;
const getEBupotUnifikasiTagihanPemotonganById =
  controller.getEBupotUnifikasiTagihanPemotonganById;
const saveEBupotUnifikasiTagihanPemotongan =
  controller.saveEBupotUnifikasiTagihanPemotongan;
const generateIdBillingEBupotUnifikasiTagihanPemotongan =
  controller.generateIdBillingEBupotUnifikasiTagihanPemotongan;
const updateEBupotUnifikasiTagihanPemotongan =
  controller.updateEBupotUnifikasiTagihanPemotongan;
const deleteEBupotUnifikasiTagihanPemotongan =
  controller.deleteEBupotUnifikasiTagihanPemotongan;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post(
  "/eBupotUnifikasiTagihanPemotongans",
  verifyUser,
  getEBupotUnifikasiTagihanPemotongans
);
router.post(
  "/eBupotUnifikasiTagihanPemotongansPagination",
  verifyUser,
  getEBupotUnifikasiTagihanPemotongansPagination
);
router.post(
  "/eBupotUnifikasiTagihanPemotongansByUserPagination",
  verifyUser,
  getEBupotUnifikasiTagihanPemotongansByUserPagination
);
router.post(
  "/eBupotUnifikasiTagihanPemotongansByUserSearchPagination",
  verifyUser,
  getEBupotUnifikasiTagihanPemotongansByUserSearchPagination
);
router.post(
  "/eBupotUnifikasiTagihanPemotongans/:id",
  verifyUser,
  getEBupotUnifikasiTagihanPemotonganById
);
router.post(
  "/saveEBupotUnifikasiTagihanPemotongan",
  verifyUser,
  saveEBupotUnifikasiTagihanPemotongan
);
router.post(
  "/generateIdBillingEBupotUnifikasiTagihanPemotongan/:id",
  verifyUser,
  generateIdBillingEBupotUnifikasiTagihanPemotongan
);
router.post(
  "/updateEBupotUnifikasiTagihanPemotongan/:id",
  verifyUser,
  updateEBupotUnifikasiTagihanPemotongan
);
router.post(
  "/deleteEBupotUnifikasiTagihanPemotongan/:id",
  verifyUser,
  deleteEBupotUnifikasiTagihanPemotongan
);

module.exports = router;
