const express = require("express");
const controller = require("../../../controllers/EBupotUnifikasi/EBupotUnifikasiPosting/EBupotUnifikasiPostingController.js");
const verify = require("../../../../utils/verifyToken.js");
const eBupotUnifikasiPosting = controller.eBupotUnifikasiPosting;
const getEBupotUnifikasiPostingDopp = controller.getEBupotUnifikasiPostingDopp;
const getEBupotUnifikasiPostingsDoppPagination =
  controller.getEBupotUnifikasiPostingsDoppPagination;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/eBupotUnifikasiPosting", verifyUser, eBupotUnifikasiPosting);
router.post(
  "/getEBupotUnifikasiPostingDopp",
  verifyUser,
  getEBupotUnifikasiPostingDopp
);
router.post(
  "/eBupotUnifikasiPostingsDoppPagination",
  verifyUser,
  getEBupotUnifikasiPostingsDoppPagination
);

module.exports = router;
