const express = require("express");
const controller = require("../../controllers/Negara/NegaraController.js");
const verify = require("../../../utils/verifyToken.js");
const getNegaras = controller.getNegaras;
const getNegarasPagination = controller.getNegarasPagination;
const getNegaraById = controller.getNegaraById;
const saveNegara = controller.saveNegara;
const updateNegara = controller.updateNegara;
const deleteNegara = controller.deleteNegara;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/negaras", verifyUser, getNegaras);
router.post("/negarasPagination", verifyUser, getNegarasPagination);
router.post("/negaras/:id", verifyUser, getNegaraById);
router.post("/saveNegara", verifyUser, saveNegara);
router.post("/updateNegara/:id", verifyUser, updateNegara);
router.post("/deleteNegara/:id", verifyUser, deleteNegara);

module.exports = router;
