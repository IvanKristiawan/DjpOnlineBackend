const { sequelize } = require("../../config/Database.js");
const KategoriKlu = require("../../Master/models/KategoriKlu/KategoriKluModel.js");
const GolonganPokokKlu = require("../../Master/models/GolonganPokokKlu/GolonganPokokKluModel.js");
const GolonganKlu = require("../../Master/models/GolonganKlu/GolonganKluModel.js");
const SubGolonganKlu = require("../../Master/models/SubGolonganKlu/SubGolonganKluModel.js");
const KelompokKegiatanEkonomiKlu = require("../../Master/models/KelompokKegiatanEkonomiKlu/KelompokKegiatanEkonomiKluModel.js");
const Setting = require("../../Setting/models/SettingModel.js");

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

module.exports = {
  migrasiKlu,
};
