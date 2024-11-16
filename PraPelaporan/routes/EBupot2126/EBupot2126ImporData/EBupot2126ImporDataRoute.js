const express = require("express");
const controller = require("../../../controllers/EBupot2126/EBupot2126ImporData/EBupot2126ImporDataController.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupot2126ImporDatas = controller.getEBupot2126ImporDatas;
const getEBupot2126ImporDatasPagination =
  controller.getEBupot2126ImporDatasPagination;
const getEBupot2126ImporDatasByUserPagination =
  controller.getEBupot2126ImporDatasByUserPagination;
const getEBupot2126ImporDatasByUserSearchPagination =
  controller.getEBupot2126ImporDatasByUserSearchPagination;
const getEBupot2126ImporDatasBulananByUserSearchPagination =
  controller.getEBupot2126ImporDatasBulananByUserSearchPagination;
const getEBupot2126ImporDatasTahunanByUserSearchPagination =
  controller.getEBupot2126ImporDatasTahunanByUserSearchPagination;
const getEBupot2126ImporDataById = controller.getEBupot2126ImporDataById;
const saveEBupot2126BulananImporData =
  controller.saveEBupot2126BulananImporData;
const saveEBupot2126TahunanImporData =
  controller.saveEBupot2126TahunanImporData;
const updateEBupot2126ImporData = controller.updateEBupot2126ImporData;
const deleteEBupot2126ImporData = controller.deleteEBupot2126ImporData;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/eBupot2126ImporDatas", verifyUser, getEBupot2126ImporDatas);
router.post(
  "/eBupot2126ImporDatasPagination",
  verifyUser,
  getEBupot2126ImporDatasPagination
);
router.post(
  "/eBupot2126ImporDatasByUserPagination",
  verifyUser,
  getEBupot2126ImporDatasByUserPagination
);
router.post(
  "/eBupot2126ImporDatasByUserSearchPagination",
  verifyUser,
  getEBupot2126ImporDatasByUserSearchPagination
);
router.post(
  "/eBupot2126ImporDatasBulananByUserSearchPagination",
  verifyUser,
  getEBupot2126ImporDatasBulananByUserSearchPagination
);
router.post(
  "/eBupot2126ImporDatasTahunanByUserSearchPagination",
  verifyUser,
  getEBupot2126ImporDatasTahunanByUserSearchPagination
);
router.post(
  "/eBupot2126ImporDatas/:id",
  verifyUser,
  getEBupot2126ImporDataById
);
router.post(
  "/saveEBupot2126BulananImporData",
  verifyUser,
  saveEBupot2126BulananImporData
);
router.post(
  "/saveEBupot2126TahunanImporData",
  verifyUser,
  saveEBupot2126TahunanImporData
);
router.post(
  "/updateEBupot2126ImporData/:id",
  verifyUser,
  updateEBupot2126ImporData
);
router.post(
  "/deleteEBupot2126ImporData/:id",
  verifyUser,
  deleteEBupot2126ImporData
);

module.exports = router;
