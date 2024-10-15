const express = require("express");
const controller = require("../../../controllers/EBupotUnifikasi/EBupotUnifikasiPphDisetorSendiri/EBupotUnifikasiPphDisetorSendiriController.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupotUnifikasiPphDisetorSendiris =
  controller.getEBupotUnifikasiPphDisetorSendiris;
const getEBupotUnifikasiPphDisetorSendirisPagination =
  controller.getEBupotUnifikasiPphDisetorSendirisPagination;
const getEBupotUnifikasiPphDisetorSendirisByUserPagination =
  controller.getEBupotUnifikasiPphDisetorSendirisByUserPagination;
const getEBupotUnifikasiPphDisetorSendirisByUserSearchPagination =
  controller.getEBupotUnifikasiPphDisetorSendirisByUserSearchPagination;
const getEBupotUnifikasiPphDisetorSendiriById =
  controller.getEBupotUnifikasiPphDisetorSendiriById;
const saveEBupotUnifikasiPphDisetorSendiri =
  controller.saveEBupotUnifikasiPphDisetorSendiri;
const updateEBupotUnifikasiPphDisetorSendiri =
  controller.updateEBupotUnifikasiPphDisetorSendiri;
const statusDeleteEBupotUnifikasiPphDisetorSendiri =
  controller.statusDeleteEBupotUnifikasiPphDisetorSendiri;
const deleteEBupotUnifikasiPphDisetorSendiri =
  controller.deleteEBupotUnifikasiPphDisetorSendiri;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post(
  "/eBupotUnifikasiPphDisetorSendiris",
  verifyUser,
  getEBupotUnifikasiPphDisetorSendiris
);
router.post(
  "/eBupotUnifikasiPphDisetorSendirisPagination",
  verifyUser,
  getEBupotUnifikasiPphDisetorSendirisPagination
);
router.post(
  "/eBupotUnifikasiPphDisetorSendirisByUserPagination",
  verifyUser,
  getEBupotUnifikasiPphDisetorSendirisByUserPagination
);
router.post(
  "/eBupotUnifikasiPphDisetorSendirisByUserSearchPagination",
  verifyUser,
  getEBupotUnifikasiPphDisetorSendirisByUserSearchPagination
);
router.post(
  "/eBupotUnifikasiPphDisetorSendiris/:id",
  verifyUser,
  getEBupotUnifikasiPphDisetorSendiriById
);
router.post(
  "/saveEBupotUnifikasiPphDisetorSendiri",
  verifyUser,
  saveEBupotUnifikasiPphDisetorSendiri
);
router.post(
  "/updateEBupotUnifikasiPphDisetorSendiri/:id",
  verifyUser,
  updateEBupotUnifikasiPphDisetorSendiri
);
router.post(
  "/statusDeleteEBupotUnifikasiPphDisetorSendiri/:id",
  verifyUser,
  statusDeleteEBupotUnifikasiPphDisetorSendiri
);
router.post(
  "/deleteEBupotUnifikasiPphDisetorSendiri/:id",
  verifyUser,
  deleteEBupotUnifikasiPphDisetorSendiri
);

module.exports = router;
