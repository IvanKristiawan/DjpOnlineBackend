const express = require("express");
const controller = require("../../../controllers/EBupot2126/EBupot2126Posting/EBupot2126PostingController.js");
const verify = require("../../../../utils/verifyToken.js");
const eBupot2126Posting = controller.eBupot2126Posting;
const getEBupot2126PostingsByUserSearchPagination =
  controller.getEBupot2126PostingsByUserSearchPagination;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/eBupot2126Posting", verifyUser, eBupot2126Posting);
router.post(
  "/eBupot2126PostingsByUserSearchPagination",
  verifyUser,
  getEBupot2126PostingsByUserSearchPagination
);

module.exports = router;
