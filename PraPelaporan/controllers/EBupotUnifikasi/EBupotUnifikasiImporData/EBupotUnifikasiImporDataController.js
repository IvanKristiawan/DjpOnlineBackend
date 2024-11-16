const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupotUnifikasiImporData = require("../../../models/EBupotUnifikasi/EBupotUnifikasiImporData/EBupotUnifikasiImporDataModel.js");
const EBupotUnifikasiDetilValidasi = require("../../../models/EBupotUnifikasi/EBupotUnifikasiDetilValidasi/EBupotUnifikasiDetilValidasiModel.js");
const User = require("../../../../User/models/UserModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
const {
  generateRandomNumberString,
  formatTextToDate,
  getMonthIndex,
  getMonthName,
  getNamaDokumenByKode,
} = require("../../../../helper/helper.js");
const EBupotUnifikasiPph42152223 = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPph42152223/EBupotUnifikasiPph42152223Model.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const Penandatangan = require("../../../models/Penandatangan/PenandatanganModel.js");
const DokumenDasarPemotonganEBupotUnifikasiPph42152223 = require("../../../models/EBupotUnifikasi/DokumenDasarPemotonganEBupotUnifikasiPph42152223/DokumenDasarPemotonganEBupotUnifikasiPph42152223Model.js");
const Negara = require("../../../../Master/models/Negara/NegaraModel.js");
const EBupotUnifikasiPphNonResiden = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPphNonResiden/EBupotUnifikasiPphNonResidenModel.js");
const DokumenDasarPemotonganEBupotUnifikasiPphNonResiden = require("../../../models/EBupotUnifikasi/DokumenDasarPemotonganEBupotUnifikasiPphNonResiden/DokumenDasarPemotonganEBupotUnifikasiPphNonResidenModel.js");

const getEBupotUnifikasiImporDatas = async (req, res) => {
  try {
    const eBupotUnifikasiImporDatas = await EBupotUnifikasiImporData.findAll({
      include: [{ model: User }, { model: Cabang }],
    });
    res.status(200).json(eBupotUnifikasiImporDatas);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupotUnifikasiImporDatasPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {};
  let tempInclude = [{ model: User }, { model: Cabang }];

  const totalRows = await EBupotUnifikasiImporData.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiImporDatas = await EBupotUnifikasiImporData.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupotUnifikasiImporDatas,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupotUnifikasiImporDatasByUserPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    userIdInput: req.body.userIdInput,
  };
  let tempInclude = [{ model: User }, { model: Cabang }];

  const totalRows = await EBupotUnifikasiImporData.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiImporDatas = await EBupotUnifikasiImporData.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupotUnifikasiImporDatas,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupotUnifikasiImporDatasByUserSearchPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupotUnifikasiImporDataId: req.body.userEBupotUnifikasiImporDataId,
  };
  let tempInclude = [{ model: User }, { model: Cabang }];

  const totalRows = await EBupotUnifikasiImporData.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiImporDatas = await EBupotUnifikasiImporData.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupotUnifikasiImporDatas,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupotUnifikasiImporDataById = async (req, res) => {
  try {
    let eBupotUnifikasiImporData = await EBupotUnifikasiImporData.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }, { model: Cabang }],
    });

    res.status(200).json(eBupotUnifikasiImporData);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

// const saveEBupotUnifikasiImporData = async (req, res) => {
//   let transaction;

//   try {
//     transaction = await sequelize.transaction();

//     // 01.) Find Nomor Tiket
//     let nomorTiket = generateRandomNumberString(7);

//     // 02.) Find Tanggal Bukti Setor
//     let tanggalUpload = new Date();

//     // console.log(req.body.jsonData);

//     let dataRekap = req.body.jsonData["Rekap"];
//     let data42152223 = req.body.jsonData["42152223"];
//     let dataNR = req.body.jsonData["NR"];
//     let dataDasarPemotongan = req.body.jsonData["Dasar Pemotongan"];

//     // console.log(dataRekap);
//     let tahunPajak = dataRekap[0]["__EMPTY_3"];
//     let masaPajak = dataRekap[0]["__EMPTY_6"];
//     let jumlahBuktiPotongPph42152223 = dataRekap[1]["__EMPTY_6"];
//     let jumlahBuktiPotongPphNonResiden = dataRekap[2]["__EMPTY_6"];

//     // console.log(data42152223);
//     // To handle data data42152223, make a separate function here
//     for (let i = 1; i < data42152223.length; i++) {
//       // console.log(data42152223[i]);

//       let no = data42152223[i]["__EMPTY"];
//       let tanggalBuktiSetor = data42152223[i]["__EMPTY_1"];
//       let identitas = data42152223[i]["__EMPTY_2"];
//       let npwpNitku = data42152223[i]["__EMPTY_3"];
//       let nik = data42152223[i]["__EMPTY_4"];
//       let nama = data42152223[i]["__EMPTY_5"];
//       let kodeObjekPajak = data42152223[i]["__EMPTY_8"];
//       let bertindakSebagai = data42152223[i]["__EMPTY_9"];
//       let jenisIdentitas = data42152223[i]["__EMPTY_10"];
//       let nomorIdentitas = data42152223[i]["__EMPTY_11"];
//       let namaIdentitas = data42152223[i]["__EMPTY_13"];
//       let jumlahPenghasilanBruto = data42152223[i]["__EMPTY_14"];
//       let nomorSuratKeteranganBebas = data42152223[i]["__EMPTY_16"];
//       let nomorPPhDitanggungPemerintah = data42152223[i]["__EMPTY_17"];
//       let nomorSuratKeteranganBerdasarkanPPNo232018 =
//         data42152223[i]["__EMPTY_18"];
//       let nomorFasilitasLainnyaberdasarkan = data42152223[i]["__EMPTY_19"];

