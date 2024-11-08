const express = require("express");
const controller = require("../../controllers/TarifPph21PP68Tahun2009/TarifPph21PP68Tahun2009Controller.js");
const verify = require("../../../utils/verifyToken.js");
const getTarifPph21PP68Tahun2009s = controller.getTarifPph21PP68Tahun2009s;
const getTarifPph21PP68Tahun2009sPagination =
  controller.getTarifPph21PP68Tahun2009sPagination;
const getTarifPph21PP68Tahun2009ByJumlahPenghasilan =
  controller.getTarifPph21PP68Tahun2009ByJumlahPenghasilan;
const getTarifPph21PP68Tahun2009ByKode =
  controller.getTarifPph21PP68Tahun2009ByKode;
const getTarifPph21PP68Tahun2009ById =
  controller.getTarifPph21PP68Tahun2009ById;
const saveTarifPph21PP68Tahun2009 = controller.saveTarifPph21PP68Tahun2009;
const updateTarifPph21PP68Tahun2009 = controller.updateTarifPph21PP68Tahun2009;
const deleteTarifPph21PP68Tahun2009 = controller.deleteTarifPph21PP68Tahun2009;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post(
  "/tarifPph21PP68Tahun2009s",
  verifyUser,
  getTarifPph21PP68Tahun2009s
);
router.post(
  "/tarifPph21PP68Tahun2009sPagination",
  verifyUser,
  getTarifPph21PP68Tahun2009sPagination
);
router.post(
  "/tarifPph21PP68Tahun2009ByJumlahPenghasilan",
  verifyUser,
  getTarifPph21PP68Tahun2009ByJumlahPenghasilan
);
router.post(
  "/tarifPph21PP68Tahun2009ByKode",
  verifyUser,
  getTarifPph21PP68Tahun2009ByKode
);
router.post(
  "/tarifPph21PP68Tahun2009s/:id",
  verifyUser,
  getTarifPph21PP68Tahun2009ById
);
router.post(
  "/saveTarifPph21PP68Tahun2009",
  verifyUser,
  saveTarifPph21PP68Tahun2009
);
router.post(
  "/updateTarifPph21PP68Tahun2009/:id",
  verifyUser,
  updateTarifPph21PP68Tahun2009
);
router.post(
  "/deleteTarifPph21PP68Tahun2009/:id",
  verifyUser,
  deleteTarifPph21PP68Tahun2009
);

module.exports = router;
