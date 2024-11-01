const express = require("express");
const controller = require("../../../controllers/EBupotUnifikasi/EBupotUnifikasiDetilValidasi/EBupotUnifikasiDetilValidasiController.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupotUnifikasiDetilValidasis =
  controller.getEBupotUnifikasiDetilValidasis;
const getEBupotUnifikasiDetilValidasisPagination =
  controller.getEBupotUnifikasiDetilValidasisPagination;
const getEBupotUnifikasiDetilValidasisByUserPagination =
  controller.getEBupotUnifikasiDetilValidasisByUserPagination;
const getEBupotUnifikasiDetilValidasisByUserSearchPagination =
  controller.getEBupotUnifikasiDetilValidasisByUserSearchPagination;
const getEBupotUnifikasiDetilValidasisByUserByImporDataSearchPagination =
  controller.getEBupotUnifikasiDetilValidasisByUserByImporDataSearchPagination;
const getEBupotUnifikasiDetilValidasiById =
  controller.getEBupotUnifikasiDetilValidasiById;
const saveEBupotUnifikasiDetilValidasi =
  controller.saveEBupotUnifikasiDetilValidasi;
const updateEBupotUnifikasiDetilValidasi =
  controller.updateEBupotUnifikasiDetilValidasi;
const deleteEBupotUnifikasiDetilValidasi =
  controller.deleteEBupotUnifikasiDetilValidasi;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post(
  "/eBupotUnifikasiDetilValidasis",
  verifyUser,
  getEBupotUnifikasiDetilValidasis
);
router.post(
  "/eBupotUnifikasiDetilValidasisPagination",
  verifyUser,
  getEBupotUnifikasiDetilValidasisPagination
);
router.post(
  "/eBupotUnifikasiDetilValidasisByUserPagination",
  verifyUser,
  getEBupotUnifikasiDetilValidasisByUserPagination
);
router.post(
  "/eBupotUnifikasiDetilValidasisByUserSearchPagination",
  verifyUser,
  getEBupotUnifikasiDetilValidasisByUserSearchPagination
);
router.post(
  "/eBupotUnifikasiDetilValidasisByUserByImporDataSearchPagination",
  verifyUser,
  getEBupotUnifikasiDetilValidasisByUserByImporDataSearchPagination
);
router.post(
  "/eBupotUnifikasiDetilValidasis/:id",
  verifyUser,
  getEBupotUnifikasiDetilValidasiById
);
router.post(
  "/saveEBupotUnifikasiDetilValidasi",
  verifyUser,
  saveEBupotUnifikasiDetilValidasi
);
router.post(
  "/updateEBupotUnifikasiDetilValidasi/:id",
  verifyUser,
  updateEBupotUnifikasiDetilValidasi
);
router.post(
  "/deleteEBupotUnifikasiDetilValidasi/:id",
  verifyUser,
  deleteEBupotUnifikasiDetilValidasi
);

module.exports = router;
