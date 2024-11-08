const express = require("express");
const controller = require("../../controllers/TarifPph21PP149Tahun2000/TarifPph21PP149Tahun2000Controller.js");
const verify = require("../../../utils/verifyToken.js");
const getTarifPph21PP149Tahun2000s = controller.getTarifPph21PP149Tahun2000s;
const getTarifPph21PP149Tahun2000sPagination =
  controller.getTarifPph21PP149Tahun2000sPagination;
const getTarifPph21PP149Tahun2000ByJumlahPenghasilan =
  controller.getTarifPph21PP149Tahun2000ByJumlahPenghasilan;
const getTarifPph21PP149Tahun2000ByKode =
  controller.getTarifPph21PP149Tahun2000ByKode;
const getTarifPph21PP149Tahun2000ById =
  controller.getTarifPph21PP149Tahun2000ById;
const saveTarifPph21PP149Tahun2000 = controller.saveTarifPph21PP149Tahun2000;
const updateTarifPph21PP149Tahun2000 =
  controller.updateTarifPph21PP149Tahun2000;
const deleteTarifPph21PP149Tahun2000 =
  controller.deleteTarifPph21PP149Tahun2000;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post(
  "/tarifPph21PP149Tahun2000s",
  verifyUser,
  getTarifPph21PP149Tahun2000s
);
router.post(
  "/tarifPph21PP149Tahun2000sPagination",
  verifyUser,
  getTarifPph21PP149Tahun2000sPagination
);
router.post(
  "/tarifPph21PP149Tahun2000ByJumlahPenghasilan",
  verifyUser,
  getTarifPph21PP149Tahun2000ByJumlahPenghasilan
);
router.post(
  "/tarifPph21PP149Tahun2000ByKode",
  verifyUser,
  getTarifPph21PP149Tahun2000ByKode
);
router.post(
  "/tarifPph21PP149Tahun2000s/:id",
  verifyUser,
  getTarifPph21PP149Tahun2000ById
);
router.post(
  "/saveTarifPph21PP149Tahun2000",
  verifyUser,
  saveTarifPph21PP149Tahun2000
);
router.post(
  "/updateTarifPph21PP149Tahun2000/:id",
  verifyUser,
  updateTarifPph21PP149Tahun2000
);
router.post(
  "/deleteTarifPph21PP149Tahun2000/:id",
  verifyUser,
  deleteTarifPph21PP149Tahun2000
);

module.exports = router;
