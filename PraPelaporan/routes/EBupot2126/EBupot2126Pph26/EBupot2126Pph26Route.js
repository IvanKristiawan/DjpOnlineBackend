const express = require("express");
const controller = require("../../../controllers/EBupot2126/EBupot2126Pph26/EBupot2126Pph26Controller.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupot2126Pph26s = controller.getEBupot2126Pph26s;
const getEBupot2126Pph26sByUserForExcel =
  controller.getEBupot2126Pph26sByUserForExcel;
const getEBupot2126Pph26sPagination = controller.getEBupot2126Pph26sPagination;
const getEBupot2126Pph26sByUserPagination =
  controller.getEBupot2126Pph26sByUserPagination;
const getEBupot2126Pph26sByUserSearchPagination =
  controller.getEBupot2126Pph26sByUserSearchPagination;
const getEBupot2126Pph26ById = controller.getEBupot2126Pph26ById;
const saveEBupot2126Pph26 = controller.saveEBupot2126Pph26;
const updateEBupot2126Pph26 = controller.updateEBupot2126Pph26;
const statusDeleteEBupot2126Pph26 = controller.statusDeleteEBupot2126Pph26;
const deleteEBupot2126Pph26 = controller.deleteEBupot2126Pph26;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/eBupot2126Pph26s", verifyUser, getEBupot2126Pph26s);
router.post(
  "/eBupot2126Pph26sByUserForExcel",
  verifyUser,
  getEBupot2126Pph26sByUserForExcel
);
router.post(
  "/eBupot2126Pph26sPagination",
  verifyUser,
  getEBupot2126Pph26sPagination
);
router.post(
  "/eBupot2126Pph26sByUserPagination",
  verifyUser,
  getEBupot2126Pph26sByUserPagination
);
router.post(
  "/eBupot2126Pph26sByUserSearchPagination",
  verifyUser,
  getEBupot2126Pph26sByUserSearchPagination
);
router.post("/eBupot2126Pph26s/:id", verifyUser, getEBupot2126Pph26ById);
router.post("/saveEBupot2126Pph26", verifyUser, saveEBupot2126Pph26);
router.post("/updateEBupot2126Pph26/:id", verifyUser, updateEBupot2126Pph26);
router.post(
  "/statusDeleteEBupot2126Pph26/:id",
  verifyUser,
  statusDeleteEBupot2126Pph26
);
router.post("/deleteEBupot2126Pph26/:id", verifyUser, deleteEBupot2126Pph26);

module.exports = router;
