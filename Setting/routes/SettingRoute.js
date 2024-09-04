const express = require("express");
const controller = require("../../Setting/controllers/SettingController.js");
const verify = require("../../utils/verifyToken.js");
const getSettings = controller.getSettings;
const getSettingById = controller.getSettingById;
const getLastSetting = controller.getLastSetting;
const saveSetting = controller.saveSetting;
const updateSetting = controller.updateSetting;
const deleteSetting = controller.deleteSetting;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/settings", verifyUser, getSettings);
router.post("/settings/:id", verifyUser, getSettingById);
router.post("/lastSetting", verifyUser, getLastSetting);
router.post("/saveSetting", verifyUser, saveSetting);
router.post("/updateSetting/:id", verifyUser, updateSetting);
router.post("/deleteSetting/:id", verifyUser, deleteSetting);

module.exports = router;
