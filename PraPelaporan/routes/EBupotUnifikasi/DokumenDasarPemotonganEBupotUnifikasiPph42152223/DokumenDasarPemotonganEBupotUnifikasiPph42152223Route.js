const express = require("express");
const controller = require("../../../controllers/EBupotUnifikasi/DokumenDasarPemotonganEBupotUnifikasiPph42152223/DokumenDasarPemotonganEBupotUnifikasiPph42152223Controller.js");
const verify = require("../../../../utils/verifyToken.js");
const getDokumenDasarPemotonganEBupotUnifikasiPph42152223s =
  controller.getDokumenDasarPemotonganEBupotUnifikasiPph42152223s;
const getDokumenDasarPemotonganEBupotUnifikasiPph42152223sPagination =
  controller.getDokumenDasarPemotonganEBupotUnifikasiPph42152223sPagination;
const getDokumenDasarPemotonganEBupotUnifikasiPph42152223ById =
  controller.getDokumenDasarPemotonganEBupotUnifikasiPph42152223ById;
const saveDokumenDasarPemotonganEBupotUnifikasiPph42152223 =
  controller.saveDokumenDasarPemotonganEBupotUnifikasiPph42152223;
const updateDokumenDasarPemotonganEBupotUnifikasiPph42152223 =
  controller.updateDokumenDasarPemotonganEBupotUnifikasiPph42152223;
const deleteDokumenDasarPemotonganEBupotUnifikasiPph42152223 =
  controller.deleteDokumenDasarPemotonganEBupotUnifikasiPph42152223;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post(
  "/dokumenDasarPemotonganEBupotUnifikasiPph42152223s",
  verifyUser,
  getDokumenDasarPemotonganEBupotUnifikasiPph42152223s
);
router.post(
  "/dokumenDasarPemotonganEBupotUnifikasiPph42152223sPagination",
  verifyUser,
  getDokumenDasarPemotonganEBupotUnifikasiPph42152223sPagination
);
router.post(
  "/dokumenDasarPemotonganEBupotUnifikasiPph42152223s/:id",
  verifyUser,
  getDokumenDasarPemotonganEBupotUnifikasiPph42152223ById
);
router.post(
  "/saveDokumenDasarPemotonganEBupotUnifikasiPph42152223",
  verifyUser,
  saveDokumenDasarPemotonganEBupotUnifikasiPph42152223
);
router.post(
  "/updateDokumenDasarPemotonganEBupotUnifikasiPph42152223/:id",
  verifyUser,
  updateDokumenDasarPemotonganEBupotUnifikasiPph42152223
);
router.post(
  "/deleteDokumenDasarPemotonganEBupotUnifikasiPph42152223/:id",
  verifyUser,
  deleteDokumenDasarPemotonganEBupotUnifikasiPph42152223
);

module.exports = router;
