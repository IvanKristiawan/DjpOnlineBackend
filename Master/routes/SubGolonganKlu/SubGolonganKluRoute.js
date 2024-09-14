const express = require("express");
const controller = require("../../controllers/SubGolonganKlu/SubGolonganKluController.js");
const verify = require("../../../utils/verifyToken.js");
const getSubGolonganKlus = controller.getSubGolonganKlus;
const getSubGolonganKlusPagination = controller.getSubGolonganKlusPagination;
const getSubGolonganKluById = controller.getSubGolonganKluById;
const saveSubGolonganKlu = controller.saveSubGolonganKlu;
const updateSubGolonganKlu = controller.updateSubGolonganKlu;
const deleteSubGolonganKlu = controller.deleteSubGolonganKlu;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/subGolonganKlus", verifyUser, getSubGolonganKlus);
router.post(
  "/subGolonganKlusPagination",
  verifyUser,
  getSubGolonganKlusPagination
);
router.post("/subGolonganKlus/:id", verifyUser, getSubGolonganKluById);
router.post("/saveSubGolonganKlu", verifyUser, saveSubGolonganKlu);
router.post("/updateSubGolonganKlu/:id", verifyUser, updateSubGolonganKlu);
router.post("/deleteSubGolonganKlu/:id", verifyUser, deleteSubGolonganKlu);

module.exports = router;
