const express = require("express");
const controller = require("../../Migrasi/controllers/MigrasiController.js");
const migrasiKlu = controller.migrasiKlu;
const migrasiJenisPajak = controller.migrasiJenisPajak;
const migrasiJenisSetoran = controller.migrasiJenisSetoran;

const router = express.Router();

// router.post("/migrasiKlu", migrasiKlu);
// router.post("/migrasiJenisPajak", migrasiJenisPajak);
router.post("/migrasiJenisSetoran", migrasiJenisSetoran);

module.exports = router;
