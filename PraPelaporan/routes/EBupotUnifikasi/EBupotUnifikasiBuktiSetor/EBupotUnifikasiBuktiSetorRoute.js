const express = require("express");
const controller = require("../../../controllers/EBupotUnifikasi/EBupotUnifikasiBuktiSetor/EBupotUnifikasiBuktiSetorController.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupotUnifikasiBuktiSetors = controller.getEBupotUnifikasiBuktiSetors;
const getEBupotUnifikasiBuktiSetorsPagination =
  controller.getEBupotUnifikasiBuktiSetorsPagination;
const getEBupotUnifikasiBuktiSetorsByUserPagination =
  controller.getEBupotUnifikasiBuktiSetorsByUserPagination;
const getEBupotUnifikasiBuktiSetorsByUserSearchPagination =
  controller.getEBupotUnifikasiBuktiSetorsByUserSearchPagination;
const getEBupotUnifikasiBuktiSetorsByUserForPenyiapanSptPagination =
  controller.getEBupotUnifikasiBuktiSetorsByUserForPenyiapanSptPagination;
const getEBupotUnifikasiBuktiSetorById =
  controller.getEBupotUnifikasiBuktiSetorById;
const saveEBupotUnifikasiBuktiSetor = controller.saveEBupotUnifikasiBuktiSetor;
const transaksiEBupotUnifikasiBuktiSetor =
  controller.transaksiEBupotUnifikasiBuktiSetor;
const updateEBupotUnifikasiBuktiSetor =
  controller.updateEBupotUnifikasiBuktiSetor;
const statusDeleteEBupotUnifikasiBuktiSetor =
  controller.statusDeleteEBupotUnifikasiBuktiSetor;
const deleteEBupotUnifikasiBuktiSetor =
  controller.deleteEBupotUnifikasiBuktiSetor;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post(
  "/eBupotUnifikasiBuktiSetors",
  verifyUser,
  getEBupotUnifikasiBuktiSetors
);
router.post(
  "/eBupotUnifikasiBuktiSetorsPagination",
  verifyUser,
  getEBupotUnifikasiBuktiSetorsPagination
);
router.post(
  "/eBupotUnifikasiBuktiSetorsByUserPagination",
  verifyUser,
  getEBupotUnifikasiBuktiSetorsByUserPagination
);
router.post(
  "/eBupotUnifikasiBuktiSetorsByUserSearchPagination",
  verifyUser,
  getEBupotUnifikasiBuktiSetorsByUserSearchPagination
);
router.post(
  "/eBupotUnifikasiBuktiSetorsByUserForPenyiapanSptPagination",
  verifyUser,
  getEBupotUnifikasiBuktiSetorsByUserForPenyiapanSptPagination
);
router.post(
  "/eBupotUnifikasiBuktiSetors/:id",
  verifyUser,
  getEBupotUnifikasiBuktiSetorById
);
router.post(
  "/saveEBupotUnifikasiBuktiSetor",
  verifyUser,
  saveEBupotUnifikasiBuktiSetor
);
router.post(
  "/transaksiEBupotUnifikasiBuktiSetor",
  verifyUser,
  transaksiEBupotUnifikasiBuktiSetor
);
router.post(
  "/updateEBupotUnifikasiBuktiSetor/:id",
  verifyUser,
  updateEBupotUnifikasiBuktiSetor
);
router.post(
  "/statusDeleteEBupotUnifikasiBuktiSetor/:id",
  verifyUser,
  statusDeleteEBupotUnifikasiBuktiSetor
);
router.post(
  "/deleteEBupotUnifikasiBuktiSetor/:id",
  verifyUser,
  deleteEBupotUnifikasiBuktiSetor
);

module.exports = router;
