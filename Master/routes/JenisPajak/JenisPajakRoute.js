const express = require("express");
const controller = require("../../controllers/JenisPajak/JenisPajakController.js");
const verify = require("../../../utils/verifyToken.js");
const getJenisPajaks = controller.getJenisPajaks;
const getJenisPajaksPagination = controller.getJenisPajaksPagination;
const getJenisPajakById = controller.getJenisPajakById;
const saveJenisPajak = controller.saveJenisPajak;
const updateJenisPajak = controller.updateJenisPajak;
const deleteJenisPajak = controller.deleteJenisPajak;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/jenisPajaks", verifyUser, getJenisPajaks);
router.post("/jenisPajaksPagination", verifyUser, getJenisPajaksPagination);
router.post("/jenisPajaks/:id", verifyUser, getJenisPajakById);
router.post("/saveJenisPajak", verifyUser, saveJenisPajak);
router.post("/updateJenisPajak/:id", verifyUser, updateJenisPajak);
router.post("/deleteJenisPajak/:id", verifyUser, deleteJenisPajak);

module.exports = router;
