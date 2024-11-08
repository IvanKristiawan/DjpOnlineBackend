const { sequelize } = require("../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const KategoriKlu = require("../../Master/models/KategoriKlu/KategoriKluModel.js");
const GolonganPokokKlu = require("../../Master/models/GolonganPokokKlu/GolonganPokokKluModel.js");
const GolonganKlu = require("../../Master/models/GolonganKlu/GolonganKluModel.js");
const SubGolonganKlu = require("../../Master/models/SubGolonganKlu/SubGolonganKluModel.js");
const KelompokKegiatanEkonomiKlu = require("../../Master/models/KelompokKegiatanEkonomiKlu/KelompokKegiatanEkonomiKluModel.js");
const Setting = require("../../Setting/models/SettingModel.js");
const JenisPajak = require("../../Master/models/JenisPajak/JenisPajakModel.js");
const Cabang = require("../../Master/models/Cabang/CabangModel.js");
const JenisSetoran = require("../../Master/models/JenisSetoran/JenisSetoranModel.js");
const ObjekPajak = require("../../Master/models/ObjekPajak/ObjekPajakModel.js");
const Negara = require("../../Master/models/Negara/NegaraModel.js");
const Tahun = require("../../Master/models/Tahun/TahunModel.js");
const { findNextKode } = require("../../helper/helper.js");
const Ptkp = require("../../Master/models/Ptkp/PtkpModel.js");
const Ter = require("../../Master/models/Ter/TerModel.js");

const migrasiKlu = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();
    let insertedKategoriKlu;
    let insertedGolonganPokokKlu;
    let insertedGolonganKlu;
    let insertedSubGolonganKlu;
    let insertedKelompokKegiatanEkonomiKlu;
    let no = 0;

    for (let i = 0; i < req.body.length; i++) {
      // for (let data of req.body) {
      let tempKelompokKlu = req.body[i]["Golongan Pokok\n(GP)"];
      let tempGolonganKlu = req.body[i]["Golongan\n(G)"];
      let tempSubGolonganKlu = req.body[i]["Sub-Golongan\n(SG)"];
      let tempKelompokKegiatanEkonomiKlu =
        req.body[i]["Kelompok Kegiatan Ekonomi\n(KEL)"];
      let tempUraianKlu = req.body[i]["URAIAN KLASIFIKASI LAPANGAN USAHA"];

      // 01. Insert Kelompok KLU
      if (tempKelompokKlu.includes("KATEGORI")) {
        let kategoriIndex =
          tempKelompokKlu.indexOf("KATEGORI ") + "KATEGORI ".length;
        let charAfterKategori = tempKelompokKlu[kategoriIndex]; // The character after "KATEGORI "

        // Find the text after " : "
        let colonIndex = tempKelompokKlu.indexOf(" : ") + 3; // Move index after " : "
        let textAfterColon = tempKelompokKlu.substring(colonIndex); // Get all text after " : "

        console.log(charAfterKategori);
        console.log(textAfterColon);

        // Save Kategori KLU
        let dataKategoriKlu = {
          kodeKategoriKlu: charAfterKategori,
          namaKategoriKlu: textAfterColon,
          ketKategoriKlu: "",
          userIdInput: 1,
          cabangId: "001",
        };
        insertedKategoriKlu = await KategoriKlu.create(dataKategoriKlu, {
          transaction,
        });
        // console.log(insertedKategoriKlu);
      }

      // 02. Insert Golongan Pokok KLU
      // Regular expression to match strings that start with two digits
      let regexGolonganPokokKlu = /^\d{2}/;

      if (regexGolonganPokokKlu.test(tempKelompokKlu)) {
        console.log(`Found Golongan Pokok Klu: ${tempKelompokKlu}`);
        // Save Golongan Pokok Klu
        let dataGolonganPokokKlu = {
          kodeGolonganPokokKlu: tempKelompokKlu,
          namaGolonganPokokKlu: tempUraianKlu,
          ketGolonganPokokKlu: "",
          kategoriKluId: insertedKategoriKlu.id,
          userIdInput: 1,
          cabangId: "001",
        };
        insertedGolonganPokokKlu = await GolonganPokokKlu.create(
          dataGolonganPokokKlu,
          {
            transaction,
          }
        );
      }

      // 03. Insert Golongan KLU
      // Regular expression to match strings that start with three digits
      let regexGolonganKlu = /^\d{3}/;

      if (regexGolonganKlu.test(tempGolonganKlu)) {
        console.log(`Found Golongan Klu: ${tempGolonganKlu}`);
        // Save Golongan Klu
        let dataGolonganKlu = {
          kodeGolonganKlu: tempGolonganKlu,
          namaGolonganKlu: tempUraianKlu,
          ketGolonganKlu: "",
          golonganPokokKluId: insertedGolonganPokokKlu.id,
          userIdInput: 1,
          cabangId: "001",
        };
        insertedGolonganKlu = await GolonganKlu.create(dataGolonganKlu, {
          transaction,
        });
      }

      // 04. Insert Sub Golongan KLU
      // Regular expression to match strings that start with three digits
      let regexSubGolonganKlu = /^\d{4}/;

      if (regexSubGolonganKlu.test(tempSubGolonganKlu)) {
        console.log(`Found Sub Golongan Klu: ${tempSubGolonganKlu}`);
        // Save Sub Golongan Klu
        let dataSubGolonganKlu = {
          kodeSubGolonganKlu: tempSubGolonganKlu,
          namaSubGolonganKlu: tempUraianKlu,
          ketSubGolonganKlu: "",
          golonganKluId: insertedGolonganKlu.id,
          userIdInput: 1,
          cabangId: "001",
        };
        insertedSubGolonganKlu = await SubGolonganKlu.create(
          dataSubGolonganKlu,
          {
            transaction,
          }
        );
      }

      // 05. Insert Kelompok Kegiatan Ekonomi KLU
      // Regular expression to match strings that start with three digits
      let regexKelompokKegiatanEkonomiKlu = /^\d{5}/;

      if (
        regexKelompokKegiatanEkonomiKlu.test(tempKelompokKegiatanEkonomiKlu)
      ) {
        console.log(
          `Found Kelompok Kegiatan Ekonomi Klu: ${tempKelompokKegiatanEkonomiKlu}`
        );
        // Save Kelompok Kegiatan Ekonomi Klu
        let dataKelompokKegiatanEkonomiKlu = {
          kodeKelompokKegiatanEkonomiKlu: tempKelompokKegiatanEkonomiKlu,
          namaKelompokKegiatanEkonomiKlu: tempUraianKlu,
          ketKelompokKegiatanEkonomiKlu:
            req.body[i + 1]["URAIAN KLASIFIKASI LAPANGAN USAHA"],
          subGolonganKluId: insertedSubGolonganKlu.id,
          userIdInput: 1,
          cabangId: "001",
        };
        insertedKelompokKegiatanEkonomiKlu =
          await KelompokKegiatanEkonomiKlu.create(
            dataKelompokKegiatanEkonomiKlu,
            {
              transaction,
            }
          );
      }

      no++;
      // console.log(no);
    }

    // Status 201 = Created
    // await transaction.commit();
    res.status(200).json("Klu data migrated!");
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const migrasiJenisPajak = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let unique = [];
    let seen = new Set();

    req.body.forEach((item) => {
      // Create a unique identifier based on kdMap and descMap
      let identifier = `${item.kdMap}-${item.descMap}`;
      if (!seen.has(identifier)) {
        seen.add(identifier);
        unique.push({
          kodeJenisPajak: item.kdMap,
          namaJenisPajak: item.descMap,
          cabangId: "001",
          userIdInput: 5,
        });
      }
    });

    console.log(unique);

    const insertedJenisPajak = await JenisPajak.bulkCreate(unique);

    // Status 201 = Created
    // await transaction.commit();
    res.status(200).json(unique);
    // res.status(200).json("Klu data migrated!");
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const migrasiJenisSetoran = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();

    for (let i = 0; i < req.body.length; i++) {
      const jenisPajak = await JenisPajak.findOne({
        where: {
          kodeJenisPajak: req.body[i].kdMap,
        },
        include: [{ model: Cabang }],
      });

      let dataJenisSetoran = {
        ...req.body[i],
        kodeJenisSetoran: req.body[i].kdSetor,
        namaJenisSetoran: req.body[i].descSetor,
        jenisPajakId: jenisPajak.id,
        userIdInput: 5,
        cabangId: "001",
      };
      console.log(dataJenisSetoran);

      const insertedJenisSetoran = await JenisSetoran.create(dataJenisSetoran);
    }

    // Status 201 = Created
    // await transaction.commit();
    res.status(200).json("Jenis Setoran data migrated!");
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const migrasiTahun = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let mulaiTahun = 1946;
    let selesaiTahun = 2025;

    for (mulaiTahun; mulaiTahun < selesaiTahun; mulaiTahun++) {
      let nextTahun = findNextKode(mulaiTahun, 4);

      const insertedTahun = await Tahun.create({
        tahun: nextTahun,
        cabangId: "001",
      });
    }

    // Status 201 = Created
    // await transaction.commit();
    res.status(200).json("Tahun data migrated!");
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const migrasiObjekPajak = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();

    for (let i = 0; i < req.body.length; i++) {
      let parts = req.body[i].kodeObjekPajak.split("-"); // Split the string into ["24", "104", "02"]
      let kodeJenisSetoran = parts[1];

      const jenisSetoran = await JenisSetoran.findOne({
        where: {
          kodeJenisSetoran: kodeJenisSetoran,
          "$jenispajak.kodeJenisPajak$": {
            [Op.like]: req.body[i].jenisPajak,
          },
        },
        include: [
          {
            model: JenisPajak,
            as: "jenispajak",
            attributes: ["kodeJenisPajak", "namaJenisPajak"],
          },
        ],
      });

      // console.log(req.body[i].kodeObjekPajak);
      if (jenisSetoran) {
        // console.log(jenisSetoran.dataValues);
        const insertedObjekPajak = await ObjekPajak.create({
          kodeObjekPajak: req.body[i].kodeObjekPajak,
          namaObjekPajak: req.body[i].namaObjekPajak,
          jenisSetoranId: jenisSetoran.id,
          cabangId: "001",
        });
      } else {
        // console.log(req.body[i].kodeObjekPajak);
      }
    }

    // Status 201 = Created
    // await transaction.commit();
    res.status(200).json("Objek Pajak data migrated!");
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateTarifPersenObjekPajak = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();

    for (let i = 0; i < req.body.length; i++) {
      await ObjekPajak.update(
        {
          tarifPersen: req.body[i].tarifPersen,
        },
        {
          where: {
            kodeObjekPajak: req.body[i].kodeObjekPajak,
          },
        }
      );
      console.log(i);
    }

    // Status 201 = Created
    // await transaction.commit();
    res.status(200).json("Objek Pajak data updated!");
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateKodeBupotObjekPajak = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();

    for (let i = 0; i < req.body.length; i++) {
      await ObjekPajak.update(
        {
          kodeBupot: "0",
        },
        {
          where: {
            kodeObjekPajak: req.body[i].kdObjPjk,
          },
        }
      );
      console.log(i);
    }

    // Status 201 = Created
    // await transaction.commit();
    res.status(200).json("Objek Pajak data updated!");
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateUntukBupotUnifikasiObjekPajak = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();
    let no = 0;

    const objekPajaks = await ObjekPajak.findAll({
      order: [["kodeObjekPajak", "ASC"]],
      include: [{ model: JenisSetoran }, { model: Cabang }],
    });

    for (let objekPajak of objekPajaks) {
      if (objekPajak.kodeBupot === "0") {
        await ObjekPajak.update(
          {
            untukBupotUnifikasi: "PPh 42152223",
          },
          {
            where: {
              kodeObjekPajak: objekPajak.kodeObjekPajak,
            },
          }
        );
      } else if (objekPajak.kodeBupot === "1") {
        await ObjekPajak.update(
          {
            untukBupotUnifikasi: "PPh Non Residen",
          },
          {
            where: {
              kodeObjekPajak: objekPajak.kodeObjekPajak,
            },
          }
        );
      }

      no++;
      console.log(no);
    }

    // Status 201 = Created
    // await transaction.commit();
    res.status(200).json("Untuk Bupot Unifikasi Objek Pajak data updated!");
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const migrasiObjekPajakBupotUnifikasiDopp = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();

    for (let i = 0; i < req.body.length; i++) {
      const objekPajak = await ObjekPajak.findOne({
        where: {
          kodeObjekPajak: req.body[i].kodeObjekPajak,
        },
        order: [["kodeObjekPajak", "ASC"]],
        include: [{ model: JenisSetoran }, { model: Cabang }],
      });

      if (objekPajak) {
        await ObjekPajak.update(
          {
            bupotUnifikasiDopp: true,
          },
          {
            where: {
              kodeObjekPajak: req.body[i].kodeObjekPajak,
            },
          }
        );
      } else {
        let parts = req.body[i].kodeObjekPajak.split("-"); // Split the string into ["24", "104", "02"]
        let kodeJenisSetoran = parts[1];

        const jenisSetoran = await JenisSetoran.findOne({
          where: {
            kodeJenisSetoran: kodeJenisSetoran,
            "$jenispajak.kodeJenisPajak$": {
              [Op.like]: req.body[i].jenisPajak,
            },
          },
          include: [
            {
              model: JenisPajak,
              as: "jenispajak",
              attributes: ["kodeJenisPajak", "namaJenisPajak"],
            },
          ],
        });

        // console.log(req.body[i].kodeObjekPajak);
        if (jenisSetoran) {
          // console.log(jenisSetoran.dataValues);
          const insertedObjekPajak = await ObjekPajak.create({
            ...req.body[i],
            kodeObjekPajak: req.body[i].kodeObjekPajak,
            namaObjekPajak: req.body[i].namaObjekPajak,
            jenisSetoranId: jenisSetoran.id,
            kodeBupot: "0",
            untukBupotUnifikasi: "PPh DOSS",
            bupotUnifikasiDopp: true,
            cabangId: "001",
          });
        } else {
          // console.log(req.body[i].kodeObjekPajak);
        }
      }
    }

    // Status 201 = Created
    // await transaction.commit();
    res.status(200).json("Objek Pajak data migrated!");
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const migrasiNegara = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();

    for (let i = 0; i < req.body.length; i++) {
      // Save Negara
      let dataNegara = {
        kodeNegara: req.body[i].kodeNegara,
        namaNegara: req.body[i].namaNegara,
        ketNegara: "",
        userIdInput: 1,
        cabangId: "001",
      };
      insertedNegara = await Negara.create(dataNegara);
    }

    // Status 201 = Created
    // await transaction.commit();
    res.status(200).json("Negara data updated!");
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const migrasiTer = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;

  try {
    transaction = await sequelize.transaction();

    for (let i = 0; i < req.body.length; i++) {
      let nextKodeTer = findNextKode(i, 5);
      let jumlahPenghasilanMin = req.body[i].jumlahPenghasilanMin.replace(
        /,/g,
        ""
      );
      let jumlahPenghasilanMax = req.body[i].jumlahPenghasilanMax.replace(
        /,/g,
        ""
      );

      let ptkp = await Ptkp.findOne({
        where: {
          namaPtkp: req.body[i].ptkp,
        },
      });

      let objectTer = {
        kodeTer: nextKodeTer,
        jumlahPenghasilanMin,
        jumlahPenghasilanMax,
        tarifPersen: req.body[i].tarifPersen,
        kategori: req.body[i].kategori,
        ptkpId: ptkp.id,
        cabangId: "001",
      };

      const insertedTer = await Ter.create(objectTer);

      console.log(objectTer);
    }

    // Status 201 = Created
    // await transaction.commit();
    res.status(200).json("Ter data migrated!");
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  migrasiKlu,
  migrasiJenisPajak,
  migrasiJenisSetoran,
  migrasiTahun,
  migrasiObjekPajak,
  updateTarifPersenObjekPajak,
  updateKodeBupotObjekPajak,
  updateUntukBupotUnifikasiObjekPajak,
  migrasiObjekPajakBupotUnifikasiDopp,
  migrasiNegara,
  migrasiTer,
};
