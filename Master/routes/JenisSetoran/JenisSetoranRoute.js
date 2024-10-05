const express = require("express");
const controller = require("../../controllers/JenisSetoran/JenisSetoranController.js");
const verify = require("../../../utils/verifyToken.js");
const getJenisSetorans = controller.getJenisSetorans;
const getJenisSetoransByJenisPajak = controller.getJenisSetoransByJenisPajak;
const getJenisSetoransByKodeJenisPajak =
  controller.getJenisSetoransByKodeJenisPajak;
const getJenisSetoransPagination = controller.getJenisSetoransPagination;
const getJenisSetoranById = controller.getJenisSetoranById;
const saveJenisSetoran = controller.saveJenisSetoran;
const updateJenisSetoran = controller.updateJenisSetoran;
const deleteJenisSetoran = controller.deleteJenisSetoran;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/jenisSetorans", verifyUser, getJenisSetorans);
router.post(
  "/jenisSetoransByJenisPajak",
  verifyUser,
  getJenisSetoransByJenisPajak
);
router.post(
  "/jenisSetoransByKodeJenisPajak",
  verifyUser,
  getJenisSetoransByKodeJenisPajak
);
router.post("/jenisSetoransPagination", verifyUser, getJenisSetoransPagination);
router.post("/jenisSetorans/:id", verifyUser, getJenisSetoranById);
router.post("/saveJenisSetoran", verifyUser, saveJenisSetoran);
router.post("/updateJenisSetoran/:id", verifyUser, updateJenisSetoran);
router.post("/deleteJenisSetoran/:id", verifyUser, deleteJenisSetoran);

module.exports = router;