//       // Format Input
//       tanggalBuktiSetor = new Date(
//         formatTextToDate(data42152223[i]["__EMPTY_1"])
//       );
//       if (data42152223[i]["__EMPTY_2"].toUpperCase().trim() === "NPWP") {
//         identitas = "NPWP/NITKU";
//       }

//       // Input Data
//       // 01.) Find Next EBupot Unifikasi Pph42152223
//       let maxNomorBuktiSetor = await EBupotUnifikasiPph42152223.max(
//         "nomorBuktiSetor",
//         {
//           where: {
//             userIdInput: req.body.userIdInput, // Apply the where clause to filter by userIdInput
//           },
//           transaction,
//         }
//       );
//       if (maxNomorBuktiSetor === null) {
//         maxNomorBuktiSetor = "0000000000";
//       }
//       let nextNomorBuktiSetor = findNextKode(parseInt(maxNomorBuktiSetor), 10);

//       // 02.) Find Objek Pajak
//       let findObjekPajak = await ObjekPajak.findOne({
//         where: {
//           kodeObjekPajak: kodeObjekPajak,
//           untukBupotUnifikasi: "PPh 42152223",
//         },
//       });

//       // 03.) Find pPhYangDipotongDipungut
//       let pPhYangDipotongDipungut = parseInt(
//         (parseInt(jumlahPenghasilanBruto) * findObjekPajak.tarifPersen) / 100
//       );

//       // 04.) Find Penandatangan
//       let findPenandatangan = await Penandatangan.findOne({
//         where: {
//           userPenandatanganId: req.body.userId,
//           nomorIdentitas: nomorIdentitas,
//         },
//       });

//       // 05.) Cari Masa Pajak
//       let tempBulanPajak = masaPajak;
//       let tempMasaPajak = getMonthName(masaPajak);

//       let inputData = {
//         nomorBuktiSetor: nextNomorBuktiSetor,
//         tanggalBuktiSetor,
//         userEBupotUnifikasiPph42152223Id: req.body.userId,
//         tahunPajak,
//         bulanPajak: tempBulanPajak,
//         masaPajak: tempMasaPajak,
//         identitas,
//         npwpNitku,
//         nik,
//         nama,
//         objekPajakId: findObjekPajak.id,
//         nomorSuratKeteranganBebas,
//         nomorPPhDitanggungPemerintah,
//         nomorSuratKeteranganBerdasarkanPPNo232018,
//         nomorFasilitasLainnyaberdasarkan,
//         jumlahPenghasilanBruto: parseInt(jumlahPenghasilanBruto),
//         tarif: findObjekPajak.tarifPersen,
//         pPhYangDipotongDipungut, // Nanti dihitung di backend
//         penandatanganId: findPenandatangan.id,
//         tindakanKelebihanPemotonganPph: 1,
//         userIdInput: req.body.userId,
//         cabangId: req.body.kodeCabang,
//       };
//       // Convert null values to empty strings
//       Object.keys(inputData).forEach((key) => {
//         if (inputData[key] === undefined) {
//           inputData[key] = "";
//         }
//         if (typeof inputData[key] == "string") {
//           inputData[key] = inputData[key].toUpperCase().trim();
//         }
//       });
//       // console.log("inputData");
//       // console.log(inputData);

//       // Save EBupotUnifikasiPph42152223
//       const insertedEBupotUnifikasiPph42152223 =
//         await EBupotUnifikasiPph42152223.create(inputData, { transaction });

//       const dasarPemotongans = dataDasarPemotongan.filter(
//         (item) => item.__EMPTY_1 == "42152223" && item.__EMPTY == no
//       );

//       for (let dasarPemotongan of dasarPemotongans) {
//         let tanggalDokumen = new Date(
//           formatTextToDate(dasarPemotongan["__EMPTY_4"])
//         );

//         let inputDasarPemotongan = {
//           namaDokumen: getNamaDokumenByKode(dasarPemotongan["__EMPTY_2"]),
//           noDokumen: dasarPemotongan["__EMPTY_3"],
//           tanggalDokumen,
//           eBupotUnifikasiPph42152223Id: insertedEBupotUnifikasiPph42152223.id,
//           userIdInput: req.body.userId,
//           cabangId: req.body.kodeCabang,
//         };

//         // Save DokumenDasarPemotonganEBupotUnifikasiPph42152223
//         const insertedDokumenDasarPemotonganEBupotUnifikasiPph42152223 =
//           await DokumenDasarPemotonganEBupotUnifikasiPph42152223.create(
//             inputDasarPemotongan,
//             { transaction }
//           );
//         // console.log(inputDasarPemotongan);
//       }
//     }

//     // console.log(dataNR);
//     // To handle data dataNR, make a separate function here
//     for (let i = 1; i < dataNR.length; i++) {
//       console.log(dataNR[i]);

