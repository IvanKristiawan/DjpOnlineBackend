const express = require("express");
const controller = require("../../Migrasi/controllers/MigrasiController.js");
const migrasiKlu = controller.migrasiKlu;

const router = express.Router();

// router.post("/migrasiKlu", migrasiKlu);

module.exports = router;
