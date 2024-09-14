const express = require("express");
const controller = require("../../controllers/KelompokKegiatanEkonomiKlu/KelompokKegiatanEkonomiKluController.js");
const verify = require("../../../utils/verifyToken.js");
const getKelompokKegiatanEkonomiKlus =
  controller.getKelompokKegiatanEkonomiKlus;
const getKelompokKegiatanEkonomiKlusPagination =
  controller.getKelompokKegiatanEkonomiKlusPagination;
const getKelompokKegiatanEkonomiKluById =
  controller.getKelompokKegiatanEkonomiKluById;
const saveKelompokKegiatanEkonomiKlu =
  controller.saveKelompokKegiatanEkonomiKlu;
const updateKelompokKegiatanEkonomiKlu =
  controller.updateKelompokKegiatanEkonomiKlu;
const deleteKelompokKegiatanEkonomiKlu =
  controller.deleteKelompokKegiatanEkonomiKlu;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post(
  "/kelompokKegiatanEkonomiKlus",
  verifyUser,
  getKelompokKegiatanEkonomiKlus
);
router.post(
  "/kelompokKegiatanEkonomiKlusPagination",
  verifyUser,
  getKelompokKegiatanEkonomiKlusPagination
);
router.post(
  "/kelompokKegiatanEkonomiKlus/:id",
  verifyUser,
  getKelompokKegiatanEkonomiKluById
);
router.post(
  "/saveKelompokKegiatanEkonomiKlu",
  verifyUser,
  saveKelompokKegiatanEkonomiKlu
);
router.post(
  "/updateKelompokKegiatanEkonomiKlu/:id",
  verifyUser,
  updateKelompokKegiatanEkonomiKlu
);
router.post(
  "/deleteKelompokKegiatanEkonomiKlu/:id",
  verifyUser,
  deleteKelompokKegiatanEkonomiKlu
);

module.exports = router;
