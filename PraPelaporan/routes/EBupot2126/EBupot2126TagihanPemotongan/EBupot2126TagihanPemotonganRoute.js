const express = require("express");
const controller = require("../../../controllers/EBupot2126/EBupot2126TagihanPemotongan/EBupot2126TagihanPemotonganController.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupot2126TagihanPemotongans =
  controller.getEBupot2126TagihanPemotongans;
const getEBupot2126TagihanPemotongansPagination =
  controller.getEBupot2126TagihanPemotongansPagination;
const getEBupot2126TagihanPemotongansByUserPagination =
  controller.getEBupot2126TagihanPemotongansByUserPagination;
const getEBupot2126TagihanPemotongansByUserSearchPagination =
  controller.getEBupot2126TagihanPemotongansByUserSearchPagination;
const getEBupot2126TagihanPemotonganByNtpnUser =
  controller.getEBupot2126TagihanPemotonganByNtpnUser;
const getEBupot2126TagihanPemotonganById =
  controller.getEBupot2126TagihanPemotonganById;
const saveEBupot2126TagihanPemotongan =
  controller.saveEBupot2126TagihanPemotongan;
const generateIdBillingEBupot2126TagihanPemotongan =
  controller.generateIdBillingEBupot2126TagihanPemotongan;
const setorEBupot2126TagihanPemotongan =
  controller.setorEBupot2126TagihanPemotongan;
const updateEBupot2126TagihanPemotongan =
  controller.updateEBupot2126TagihanPemotongan;
const deleteEBupot2126TagihanPemotongan =
  controller.deleteEBupot2126TagihanPemotongan;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post(
  "/eBupot2126TagihanPemotongans",
  verifyUser,
  getEBupot2126TagihanPemotongans
);
router.post(
  "/eBupot2126TagihanPemotongansPagination",
  verifyUser,
  getEBupot2126TagihanPemotongansPagination
);
router.post(
  "/eBupot2126TagihanPemotongansByUserPagination",
  verifyUser,
  getEBupot2126TagihanPemotongansByUserPagination
);
router.post(
  "/eBupot2126TagihanPemotongansByUserSearchPagination",
  verifyUser,
  getEBupot2126TagihanPemotongansByUserSearchPagination
);
router.post(
  "/eBupot2126TagihanPemotonganByNtpnUser",
  verifyUser,
  getEBupot2126TagihanPemotonganByNtpnUser
);
router.post(
  "/eBupot2126TagihanPemotongans/:id",
  verifyUser,
  getEBupot2126TagihanPemotonganById
);
router.post(
  "/saveEBupot2126TagihanPemotongan",
  verifyUser,
  saveEBupot2126TagihanPemotongan
);
router.post(
  "/generateIdBillingEBupot2126TagihanPemotongan/:id",
  verifyUser,
  generateIdBillingEBupot2126TagihanPemotongan
);
router.post(
  "/setorEBupot2126TagihanPemotongan/:id",
  verifyUser,
  setorEBupot2126TagihanPemotongan
);
router.post(
  "/updateEBupot2126TagihanPemotongan/:id",
  verifyUser,
  updateEBupot2126TagihanPemotongan
);
router.post(
  "/deleteEBupot2126TagihanPemotongan/:id",
  verifyUser,
  deleteEBupot2126TagihanPemotongan
);

module.exports = router;
