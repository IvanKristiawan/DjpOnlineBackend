const express = require("express");
const controller = require("../../../controllers/EBupot2126/EBupot2126Pph21/EBupot2126Pph21Controller.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupot2126Pph21s = controller.getEBupot2126Pph21s;
const getEBupot2126Pph21sByUserForExcel =
  controller.getEBupot2126Pph21sByUserForExcel;
const getEBupot2126Pph21sPagination = controller.getEBupot2126Pph21sPagination;
const getEBupot2126Pph21sByUserPagination =
  controller.getEBupot2126Pph21sByUserPagination;
const getEBupot2126Pph21sByUserSearchPagination =
  controller.getEBupot2126Pph21sByUserSearchPagination;
const getEBupot2126Pph21ById = controller.getEBupot2126Pph21ById;
const saveEBupot2126Pph21 = controller.saveEBupot2126Pph21;
const updateEBupot2126Pph21 = controller.updateEBupot2126Pph21;
const statusDeleteEBupot2126Pph21 = controller.statusDeleteEBupot2126Pph21;
const deleteEBupot2126Pph21 = controller.deleteEBupot2126Pph21;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/eBupot2126Pph21s", verifyUser, getEBupot2126Pph21s);
router.post(
  "/eBupot2126Pph21sByUserForExcel",
  verifyUser,
  getEBupot2126Pph21sByUserForExcel
);
router.post(
  "/eBupot2126Pph21sPagination",
  verifyUser,
  getEBupot2126Pph21sPagination
);
router.post(
  "/eBupot2126Pph21sByUserPagination",
  verifyUser,
  getEBupot2126Pph21sByUserPagination
);
router.post(
  "/eBupot2126Pph21sByUserSearchPagination",
  verifyUser,
  getEBupot2126Pph21sByUserSearchPagination
);
router.post("/eBupot2126Pph21s/:id", verifyUser, getEBupot2126Pph21ById);
router.post("/saveEBupot2126Pph21", verifyUser, saveEBupot2126Pph21);
router.post("/updateEBupot2126Pph21/:id", verifyUser, updateEBupot2126Pph21);
router.post(
  "/statusDeleteEBupot2126Pph21/:id",
  verifyUser,
  statusDeleteEBupot2126Pph21
);
router.post("/deleteEBupot2126Pph21/:id", verifyUser, deleteEBupot2126Pph21);

module.exports = router;