//       let no = dataNR[i]["__EMPTY"];
//       let tanggalBuktiSetor = dataNR[i]["__EMPTY_1"];
//       let tin = dataNR[i]["__EMPTY_2"];
//       let nama = dataNR[i]["__EMPTY_3"];
//       let alamat = dataNR[i]["__EMPTY_6"];
//       let tempatLahir = dataNR[i]["__EMPTY_5"];
//       let noPaspor = dataNR[i]["__EMPTY_7"];
//       let kodeNegara = dataNR[i]["__EMPTY_9"];
//       let tanggalLahir = dataNR[i]["__EMPTY_4"];
//       let noKitasKitap = dataNR[i]["__EMPTY_8"];
//       let kodeObjekPajak = dataNR[i]["__EMPTY_10"];
//       let nomorSkdWpln = dataNR[i]["__EMPTY_19"];
//       let nomorPPhDitanggungPemerintah = dataNR[i]["__EMPTY_21"];
//       let nomorFasilitasLainnyaberdasarkan = dataNR[i]["__EMPTY_22"];
//       let jumlahPenghasilanBruto = dataNR[i]["__EMPTY_16"];
//       let perkiraanPenghasilanNetto = dataNR[i]["__EMPTY_17"];
//       let nomorIdentitas = dataNR[i]["__EMPTY_13"];
//       let namaIdentitas = dataNR[i]["__EMPTY_15"];

//       // Format Input
//       tanggalBuktiSetor = new Date(formatTextToDate(dataNR[i]["__EMPTY_1"]));
//       if (
//         dataNR[i]["__EMPTY_4"] !== "-" &&
//         dataNR[i]["__EMPTY_4"] !== undefined
//       ) {
//         tanggalLahir = new Date(formatTextToDate(dataNR[i]["__EMPTY_4"]));
//       }
//       if (dataNR[i]["__EMPTY_4"] === "-") {
//         tanggalLahir = null;
//       }

//       // Input Data
//       // 01.) Find Next EBupot Unifikasi PphNonResiden
//       let maxNomorBuktiSetor = await EBupotUnifikasiPphNonResiden.max(
//         "nomorBuktiSetor",
//         {
//           where: {
//             userIdInput: req.body.userIdInput, // Apply the where clause to filter by userIdInput
//           },
//         }
//       );
//       if (maxNomorBuktiSetor === null) {
//         maxNomorBuktiSetor = "0000000000";
//       }
//       let nextNomorBuktiSetor = findNextKode(parseInt(maxNomorBuktiSetor), 10);

//       // 02.) Find Objek Pajak
//       let findObjekPajak = await ObjekPajak.findOne({
//         where: {
//           kodeObjekPajak: kodeObjekPajak,
//           untukBupotUnifikasi: "PPh Non Residen",
//         },
//       });

//       // 03.) Find pPhYangDipotongDipungut
//       let pPhYangDipotongDipungut = parseInt(
//         (((parseInt(jumlahPenghasilanBruto) *
//           parseInt(perkiraanPenghasilanNetto)) /
//           100) *
//           findObjekPajak.tarifPersen) /
//           100
//       );

//       // 04.) Find Penandatangan
//       let findPenandatangan = await Penandatangan.findOne({
//         where: {
//           userPenandatanganId: req.body.userId,
//           nomorIdentitas: nomorIdentitas,
//         },
//       });

//       // 05.) Cari Masa Pajak
//       let tempBulanPajak = masaPajak;
//       let tempMasaPajak = getMonthName(masaPajak);

//       // 06.) Find Negara
//       let findNegara = await Negara.findOne({
//         where: {
//           kodeNegara: kodeNegara,
//         },
//       });

//       let inputData = {
//         nomorBuktiSetor: nextNomorBuktiSetor,
//         tanggalBuktiSetor,
//         userEBupotUnifikasiPphNonResidenId: req.body.userId,
//         tahunPajak,
//         bulanPajak: tempBulanPajak,
//         masaPajak: tempMasaPajak,
//         tin,
//         nama,
//         alamat,
//         tempatLahir,
//         noPaspor,
//         negaraId: findNegara.id,
//         tanggalLahir,
//         noKitasKitap,
//         objekPajakId: findObjekPajak.id,
//         nomorSkdWpln,
//         nomorPPhDitanggungPemerintah,
//         nomorFasilitasLainnyaberdasarkan,
//         jumlahPenghasilanBruto,
//         perkiraanPenghasilanNetto,
//         tarif: findObjekPajak.tarifPersen,
//         pPhYangDipotongDipungut,
//         penandatanganId: findPenandatangan.id,
//         tindakanKelebihanPemotonganPph: 1,
//         userIdInput: req.body.userId,
//         cabangId: req.body.kodeCabang,
//       };
//       // Convert null values to empty strings
//       Object.keys(inputData).forEach((key) => {
//         if (inputData[key] === undefined) {
//           inputData[key] = "";
//         }
//         if (typeof inputData[key] == "string") {
//           inputData[key] = inputData[key].toUpperCase().trim();
//         }
//       });
//       // console.log("inputData");
//       // console.log(inputData);

//       // Save EBupotUnifikasiPphNonResiden
//       const insertedEBupotUnifikasiPphNonResiden =
//         await EBupotUnifikasiPphNonResiden.create(inputData, { transaction });

//       const dasarPemotongans = dataDasarPemotongan.filter(
//         (item) => item.__EMPTY_1 == "NR" && item.__EMPTY == no
//       );

//       for (let dasarPemotongan of dasarPemotongans) {
//         let tanggalDokumen = new Date(
//           formatTextToDate(dasarPemotongan["__EMPTY_4"])
//         );

//         let inputDasarPemotongan = {
//           namaDokumen: getNamaDokumenByKode(dasarPemotongan["__EMPTY_2"]),
//           noDokumen: dasarPemotongan["__EMPTY_3"],
//           tanggalDokumen,
//           eBupotUnifikasiPphNonResidenId:
//             insertedEBupotUnifikasiPphNonResiden.id,
//           userIdInput: req.body.userId,
//           cabangId: req.body.kodeCabang,
//         };

