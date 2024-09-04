const express = require("express");
const controller = require("../../controllers/Marketing/MarketingController.js");
const verify = require("../../../utils/verifyToken.js");
const getMarketings = controller.getMarketings;
const getMarketingsPagination = controller.getMarketingsPagination;
const getMarketingNextKode = controller.getMarketingNextKode;
const getMarketingById = controller.getMarketingById;
const saveMarketing = controller.saveMarketing;
const updateMarketing = controller.updateMarketing;
const deleteMarketing = controller.deleteMarketing;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/marketings", verifyUser, getMarketings);
router.post("/marketingsPagination", verifyUser, getMarketingsPagination);
router.post("/marketingNextKode", verifyUser, getMarketingNextKode);
router.post("/marketings/:id", verifyUser, getMarketingById);
router.post("/saveMarketing", verifyUser, saveMarketing);
router.post("/updateMarketing/:id", verifyUser, updateMarketing);
router.post("/deleteMarketing/:id", verifyUser, deleteMarketing);

module.exports = router;
