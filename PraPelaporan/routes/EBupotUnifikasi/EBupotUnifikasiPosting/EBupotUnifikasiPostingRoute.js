const express = require("express");
const controller = require("../../../controllers/EBupotUnifikasi/EBupotUnifikasiPosting/EBupotUnifikasiPostingController.js");
const verify = require("../../../../utils/verifyToken.js");
const eBupotUnifikasiPosting = controller.eBupotUnifikasiPosting;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/eBupotUnifikasiPosting", verifyUser, eBupotUnifikasiPosting);

module.exports = router;