//         // Save DokumenDasarPemotonganEBupotUnifikasiPphNonResiden
//         const insertedDokumenDasarPemotonganEBupotUnifikasiPphNonResiden =
//           await DokumenDasarPemotonganEBupotUnifikasiPphNonResiden.create(
//             inputDasarPemotongan,
//             { transaction }
//           );
//         // console.log(inputDasarPemotongan);
//       }
//     }

//     // const insertedEBupotUnifikasiImporData =
//     //   await EBupotUnifikasiImporData.create(
//     //     {
//     //       ...req.body,
//     //       userEBupotUnifikasiImporDataId: req.body.userId,
//     //       nomorTiket,
//     //       tanggalUpload,
//     //       cabangId: req.body.kodeCabang,
//     //     },
//     //     { transaction }
//     //   );

//     // Status 201 = Created
//     await transaction.commit();
//     // res.status(201).json(insertedEBupotUnifikasiImporData);
//     res.status(201).json("Saved");
//   } catch (error) {
//     if (transaction) {
//       await transaction.rollback();
//     }
//     // Error 400 = Kesalahan dari sisi user
//     res.status(400).json({ message: error.message });
//   }
// };

// Utility function to get the next "Nomor Bukti Setor"
const getNextNomorBuktiSetor = async (model, userIdInput, transaction) => {
  const maxNomorBuktiSetor = await model.max("nomorBuktiSetor", {
    where: { userIdInput },
    transaction,
  });
  return maxNomorBuktiSetor || "0000000000";
};

// Utility function to calculate "PPh Yang Dipotong/Dipungut"
const calculatePPh = (
  jumlahPenghasilanBruto,
  perkiraanPenghasilanNetto,
  tarifPersen
) => {
  return Math.round(
    (((parseInt(jumlahPenghasilanBruto) * parseInt(perkiraanPenghasilanNetto)) /
      100) *
      tarifPersen) /
      100
  );
};

// Utility function to prepare input data and handle empty strings
const prepareInputData = (data) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) data[key] = "";
    if (typeof data[key] === "string")
      // data[key] = data[key].toUpperCase().trim();
      data[key] = data[key].trim();
  });
  return data;
};

const processData42152223 = async (
  data42152223,
  dataDasarPemotongan,
  masaPajak,
  tahunPajak,
  req,
  transaction
) => {
  for (let i = 1; i < data42152223.length; i++) {
    const record = data42152223[i];
    let {
      __EMPTY: no,
      __EMPTY_1: tanggalBuktiSetor,
      __EMPTY_2: identitas,
      __EMPTY_3: npwpNitku,
      __EMPTY_4: nik,
      __EMPTY_5: nama,
      __EMPTY_8: kodeObjekPajak,
      __EMPTY_10: jenisIdentitas,
      __EMPTY_11: nomorIdentitasNpwp,
      __EMPTY_12: nomorIdentitasNik,
      __EMPTY_13: namaIdentitas,
      __EMPTY_14: jumlahPenghasilanBruto,
      __EMPTY_16: nomorSuratKeteranganBebas,
      __EMPTY_17: nomorPPhDitanggungPemerintah,
      __EMPTY_18: nomorSuratKeteranganBerdasarkanPPNo232018,
      __EMPTY_19: nomorFasilitasLainnyaberdasarkan,
    } = record;

    tanggalBuktiSetor = new Date(formatTextToDate(tanggalBuktiSetor));
    if (identitas.trim().toUpperCase() === "NPWP") identitas = "NPWP/NITKU";

    const maxNomorBuktiSetor = await getNextNomorBuktiSetor(
      EBupotUnifikasiPph42152223,
      req.body.userIdInput,
      transaction
    );
    const nextNomorBuktiSetor = findNextKode(parseInt(maxNomorBuktiSetor), 10);

    const findObjekPajak = await ObjekPajak.findOne({
      where: { kodeObjekPajak, untukBupotUnifikasi: "PPh 42152223" },
    });
    const pPhYangDipotongDipungut = Math.round(
      (parseInt(jumlahPenghasilanBruto) * findObjekPajak.tarifPersen) / 100
    );

    let nomorIdentitas = undefined;
    if (nomorIdentitasNpwp) {
      nomorIdentitas = nomorIdentitasNpwp;
    } else if (nomorIdentitasNik) {
      nomorIdentitas = nomorIdentitasNik;
    }
    const findPenandatangan = await Penandatangan.findOne({
      where: {
        userPenandatanganId: req.body.userId,
        nomorIdentitas,
      },
    });

    // Cari Masa Pajak
    let tempBulanPajak = masaPajak;
    let tempMasaPajak = getMonthName(masaPajak);

    const inputData = prepareInputData({
      nomorBuktiSetor: nextNomorBuktiSetor,
      tanggalBuktiSetor,
      userEBupotUnifikasiPph42152223Id: req.body.userId,
      tahunPajak,
      bulanPajak: tempBulanPajak,
      masaPajak: tempMasaPajak.toString().padStart(2, "0"),
      identitas,
      npwpNitku,
      nik,
      nama: nama.toUpperCase(),
      objekPajakId: findObjekPajak.id,
      jumlahPenghasilanBruto,
      tarif: findObjekPajak.tarifPersen,
      pPhYangDipotongDipungut,
      penandatanganId: findPenandatangan.id,
      userIdInput: req.body.userId,
      cabangId: req.body.kodeCabang,
    });

    const insertedEBupotUnifikasiPph42152223 =
      await EBupotUnifikasiPph42152223.create(inputData, {
        transaction,
      });

    const dasarPemotongans = dataDasarPemotongan.filter(
      (item) => item.__EMPTY_1 == "42152223" && item.__EMPTY == no
    );

    for (let dasarPemotongan of dasarPemotongans) {
      let tanggalDokumen = new Date(
        formatTextToDate(dasarPemotongan["__EMPTY_4"])
      );
      let inputDasarPemotongan = {
        namaDokumen: getNamaDokumenByKode(dasarPemotongan["__EMPTY_2"]),
        noDokumen: dasarPemotongan["__EMPTY_3"],
        tanggalDokumen,
        eBupotUnifikasiPph42152223Id: insertedEBupotUnifikasiPph42152223.id,
        userIdInput: req.body.userId,
        cabangId: req.body.kodeCabang,
      };

      await DokumenDasarPemotonganEBupotUnifikasiPph42152223.create(
        inputDasarPemotongan,
        { transaction }
      );
    }
  }
};

