const express = require("express");
const controller = require("../../controllers/HakAkses/HakAksesController.js");
const verify = require("../../../utils/verifyToken.js");
const getHakAksess = controller.getHakAksess;
const getHakAksesById = controller.getHakAksesById;
const getHakAksesByUserId = controller.getHakAksesByUserId;
const saveHakAkses = controller.saveHakAkses;
const updateHakAkses = controller.updateHakAkses;
const deleteHakAkses = controller.deleteHakAkses;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/hakAkses", verifyUser, getHakAksess);
router.post("/hakAkses/:id", verifyUser, getHakAksesById);
router.post("/hakAksesByUserId", verifyUser, getHakAksesByUserId);
router.post("/saveHakAkses", verifyUser, saveHakAkses);
router.post("/updateHakAkses/:id", verifyUser, updateHakAkses);
router.post("/deleteHakAkses/:id", verifyUser, deleteHakAkses);

module.exports = router;
