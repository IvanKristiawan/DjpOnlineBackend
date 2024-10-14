const express = require("express");
const controller = require("../../Migrasi/controllers/MigrasiController.js");
const migrasiKlu = controller.migrasiKlu;
const migrasiJenisPajak = controller.migrasiJenisPajak;
const migrasiJenisSetoran = controller.migrasiJenisSetoran;
const migrasiTahun = controller.migrasiTahun;
const migrasiObjekPajak = controller.migrasiObjekPajak;
const updateTarifPersenObjekPajak = controller.updateTarifPersenObjekPajak;
const updateKodeBupotObjekPajak = controller.updateKodeBupotObjekPajak;

const router = express.Router();

// router.post("/migrasiKlu", migrasiKlu);
// router.post("/migrasiJenisPajak", migrasiJenisPajak);
// router.post("/migrasiJenisSetoran", migrasiJenisSetoran);
// router.post("/migrasiTahun", migrasiTahun);
// router.post("/migrasiObjekPajak", migrasiObjekPajak);
// router.post("/updateTarifPersenObjekPajak", updateTarifPersenObjekPajak);
// router.post("/updateKodeBupotObjekPajak", updateKodeBupotObjekPajak);

module.exports = router;
