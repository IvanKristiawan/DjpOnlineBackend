const express = require("express");
const controller = require("../../controllers/EBilling/EBillingController.js");
const verify = require("../../../utils/verifyToken.js");
const getEBillings = controller.getEBillings;
const getEBillingsPagination = controller.getEBillingsPagination;
const getEBillingByNtpnUser = controller.getEBillingByNtpnUser;
const getEBillingById = controller.getEBillingById;
const saveEBilling = controller.saveEBilling;
const updateEBilling = controller.updateEBilling;
const deleteEBilling = controller.deleteEBilling;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/eBillings", verifyUser, getEBillings);
router.post("/eBillingsPagination", verifyUser, getEBillingsPagination);
router.post("/eBillingByNtpnUser", verifyUser, getEBillingByNtpnUser);
router.post("/eBillings/:id", verifyUser, getEBillingById);
router.post("/saveEBilling", verifyUser, saveEBilling);
router.post("/updateEBilling/:id", verifyUser, updateEBilling);
router.post("/deleteEBilling/:id", verifyUser, deleteEBilling);

module.exports = router;
