const express = require("express");
const controller = require("../../../controllers/EBupotUnifikasi/EBupotUnifikasiImporData/EBupotUnifikasiImporDataController.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupotUnifikasiImporDatas = controller.getEBupotUnifikasiImporDatas;
const getEBupotUnifikasiImporDatasPagination =
  controller.getEBupotUnifikasiImporDatasPagination;
const getEBupotUnifikasiImporDatasByUserPagination =
  controller.getEBupotUnifikasiImporDatasByUserPagination;
const getEBupotUnifikasiImporDatasByUserSearchPagination =
  controller.getEBupotUnifikasiImporDatasByUserSearchPagination;
const getEBupotUnifikasiImporDataById =
  controller.getEBupotUnifikasiImporDataById;
const saveEBupotUnifikasiImporData = controller.saveEBupotUnifikasiImporData;
const updateEBupotUnifikasiImporData =
  controller.updateEBupotUnifikasiImporData;
const deleteEBupotUnifikasiImporData =
  controller.deleteEBupotUnifikasiImporData;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post(
  "/eBupotUnifikasiImporDatas",
  verifyUser,
  getEBupotUnifikasiImporDatas
);
router.post(
  "/eBupotUnifikasiImporDatasPagination",
  verifyUser,
  getEBupotUnifikasiImporDatasPagination
);
router.post(
  "/eBupotUnifikasiImporDatasByUserPagination",
  verifyUser,
  getEBupotUnifikasiImporDatasByUserPagination
);
router.post(
  "/eBupotUnifikasiImporDatasByUserSearchPagination",
  verifyUser,
  getEBupotUnifikasiImporDatasByUserSearchPagination
);
router.post(
  "/eBupotUnifikasiImporDatas/:id",
  verifyUser,
  getEBupotUnifikasiImporDataById
);
router.post(
  "/saveEBupotUnifikasiImporData",
  verifyUser,
  saveEBupotUnifikasiImporData
);
router.post(
  "/updateEBupotUnifikasiImporData/:id",
  verifyUser,
  updateEBupotUnifikasiImporData
);
router.post(
  "/deleteEBupotUnifikasiImporData/:id",
  verifyUser,
  deleteEBupotUnifikasiImporData
);

module.exports = router;
