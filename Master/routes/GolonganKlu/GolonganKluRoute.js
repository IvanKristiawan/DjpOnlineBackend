const express = require("express");
const controller = require("../../controllers/GolonganKlu/GolonganKluController.js");
const verify = require("../../../utils/verifyToken.js");
const getGolonganKlus = controller.getGolonganKlus;
const getGolonganKlusPagination = controller.getGolonganKlusPagination;
const getGolonganKluById = controller.getGolonganKluById;
const saveGolonganKlu = controller.saveGolonganKlu;
const updateGolonganKlu = controller.updateGolonganKlu;
const deleteGolonganKlu = controller.deleteGolonganKlu;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/golonganKlus", verifyUser, getGolonganKlus);
router.post("/golonganKlusPagination", verifyUser, getGolonganKlusPagination);
router.post("/golonganKlus/:id", verifyUser, getGolonganKluById);
router.post("/saveGolonganKlu", verifyUser, saveGolonganKlu);
router.post("/updateGolonganKlu/:id", verifyUser, updateGolonganKlu);
router.post("/deleteGolonganKlu/:id", verifyUser, deleteGolonganKlu);

module.exports = router;
