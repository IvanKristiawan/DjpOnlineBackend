const express = require("express");
const controller = require("../../../controllers/EBupot2126/EBupot2126Posting/EBupot2126PostingController.js");
const verify = require("../../../../utils/verifyToken.js");
const eBupot2126Posting = controller.eBupot2126Posting;
const getEBupot2126PostingsByUserSearchPagination =
  controller.getEBupot2126PostingsByUserSearchPagination;
const getEBupot2126PostingsMasaTahunPajak =
  controller.getEBupot2126PostingsMasaTahunPajak;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/eBupot2126Posting", verifyUser, eBupot2126Posting);
router.post(
  "/eBupot2126PostingsByUserSearchPagination",
  verifyUser,
  getEBupot2126PostingsByUserSearchPagination
);
router.post(
  "/eBupot2126PostingsMasaTahunPajak",
  verifyUser,
  getEBupot2126PostingsMasaTahunPajak
);

module.exports = router;
