const express = require("express");
const controller = require("../../controllers/GolonganPokokKlu/GolonganPokokKluController.js");
const verify = require("../../../utils/verifyToken.js");
const getGolonganPokokKlus = controller.getGolonganPokokKlus;
const getGolonganPokokKlusPagination =
  controller.getGolonganPokokKlusPagination;
const getGolonganPokokKluById = controller.getGolonganPokokKluById;
const saveGolonganPokokKlu = controller.saveGolonganPokokKlu;
const updateGolonganPokokKlu = controller.updateGolonganPokokKlu;
const deleteGolonganPokokKlu = controller.deleteGolonganPokokKlu;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/golonganPokokKlus", verifyUser, getGolonganPokokKlus);
router.post(
  "/golonganPokokKlusPagination",
  verifyUser,
  getGolonganPokokKlusPagination
);
router.post("/golonganPokokKlus/:id", verifyUser, getGolonganPokokKluById);
router.post("/saveGolonganPokokKlu", verifyUser, saveGolonganPokokKlu);
router.post("/updateGolonganPokokKlu/:id", verifyUser, updateGolonganPokokKlu);
router.post("/deleteGolonganPokokKlu/:id", verifyUser, deleteGolonganPokokKlu);

module.exports = router;
