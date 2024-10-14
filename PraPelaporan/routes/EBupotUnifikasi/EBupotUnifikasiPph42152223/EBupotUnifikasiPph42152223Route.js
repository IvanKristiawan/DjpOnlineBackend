const express = require("express");
const controller = require("../../../controllers/EBupotUnifikasi/EBupotUnifikasiPph42152223/EBupotUnifikasiPph42152223Controller.js");
const verify = require("../../../../utils/verifyToken.js");
const getEBupotUnifikasiPph42152223s =
  controller.getEBupotUnifikasiPph42152223s;
const getEBupotUnifikasiPph42152223sPagination =
  controller.getEBupotUnifikasiPph42152223sPagination;
const getEBupotUnifikasiPph42152223sByUserPagination =
  controller.getEBupotUnifikasiPph42152223sByUserPagination;
const getEBupotUnifikasiPph42152223sByUserSearchPagination =
  controller.getEBupotUnifikasiPph42152223sByUserSearchPagination;
const getEBupotUnifikasiPph42152223ById =
  controller.getEBupotUnifikasiPph42152223ById;
const saveEBupotUnifikasiPph42152223 =
  controller.saveEBupotUnifikasiPph42152223;
const updateEBupotUnifikasiPph42152223 =
  controller.updateEBupotUnifikasiPph42152223;
const statusDeleteEBupotUnifikasiPph42152223 =
  controller.statusDeleteEBupotUnifikasiPph42152223;
const deleteEBupotUnifikasiPph42152223 =
  controller.deleteEBupotUnifikasiPph42152223;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post(
  "/eBupotUnifikasiPph42152223s",
  verifyUser,
  getEBupotUnifikasiPph42152223s
);
router.post(
  "/eBupotUnifikasiPph42152223sPagination",
  verifyUser,
  getEBupotUnifikasiPph42152223sPagination
);
router.post(
  "/eBupotUnifikasiPph42152223sByUserPagination",
  verifyUser,
  getEBupotUnifikasiPph42152223sByUserPagination
);
router.post(
  "/eBupotUnifikasiPph42152223sByUserSearchPagination",
  verifyUser,
  getEBupotUnifikasiPph42152223sByUserSearchPagination
);
router.post(
  "/eBupotUnifikasiPph42152223s/:id",
  verifyUser,
  getEBupotUnifikasiPph42152223ById
);
router.post(
  "/saveEBupotUnifikasiPph42152223",
  verifyUser,
  saveEBupotUnifikasiPph42152223
);
router.post(
  "/updateEBupotUnifikasiPph42152223/:id",
  verifyUser,
  updateEBupotUnifikasiPph42152223
);
router.post(
  "/statusDeleteEBupotUnifikasiPph42152223/:id",
  verifyUser,
  statusDeleteEBupotUnifikasiPph42152223
);
router.post(
  "/deleteEBupotUnifikasiPph42152223/:id",
  verifyUser,
  deleteEBupotUnifikasiPph42152223
);

module.exports = router;
