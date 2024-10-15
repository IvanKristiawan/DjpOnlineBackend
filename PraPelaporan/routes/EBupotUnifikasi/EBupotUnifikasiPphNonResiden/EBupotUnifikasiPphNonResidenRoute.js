const express = require("express");
const controller = require("../../../controllers/EBupotUnifikasi/EBupotUnifikasiPphNonResiden/EBupotUnifikasiPphNonResidenController.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupotUnifikasiPphNonResidens =
  controller.getEBupotUnifikasiPphNonResidens;
const getEBupotUnifikasiPphNonResidensByUserForExcel =
  controller.getEBupotUnifikasiPphNonResidensByUserForExcel;
const getEBupotUnifikasiPphNonResidensPagination =
  controller.getEBupotUnifikasiPphNonResidensPagination;
const getEBupotUnifikasiPphNonResidensByUserPagination =
  controller.getEBupotUnifikasiPphNonResidensByUserPagination;
const getEBupotUnifikasiPphNonResidensByUserSearchPagination =
  controller.getEBupotUnifikasiPphNonResidensByUserSearchPagination;
const getEBupotUnifikasiPphNonResidenById =
  controller.getEBupotUnifikasiPphNonResidenById;
const saveEBupotUnifikasiPphNonResiden =
  controller.saveEBupotUnifikasiPphNonResiden;
const updateEBupotUnifikasiPphNonResiden =
  controller.updateEBupotUnifikasiPphNonResiden;
const statusDeleteEBupotUnifikasiPphNonResiden =
  controller.statusDeleteEBupotUnifikasiPphNonResiden;
const deleteEBupotUnifikasiPphNonResiden =
  controller.deleteEBupotUnifikasiPphNonResiden;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post(
  "/eBupotUnifikasiPphNonResidens",
  verifyUser,
  getEBupotUnifikasiPphNonResidens
);
router.post(
  "/eBupotUnifikasiPphNonResidensByUserForExcel",
  verifyUser,
  getEBupotUnifikasiPphNonResidensByUserForExcel
);
router.post(
  "/eBupotUnifikasiPphNonResidensPagination",
  verifyUser,
  getEBupotUnifikasiPphNonResidensPagination
);
router.post(
  "/eBupotUnifikasiPphNonResidensByUserPagination",
  verifyUser,
  getEBupotUnifikasiPphNonResidensByUserPagination
);
router.post(
  "/eBupotUnifikasiPphNonResidensByUserSearchPagination",
  verifyUser,
  getEBupotUnifikasiPphNonResidensByUserSearchPagination
);
router.post(
  "/eBupotUnifikasiPphNonResidens/:id",
  verifyUser,
  getEBupotUnifikasiPphNonResidenById
);
router.post(
  "/saveEBupotUnifikasiPphNonResiden",
  verifyUser,
  saveEBupotUnifikasiPphNonResiden
);
router.post(
  "/updateEBupotUnifikasiPphNonResiden/:id",
  verifyUser,
  updateEBupotUnifikasiPphNonResiden
);
router.post(
  "/statusDeleteEBupotUnifikasiPphNonResiden/:id",
  verifyUser,
  statusDeleteEBupotUnifikasiPphNonResiden
);
router.post(
  "/deleteEBupotUnifikasiPphNonResiden/:id",
  verifyUser,
  deleteEBupotUnifikasiPphNonResiden
);

module.exports = router;