const processDataNR = async (
  dataNR,
  dataDasarPemotongan,
  masaPajak,
  tahunPajak,
  req,
  transaction
) => {
  for (let i = 1; i < dataNR.length; i++) {
    let no = dataNR[i]["__EMPTY"];
    let tanggalBuktiSetor = new Date(formatTextToDate(dataNR[i]["__EMPTY_1"]));
    let tin = dataNR[i]["__EMPTY_2"];
    let nama = dataNR[i]["__EMPTY_3"];
    let alamat = dataNR[i]["__EMPTY_6"];
    let tempatLahir = dataNR[i]["__EMPTY_5"];
    let noPaspor = dataNR[i]["__EMPTY_7"];
    let kodeNegara = dataNR[i]["__EMPTY_9"];
    let tanggalLahir = dataNR[i]["__EMPTY_4"]
      ? new Date(formatTextToDate(dataNR[i]["__EMPTY_4"]))
      : null;
    let noKitasKitap = dataNR[i]["__EMPTY_8"];
    let kodeObjekPajak = dataNR[i]["__EMPTY_10"];
    let nomorSkdWpln = dataNR[i]["__EMPTY_19"];
    let nomorPPhDitanggungPemerintah = dataNR[i]["__EMPTY_21"];
    let nomorFasilitasLainnyaberdasarkan = dataNR[i]["__EMPTY_22"];
    let jumlahPenghasilanBruto = dataNR[i]["__EMPTY_16"];
    let perkiraanPenghasilanNetto = dataNR[i]["__EMPTY_17"];
    let nomorIdentitasNpwp = dataNR[i]["__EMPTY_13"];
    let nomorIdentitasNik = dataNR[i]["__EMPTY_14"];
    let namaIdentitas = dataNR[i]["__EMPTY_15"];

    let maxNomorBuktiSetor = await EBupotUnifikasiPphNonResiden.max(
      "nomorBuktiSetor",
      {
        where: { userIdInput: req.body.userId },
        transaction,
      }
    );
    maxNomorBuktiSetor = maxNomorBuktiSetor || "0000000000";
    let nextNomorBuktiSetor = findNextKode(parseInt(maxNomorBuktiSetor), 10);

    let findObjekPajak = await ObjekPajak.findOne({
      where: { kodeObjekPajak, untukBupotUnifikasi: "PPh Non Residen" },
    });

    let pPhYangDipotongDipungut = parseInt(
      (((parseInt(jumlahPenghasilanBruto) *
        parseInt(perkiraanPenghasilanNetto)) /
        100) *
        findObjekPajak.tarifPersen) /
        100
    );

    let nomorIdentitas = undefined;
    if (nomorIdentitasNpwp) {
      nomorIdentitas = nomorIdentitasNpwp;
    } else if (nomorIdentitasNik) {
      nomorIdentitas = nomorIdentitasNik;
    }
    let findPenandatangan = await Penandatangan.findOne({
      where: {
        userPenandatanganId: req.body.userId,
        nomorIdentitas,
      },
    });

    let tempBulanPajak = masaPajak;
    let tempMasaPajak = getMonthName(masaPajak);

    let findNegara = await Negara.findOne({ where: { kodeNegara } });

    let inputData = {
      nomorBuktiSetor: nextNomorBuktiSetor,
      tanggalBuktiSetor,
      userEBupotUnifikasiPphNonResidenId: req.body.userId,
      tahunPajak,
      bulanPajak: tempBulanPajak,
      masaPajak: tempMasaPajak.toString().padStart(2, "0"),
      tin,
      nama: nama.toUpperCase(),
      alamat,
      tempatLahir,
      noPaspor,
      negaraId: findNegara.id,
      tanggalLahir,
      noKitasKitap,
      objekPajakId: findObjekPajak.id,
      nomorSkdWpln,
      nomorPPhDitanggungPemerintah,
      nomorFasilitasLainnyaberdasarkan,
      jumlahPenghasilanBruto,
      perkiraanPenghasilanNetto,
      tarif: findObjekPajak.tarifPersen,
      pPhYangDipotongDipungut,
      penandatanganId: findPenandatangan.id,
      tindakanKelebihanPemotonganPph: 1,
      userIdInput: req.body.userId,
      cabangId: req.body.kodeCabang,
    };

    Object.keys(inputData).forEach((key) => {
      if (inputData[key] === undefined) inputData[key] = "";
      if (typeof inputData[key] === "string")
        inputData[key] = inputData[key].trim();
    });

    const insertedEBupotUnifikasiPphNonResiden =
      await EBupotUnifikasiPphNonResiden.create(inputData, { transaction });

    const dasarPemotongans = dataDasarPemotongan.filter(
      (item) => item.__EMPTY_1 == "NR" && item.__EMPTY == no
    );

    for (let dasarPemotongan of dasarPemotongans) {
      let tanggalDokumen = new Date(
        formatTextToDate(dasarPemotongan["__EMPTY_4"])
      );
      let inputDasarPemotongan = {
        namaDokumen: getNamaDokumenByKode(dasarPemotongan["__EMPTY_2"]),
        noDokumen: dasarPemotongan["__EMPTY_3"],
        tanggalDokumen,
        eBupotUnifikasiPphNonResidenId: insertedEBupotUnifikasiPphNonResiden.id,
        userIdInput: req.body.userId,
        cabangId: req.body.kodeCabang,
      };

      await DokumenDasarPemotonganEBupotUnifikasiPphNonResiden.create(
        inputDasarPemotongan,
        { transaction }
      );
    }
  }
};

