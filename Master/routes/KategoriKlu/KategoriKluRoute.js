const express = require("express");
const controller = require("../../controllers/KategoriKlu/KategoriKluController.js");
const verify = require("../../../utils/verifyToken.js");
const getKategoriKlus = controller.getKategoriKlus;
const getKategoriKlusPagination = controller.getKategoriKlusPagination;
const getKategoriKluById = controller.getKategoriKluById;
const saveKategoriKlu = controller.saveKategoriKlu;
const updateKategoriKlu = controller.updateKategoriKlu;
const deleteKategoriKlu = controller.deleteKategoriKlu;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/kategoriKlus", verifyUser, getKategoriKlus);
router.post("/kategoriKlusPagination", verifyUser, getKategoriKlusPagination);
router.post("/kategoriKlus/:id", verifyUser, getKategoriKluById);
router.post("/saveKategoriKlu", verifyUser, saveKategoriKlu);
router.post("/updateKategoriKlu/:id", verifyUser, updateKategoriKlu);
router.post("/deleteKategoriKlu/:id", verifyUser, deleteKategoriKlu);

module.exports = router;
