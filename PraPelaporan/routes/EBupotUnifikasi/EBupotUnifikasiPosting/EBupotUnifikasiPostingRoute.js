const express = require("express");
const controller = require("../../../controllers/EBupotUnifikasi/EBupotUnifikasiPosting/EBupotUnifikasiPostingController.js");
const verify = require("../../../../utils/verifyToken.js");
const eBupotUnifikasiPosting = controller.eBupotUnifikasiPosting;
const getEBupotUnifikasiPostingDoss = controller.getEBupotUnifikasiPostingDoss;
const getEBupotUnifikasiPostingsDossPagination =
  controller.getEBupotUnifikasiPostingsDossPagination;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/eBupotUnifikasiPosting", verifyUser, eBupotUnifikasiPosting);
router.post(
  "/getEBupotUnifikasiPostingDoss",
  verifyUser,
  getEBupotUnifikasiPostingDoss
);
router.post(
  "/eBupotUnifikasiPostingsDossPagination",
  verifyUser,
  getEBupotUnifikasiPostingsDossPagination
);

module.exports = router;