const saveEBupotUnifikasiImporData = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    // Initialize basic data
    const nomorTiket = generateRandomNumberString(7);
    const tanggalUpload = new Date();
    let pasal = "";
    let barisExcel = "";
    let status = "Berhasil Validasi";
    let keteranganUpload = "Berhasil Upload";

    const {
      Rekap: dataRekap,
      42152223: data42152223,
      NR: dataNR,
      "Dasar Pemotongan": dataDasarPemotongan,
    } = req.body.jsonData;

    if (dataRekap.length !== 3) {
      status = "Gagal Validasi";
      keteranganUpload = "Format Excel tidak sesuai.";
      // Save EBupotUnifikasiImporData
      const insertedEBupotUnifikasiImporData =
        await EBupotUnifikasiImporData.create(
          {
            userEBupotUnifikasiImporDataId: req.body.userId,
            nomorTiket,
            namaFile: req.body.fileName,
            tanggalUpload,
            jumlahBaris: 0,
            status,
            keteranganUpload,
            masaPajak: req.body.masaPajak.toString().padStart(2, "0"),
            tahunPajak: req.body.tahunPajak,
            jumlahBuktiPotongPph42152223: 0,
            jumlahBuktiPotongPphNonResiden: 0,
            userIdInput: req.body.userId,
            cabangId: req.body.kodeCabang,
          },
          { transaction }
        );
      // Commit transaction and respond with success
      await transaction.commit();
      res.status(201).json("Saved!");
      return;
    }
    const tahunPajak = dataRekap[0]["__EMPTY_3"];
    const masaPajak = dataRekap[0]["__EMPTY_6"];
    const jumlahBuktiPotongPph42152223 = dataRekap[1]["__EMPTY_6"];
    const jumlahBuktiPotongPphNonResiden = dataRekap[2]["__EMPTY_6"];

    // 01.) Handle Input
    let ifTahunPajakMasaPajakKosong =
      dataRekap[0]["__EMPTY_3"] === undefined ||
      dataRekap[0]["__EMPTY_6"] === undefined;
    let ifTahunPajakMasaPajakSalah =
      req.body.tahunPajak != tahunPajak ||
      getMonthIndex(req.body.masaPajak) != masaPajak;

    if (ifTahunPajakMasaPajakKosong) {
      status = "Gagal Validasi";
      keteranganUpload = "Masa/Tahun Pajak pada excel tidak sesuai.";
      // Save EBupotUnifikasiImporData
      const insertedEBupotUnifikasiImporData =
        await EBupotUnifikasiImporData.create(
          {
            userEBupotUnifikasiImporDataId: req.body.userId,
            nomorTiket,
            namaFile: req.body.fileName,
            tanggalUpload,
            jumlahBaris: 0,
            status,
            keteranganUpload,
            masaPajak: req.body.masaPajak.toString().padStart(2, "0"),
            tahunPajak: req.body.tahunPajak,
            jumlahBuktiPotongPph42152223: jumlahBuktiPotongPph42152223,
            jumlahBuktiPotongPphNonResiden: jumlahBuktiPotongPphNonResiden,
            userIdInput: req.body.userId,
            cabangId: req.body.kodeCabang,
          },
          { transaction }
        );
      // Commit transaction and respond with success
      await transaction.commit();
      res.status(201).json("Saved!");
      return;
    }
    if (ifTahunPajakMasaPajakSalah) {
      status = "Gagal Validasi";
      keteranganUpload = "Masa/Tahun Pajak pada excel tidak sesuai.";
    }
    for (let i = 1; i < data42152223.length; i++) {
      const record = data42152223[i];
      let {
        __EMPTY: no,
        __EMPTY_1: tanggalBuktiSetor,
        __EMPTY_2: identitas,
        __EMPTY_3: npwpNitku,
        __EMPTY_4: nik,
        __EMPTY_5: nama,
        __EMPTY_8: kodeObjekPajak,
        __EMPTY_10: jenisIdentitas,
        __EMPTY_11: nomorIdentitasNpwp,
        __EMPTY_12: nomorIdentitasNik,
        __EMPTY_13: namaIdentitas,
        __EMPTY_14: jumlahPenghasilanBruto,
        __EMPTY_16: nomorSuratKeteranganBebas,
        __EMPTY_17: nomorPPhDitanggungPemerintah,
        __EMPTY_18: nomorSuratKeteranganBerdasarkanPPNo232018,
        __EMPTY_19: nomorFasilitasLainnyaberdasarkan,
      } = record;
      const findObjekPajak = await ObjekPajak.findOne({
        where: { kodeObjekPajak, untukBupotUnifikasi: "PPh 42152223" },
      });

      let nomorIdentitas = undefined;
      if (nomorIdentitasNpwp) {
        nomorIdentitas = nomorIdentitasNpwp;
      } else if (nomorIdentitasNik) {
        nomorIdentitas = nomorIdentitasNik;
      } else {
        nomorIdentitas = "";
      }
      const findPenandatangan = await Penandatangan.findOne({
        where: {
          userPenandatanganId: req.body.userId,
          nomorIdentitas,
        },
      });

      if (no == undefined) {
        pasal = "PPh Pasal 4 ayat (2), 15, 22, 23";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data No di baris ke ${i} kosong.`;
        break;
      } else if (tanggalBuktiSetor == undefined) {
        pasal = "PPh Pasal 4 ayat (2), 15, 22, 23";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Tgl Pemotongan di baris ke ${i} kosong.`;
        break;
      } else if (isNotDateFormat(tanggalBuktiSetor)) {
        pasal = "PPh Pasal 4 ayat (2), 15, 22, 23";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Tgl Pemotongan di baris ke ${i} salah format tanggal.`;
        break;
      } else if (identitas == undefined) {
        pasal = "PPh Pasal 4 ayat (2), 15, 22, 23";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Penerima Penghasilan di baris ke ${i} kosong.`;
        break;
      } else if (nama == undefined) {
        pasal = "PPh Pasal 4 ayat (2), 15, 22, 23";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Nama Penerima Penghasilan Sesuai NIK di baris ke ${i} kosong.`;
        break;
      } else if (kodeObjekPajak == undefined) {
        pasal = "PPh Pasal 4 ayat (2), 15, 22, 23";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Kode Objek Pajak di baris ke ${i} kosong.`;
        break;
      } else if (!findObjekPajak) {
        pasal = "PPh Pasal 4 ayat (2), 15, 22, 23";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Kode Objek Pajak di baris ke ${i} tidak ditemukan / tidak sesuai dengan Kode Objek Pajak untuk PPh Pasal 4 ayat (2), 15, 22, 23.`;
        break;
      } else if (nomorIdentitas == undefined) {
        pasal = "PPh Pasal 4 ayat (2), 15, 22, 23";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data NPWP dan NIK Penandatangan di baris ke ${i} kosong.`;
        break;
      } else if (!findPenandatangan) {
        pasal = "PPh Pasal 4 ayat (2), 15, 22, 23";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Penandatangan di baris ke ${i} tidak ditemukan.`;
        break;
      } else if (jumlahPenghasilanBruto == undefined) {
        pasal = "PPh Pasal 4 ayat (2), 15, 22, 23";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Penghasilan Bruto di baris ke ${i} kosong.`;
        break;
      } else if (isNaN(jumlahPenghasilanBruto)) {
        pasal = "PPh Pasal 4 ayat (2), 15, 22, 23";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Penghasilan Bruto di baris ke ${i} format angka salah.`;
        break;
      }
    }
    for (let i = 1; i < dataNR.length; i++) {
      const record = dataNR[i];
      let {
        __EMPTY: no,
        __EMPTY_1: tanggalBuktiSetor,
        __EMPTY_2: tin,
        __EMPTY_3: nama,
        __EMPTY_4: tanggalLahir,
        __EMPTY_5: tempatLahir,
        __EMPTY_6: alamat,
        __EMPTY_7: noPaspor,
        __EMPTY_8: noKitasKitap,
        __EMPTY_9: kodeNegara,
        __EMPTY_10: kodeObjekPajak,
        __EMPTY_13: nomorIdentitasNpwp,
        __EMPTY_14: nomorIdentitasNik,
        __EMPTY_15: namaIdentitas,
        __EMPTY_16: jumlahPenghasilanBruto,
        __EMPTY_17: perkiraanPenghasilanNetto,
        __EMPTY_19: nomorSkdWpln,
        __EMPTY_21: nomorPPhDitanggungPemerintah,
        __EMPTY_22: nomorFasilitasLainnyaberdasarkan,
      } = record;
      let findObjekPajak = await ObjekPajak.findOne({
        where: { kodeObjekPajak, untukBupotUnifikasi: "PPh Non Residen" },
      });

      let nomorIdentitas = undefined;
      if (nomorIdentitasNpwp) {
        nomorIdentitas = nomorIdentitasNpwp;
      } else if (nomorIdentitasNik) {
        nomorIdentitas = nomorIdentitasNik;
      } else {
        nomorIdentitas = "";
      }
      const findPenandatangan = await Penandatangan.findOne({
        where: {
          userPenandatanganId: req.body.userId,
          nomorIdentitas,
        },
      });

      let findNegara = await Negara.findOne({ where: { kodeNegara } });

      if (no == undefined) {
        pasal = "PPh Non Residen";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data No di baris ke ${i} kosong.`;
        break;
      } else if (tanggalBuktiSetor == undefined) {
        pasal = "PPh Non Residen";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Tgl Pemotongan di baris ke ${i} kosong.`;
        break;
      } else if (tin == undefined) {
        pasal = "PPh Non Residen";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data TIN di baris ke ${i} kosong.`;
        break;
      } else if (nama == undefined) {
        pasal = "PPh Non Residen";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Nama Penerima Penghasilan di baris ke ${i} kosong.`;
        break;
      } else if (kodeNegara == undefined) {
        pasal = "PPh Non Residen";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Kode Negara di baris ke ${i} kosong.`;
        break;
      } else if (!findNegara) {
        pasal = "PPh Non Residen";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Kode Negara di baris ke ${i} tidak ditemukan.`;
        break;
      } else if (kodeObjekPajak == undefined) {
        pasal = "PPh Non Residen";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Kode Objek Pajak di baris ke ${i} kosong.`;
        break;
      } else if (!findObjekPajak) {
        pasal = "PPh Non Residen";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Kode Objek Pajak di baris ke ${i} tidak ditemukan.`;
        break;
      } else if (jumlahPenghasilanBruto == undefined) {
        pasal = "PPh Non Residen";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Penghasilan Bruto di baris ke ${i} kosong.`;
        break;
      } else if (isNaN(jumlahPenghasilanBruto)) {
        pasal = "PPh Non Residen";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Penghasilan Bruto di baris ke ${i} format angka salah.`;
        break;
      } else if (perkiraanPenghasilanNetto == undefined) {
        pasal = "PPh Non Residen";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Perkiraan Penghasilan Neto di baris ke ${i} kosong.`;
        break;
      } else if (isNaN(perkiraanPenghasilanNetto)) {
        pasal = "PPh Non Residen";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Perkiraan Penghasilan Neto di baris ke ${i} format angka salah.`;
        break;
      } else if (nomorIdentitas == undefined) {
        pasal = "PPh Non Residen";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data NPWP / NIK Penandatangan di baris ke ${i} tidak ditemukan.`;
        break;
      } else if (!findPenandatangan) {
        pasal = "PPh Non Residen";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Penandatangan di baris ke ${i} tidak ditemukan.`;
        break;
      }
    }
    for (let i = 1; i < dataDasarPemotongan.length; i++) {
      const record = dataDasarPemotongan[i];
      let {
        __EMPTY: no,
        __EMPTY_1: worksheet,
        __EMPTY_2: namaDokumen,
        __EMPTY_3: noDokumen,
        __EMPTY_4: tanggalDokumen,
      } = record;

      if (no == undefined) {
        pasal = "Dasar Pemotongan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data No di baris ke ${i} kosong.`;
        break;
      } else if (worksheet == undefined) {
        pasal = "Dasar Pemotongan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Worksheet di baris ke ${i} kosong.`;
        break;
      } else if (worksheet != "42152223" && worksheet != "NR") {
        pasal = "Dasar Pemotongan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Worksheet di baris ke ${i} salah format, format yang diinput selain "42152223" dan "NR".`;
        break;
      } else if (namaDokumen == undefined) {
        pasal = "Dasar Pemotongan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Jenis Dokumen di baris ke ${i} kosong.`;
        break;
      } else if (getNamaDokumenByKode(namaDokumen) == "Kode tidak ditemukan") {
        pasal = "Dasar Pemotongan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Jenis Dokumen di baris ke ${i} salah format.`;
        break;
      } else if (noDokumen == undefined) {
        pasal = "Dasar Pemotongan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Nomor Dokumen di baris ke ${i} kosong.`;
        break;
      } else if (tanggalDokumen == undefined) {
        pasal = "Dasar Pemotongan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Tgl Dokumen di baris ke ${i} kosong.`;
        break;
      } else if (isNotDateFormat(tanggalDokumen)) {
        pasal = "Dasar Pemotongan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Tgl Dokumen di baris ke ${i} salah format tanggal.`;
        break;
      }
    }

    // 02.) Save EBupotUnifikasiImporData
    const insertedEBupotUnifikasiImporData =
      await EBupotUnifikasiImporData.create(
        {
          userEBupotUnifikasiImporDataId: req.body.userId,
          nomorTiket,
          namaFile: req.body.fileName,
          tanggalUpload,
          jumlahBaris: 0,
          status,
          keteranganUpload,
          masaPajak,
          tahunPajak,
          jumlahBuktiPotongPph42152223: jumlahBuktiPotongPph42152223,
          jumlahBuktiPotongPphNonResiden: jumlahBuktiPotongPphNonResiden,
          userIdInput: req.body.userId,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );

    if (status === "Gagal Validasi") {
      const insertedEBupotUnifikasiDetilValidasi =
        await EBupotUnifikasiDetilValidasi.create(
          {
            userEBupotUnifikasiDetilValidasiId: req.body.userId,
            userEBupotUnifikasiImporDataId: insertedEBupotUnifikasiImporData.id,
            pasal,
            barisExcel,
            statusValidasi: status,
            keteranganValidasi: keteranganUpload,
            userIdInput: req.body.userId,
            cabangId: req.body.kodeCabang,
          },
          { transaction }
        );
      // Commit transaction and respond with success
      await transaction.commit();
      res.status(201).json("Saved!");
      return;
    }

    console.log("In 1");
    // 03.) Handle data for "42152223"
    await processData42152223(
      data42152223,
      dataDasarPemotongan,
      masaPajak,
      tahunPajak,
      req,
      transaction
    );

    console.log("In 2");
    // 04.) Handle data for "NR"
    await processDataNR(
      dataNR,
      dataDasarPemotongan,
      masaPajak,
      tahunPajak,
      req,
      transaction
    );
    console.log("In 3");

    // Commit transaction and respond with success
    await transaction.commit();
    res.status(201).json("Saved");
  } catch (error) {
    if (transaction) await transaction.rollback();
    res.status(400).json({ message: error.message });
  }
};

const updateEBupotUnifikasiImporData = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let updatedEBupotUnifikasiImporData = await EBupotUnifikasiImporData.update(
      {
        ...req.body,
        cabangId: req.body.kodeCabang,
      },
      {
        where: {
          id: req.params.id,
        },
        transaction,
      }
    );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(updatedEBupotUnifikasiImporData);
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteEBupotUnifikasiImporData = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupotUnifikasiImporData.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json({ message: "E-Bupot Unifikasi Impor Data Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEBupotUnifikasiImporDatas,
  getEBupotUnifikasiImporDatasPagination,
  getEBupotUnifikasiImporDatasByUserPagination,
  getEBupotUnifikasiImporDatasByUserSearchPagination,
  getEBupotUnifikasiImporDataById,
  saveEBupotUnifikasiImporData,
  updateEBupotUnifikasiImporData,
  deleteEBupotUnifikasiImporData,
};
