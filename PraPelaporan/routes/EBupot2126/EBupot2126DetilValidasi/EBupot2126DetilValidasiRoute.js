const express = require("express");
const controller = require("../../../controllers/EBupot2126/EBupot2126DetilValidasi/EBupot2126DetilValidasiController.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupot2126DetilValidasis = controller.getEBupot2126DetilValidasis;
const getEBupot2126DetilValidasisPagination =
  controller.getEBupot2126DetilValidasisPagination;
const getEBupot2126DetilValidasisByUserPagination =
  controller.getEBupot2126DetilValidasisByUserPagination;
const getEBupot2126DetilValidasisByUserSearchPagination =
  controller.getEBupot2126DetilValidasisByUserSearchPagination;
const getEBupot2126DetilValidasisByUserByImporDataSearchPagination =
  controller.getEBupot2126DetilValidasisByUserByImporDataSearchPagination;
const getEBupot2126DetilValidasiById =
  controller.getEBupot2126DetilValidasiById;
const saveEBupot2126DetilValidasi = controller.saveEBupot2126DetilValidasi;
const updateEBupot2126DetilValidasi = controller.updateEBupot2126DetilValidasi;
const deleteEBupot2126DetilValidasi = controller.deleteEBupot2126DetilValidasi;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post(
  "/eBupot2126DetilValidasis",
  verifyUser,
  getEBupot2126DetilValidasis
);
router.post(
  "/eBupot2126DetilValidasisPagination",
  verifyUser,
  getEBupot2126DetilValidasisPagination
);
router.post(
  "/eBupot2126DetilValidasisByUserPagination",
  verifyUser,
  getEBupot2126DetilValidasisByUserPagination
);
router.post(
  "/eBupot2126DetilValidasisByUserSearchPagination",
  verifyUser,
  getEBupot2126DetilValidasisByUserSearchPagination
);
router.post(
  "/eBupot2126DetilValidasisByUserByImporDataSearchPagination",
  verifyUser,
  getEBupot2126DetilValidasisByUserByImporDataSearchPagination
);
router.post(
  "/eBupot2126DetilValidasis/:id",
  verifyUser,
  getEBupot2126DetilValidasiById
);
router.post(
  "/saveEBupot2126DetilValidasi",
  verifyUser,
  saveEBupot2126DetilValidasi
);
router.post(
  "/updateEBupot2126DetilValidasi/:id",
  verifyUser,
  updateEBupot2126DetilValidasi
);
router.post(
  "/deleteEBupot2126DetilValidasi/:id",
  verifyUser,
  deleteEBupot2126DetilValidasi
);

module.exports = router;
