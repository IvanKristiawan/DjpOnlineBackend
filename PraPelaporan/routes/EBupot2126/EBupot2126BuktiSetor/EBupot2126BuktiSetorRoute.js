const express = require("express");
const controller = require("../../../controllers/EBupot2126/EBupot2126BuktiSetor/EBupot2126BuktiSetorController.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupot2126BuktiSetors = controller.getEBupot2126BuktiSetors;
const getEBupot2126BuktiSetorsPagination =
  controller.getEBupot2126BuktiSetorsPagination;
const getEBupot2126BuktiSetorsByUserPagination =
  controller.getEBupot2126BuktiSetorsByUserPagination;
const getEBupot2126BuktiSetorsByUserSearchPagination =
  controller.getEBupot2126BuktiSetorsByUserSearchPagination;
const getEBupot2126BuktiSetorsByUserForPenyiapanSptPagination =
  controller.getEBupot2126BuktiSetorsByUserForPenyiapanSptPagination;
const getEBupot2126BuktiSetorById = controller.getEBupot2126BuktiSetorById;
const saveEBupot2126BuktiSetor = controller.saveEBupot2126BuktiSetor;
const transaksiEBupot2126BuktiSetor = controller.transaksiEBupot2126BuktiSetor;
const updateEBupot2126BuktiSetor = controller.updateEBupot2126BuktiSetor;
const statusDeleteEBupot2126BuktiSetor =
  controller.statusDeleteEBupot2126BuktiSetor;
const deleteEBupot2126BuktiSetor = controller.deleteEBupot2126BuktiSetor;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/eBupot2126BuktiSetors", verifyUser, getEBupot2126BuktiSetors);
router.post(
  "/eBupot2126BuktiSetorsPagination",
  verifyUser,
  getEBupot2126BuktiSetorsPagination
);
router.post(
  "/eBupot2126BuktiSetorsByUserPagination",
  verifyUser,
  getEBupot2126BuktiSetorsByUserPagination
);
router.post(
  "/eBupot2126BuktiSetorsByUserSearchPagination",
  verifyUser,
  getEBupot2126BuktiSetorsByUserSearchPagination
);
router.post(
  "/eBupot2126BuktiSetorsByUserForPenyiapanSptPagination",
  verifyUser,
  getEBupot2126BuktiSetorsByUserForPenyiapanSptPagination
);
router.post(
  "/eBupot2126BuktiSetors/:id",
  verifyUser,
  getEBupot2126BuktiSetorById
);
router.post("/saveEBupot2126BuktiSetor", verifyUser, saveEBupot2126BuktiSetor);
router.post(
  "/transaksiEBupot2126BuktiSetor",
  verifyUser,
  transaksiEBupot2126BuktiSetor
);
router.post(
  "/updateEBupot2126BuktiSetor/:id",
  verifyUser,
  updateEBupot2126BuktiSetor
);
router.post(
  "/statusDeleteEBupot2126BuktiSetor/:id",
  verifyUser,
  statusDeleteEBupot2126BuktiSetor
);
router.post(
  "/deleteEBupot2126BuktiSetor/:id",
  verifyUser,
  deleteEBupot2126BuktiSetor
);

module.exports = router;
