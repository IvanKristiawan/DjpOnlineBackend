const express = require("express");
const controller = require("../../../controllers/EBupotUnifikasi/DokumenDasarPemotonganEBupotUnifikasiPphNonResiden/DokumenDasarPemotonganEBupotUnifikasiPphNonResidenController.js");
const verify = require("../../../../utils/verifyToken.js");
const getDokumenDasarPemotonganEBupotUnifikasiPphNonResidens =
  controller.getDokumenDasarPemotonganEBupotUnifikasiPphNonResidens;
const getDokumenDasarPemotonganEBupotUnifikasiPphNonResidensPagination =
  controller.getDokumenDasarPemotonganEBupotUnifikasiPphNonResidensPagination;
const getDokumenDasarPemotonganEBupotUnifikasiPphNonResidenById =
  controller.getDokumenDasarPemotonganEBupotUnifikasiPphNonResidenById;
const saveDokumenDasarPemotonganEBupotUnifikasiPphNonResiden =
  controller.saveDokumenDasarPemotonganEBupotUnifikasiPphNonResiden;
const updateDokumenDasarPemotonganEBupotUnifikasiPphNonResiden =
  controller.updateDokumenDasarPemotonganEBupotUnifikasiPphNonResiden;
const deleteDokumenDasarPemotonganEBupotUnifikasiPphNonResiden =
  controller.deleteDokumenDasarPemotonganEBupotUnifikasiPphNonResiden;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post(
  "/dokumenDasarPemotonganEBupotUnifikasiPphNonResidens",
  verifyUser,
  getDokumenDasarPemotonganEBupotUnifikasiPphNonResidens
);
router.post(
  "/dokumenDasarPemotonganEBupotUnifikasiPphNonResidensPagination",
  verifyUser,
  getDokumenDasarPemotonganEBupotUnifikasiPphNonResidensPagination
);
router.post(
  "/dokumenDasarPemotonganEBupotUnifikasiPphNonResidens/:id",
  verifyUser,
  getDokumenDasarPemotonganEBupotUnifikasiPphNonResidenById
);
router.post(
  "/saveDokumenDasarPemotonganEBupotUnifikasiPphNonResiden",
  verifyUser,
  saveDokumenDasarPemotonganEBupotUnifikasiPphNonResiden
);
router.post(
  "/updateDokumenDasarPemotonganEBupotUnifikasiPphNonResiden/:id",
  verifyUser,
  updateDokumenDasarPemotonganEBupotUnifikasiPphNonResiden
);
router.post(
  "/deleteDokumenDasarPemotonganEBupotUnifikasiPphNonResiden/:id",
  verifyUser,
  deleteDokumenDasarPemotonganEBupotUnifikasiPphNonResiden
);

module.exports = router;
