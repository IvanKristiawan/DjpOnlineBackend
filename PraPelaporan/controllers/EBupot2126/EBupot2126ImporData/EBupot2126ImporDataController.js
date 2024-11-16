const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupot2126ImporData = require("../../../models/EBupot2126/EBupot2126ImporData/EBupot2126ImporDataModel.js");
const EBupot2126DetilValidasi = require("../../../models/EBupot2126/EBupot2126DetilValidasi/EBupot2126DetilValidasiModel.js");
const User = require("../../../../User/models/UserModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
const {
  generateRandomNumberString,
  formatTextToDate,
  getMonthIndex,
  getMonthName,
  getNamaDokumenByKode,
  formatNumberWithComma,
} = require("../../../../helper/helper.js");
const EBupot2126Pph21 = require("../../../models/EBupot2126/EBupot2126Pph21/EBupot2126Pph21Model.js");
const EBupot2126Pph21Tahunan = require("../../../models/EBupot2126/EBupot2126Pph21Tahunan/EBupot2126Pph21TahunanModel.js");
const EBupot2126Pph26 = require("../../../models/EBupot2126/EBupot2126Pph26/EBupot2126Pph26Model.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const EBupot2126Penandatangan = require("../../../models/EBupot2126/Penandatangan/EBupot2126PenandatanganModel.js");
const Negara = require("../../../../Master/models/Negara/NegaraModel.js");
const Ptkp = require("../../../../Master/models/Ptkp/PtkpModel.js");
const Ter = require("../../../../Master/models/Ter/TerModel.js");
const Pkp = require("../../../../Master/models/Pkp/PkpModel.js");
const TarifPph21PP68Tahun2009 = require("../../../../Master/models/TarifPph21PP68Tahun2009/TarifPph21PP68Tahun2009Model.js");

const getEBupot2126ImporDatas = async (req, res) => {
  try {
    const eBupot2126ImporDatas = await EBupot2126ImporData.findAll({
      include: [{ model: User }, { model: Cabang }],
    });
    res.status(200).json(eBupot2126ImporDatas);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupot2126ImporDatasPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {};
  let tempInclude = [{ model: User }, { model: Cabang }];

  const totalRows = await EBupot2126ImporData.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126ImporDatas = await EBupot2126ImporData.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126ImporDatas,
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

const getEBupot2126ImporDatasByUserPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    userIdInput: req.body.userIdInput,
  };
  let tempInclude = [{ model: User }, { model: Cabang }];

  const totalRows = await EBupot2126ImporData.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126ImporDatas = await EBupot2126ImporData.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126ImporDatas,
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

const getEBupot2126ImporDatasByUserSearchPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupot2126ImporDataId: req.body.userEBupot2126ImporDataId,
  };
  let tempInclude = [{ model: User }, { model: Cabang }];

  const totalRows = await EBupot2126ImporData.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126ImporDatas = await EBupot2126ImporData.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126ImporDatas,
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

const getEBupot2126ImporDatasBulananByUserSearchPagination = async (
  req,
  res
) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupot2126ImporDataId: req.body.userEBupot2126ImporDataId,
    tipe: "Bulanan",
  };
  let tempInclude = [{ model: User }, { model: Cabang }];

  const totalRows = await EBupot2126ImporData.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126ImporDatas = await EBupot2126ImporData.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126ImporDatas,
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

const getEBupot2126ImporDatasTahunanByUserSearchPagination = async (
  req,
  res
) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupot2126ImporDataId: req.body.userEBupot2126ImporDataId,
    tipe: "Tahunan",
  };
  let tempInclude = [{ model: User }, { model: Cabang }];

  const totalRows = await EBupot2126ImporData.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126ImporDatas = await EBupot2126ImporData.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126ImporDatas,
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

const getEBupot2126ImporDataById = async (req, res) => {
  try {
    let eBupot2126ImporData = await EBupot2126ImporData.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }, { model: Cabang }],
    });

    res.status(200).json(eBupot2126ImporData);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

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
      //   data[key] = data[key].toUpperCase().trim();
      data[key] = data[key].trim();
  });
  return data;
};

const processData21 = async (
  data21,
  masaPajak,
  tahunPajak,
  req,
  transaction
) => {
  for (let i = 1; i < data21.length; i++) {
    const record = data21[i];
    let {
      __EMPTY: no,
      __EMPTY_1: tanggalBuktiSetor,
      __EMPTY_2: identitas,
      __EMPTY_3: npwpNitku,
      __EMPTY_4: nik,
      __EMPTY_5: nama,
      __EMPTY_6: alamat,
      __EMPTY_7: kodeObjekPajak,
      __EMPTY_8: jenisIdentitas,
      __EMPTY_9: nomorIdentitasNpwp,
      __EMPTY_10: nomorIdentitasNik,
      __EMPTY_11: namaPtkp,
      __EMPTY_12: pegawaiHarian,
      __EMPTY_13: skemaPenghitungan,
      __EMPTY_14: jumlahPenghasilan,
      __EMPTY_15: isAkumulasiPenghasilanBrutoValid,
      __EMPTY_16: akumulasiPenghasilanBruto,
      __EMPTY_17: isFasilitasValid,
      __EMPTY_18: bupot2126FasilitasDtpIkn,
    } = record;

    if (!akumulasiPenghasilanBruto) {
      akumulasiPenghasilanBruto = 0;
    }

    tanggalBuktiSetor = new Date(formatTextToDate(tanggalBuktiSetor));
    if (identitas.trim().toUpperCase() === "NPWP") identitas = "NPWP/NITKU";

    const maxNomorBuktiSetor = await getNextNomorBuktiSetor(
      EBupot2126Pph21,
      req.body.userIdInput,
      transaction
    );
    const nextNomorBuktiSetor = findNextKode(parseInt(maxNomorBuktiSetor), 10);

    const findObjekPajak = await ObjekPajak.findOne({
      where: { kodeObjekPajak, untukBupot2126: "PPh 21" },
    });

    let tempNamaPtkp = `(${namaPtkp})`;
    const findPtkp = await Ptkp.findOne({
      where: { namaPtkp: tempNamaPtkp },
    });

    let tempSkemaPenghitungan = "Gross";
    let hitungDpp = jumlahPenghasilan;
    let tarif = 0;
    let pPhYangDipotongDipungut = 0;

    if (findObjekPajak.bupot2126SkemaPenghitungan) {
      if (skemaPenghitungan.toUpperCase() == "YA") {
        tempSkemaPenghitungan = "Gross Up";
        // 01.) Iterasi 1
        const ptkp = await Ptkp.findOne({
          where: {
            namaPtkp: tempNamaPtkp,
          },
          include: [{ model: Cabang }],
        });

        let tempTer = {
          ptkpId: ptkp.id,
          [Op.and]: [
            {
              jumlahPenghasilanMin: {
                [Op.lte]: jumlahPenghasilan,
              },
            },
            {
              jumlahPenghasilanMax: {
                [Op.gte]: jumlahPenghasilan,
              },
            },
          ],
        };

        const ter = await Ter.findOne({
          where: tempTer,
          include: [
            {
              model: Ptkp,
            },
            { model: Cabang },
          ],
        });

        let hitungPPhYangDipotongDipungut = parseInt(
          (hitungDpp * ter.tarifPersen) / 100
        );
        let jumlahPenghasilanIterasi2 =
          parseInt(jumlahPenghasilan) + hitungPPhYangDipotongDipungut;

        // 02.) Iterasi 2
        let tempTerIterasi2 = {
          ptkpId: ptkp.id,
          [Op.and]: [
            {
              jumlahPenghasilanMin: {
                [Op.lte]: jumlahPenghasilanIterasi2,
              },
            },
            {
              jumlahPenghasilanMax: {
                [Op.gte]: jumlahPenghasilanIterasi2,
              },
            },
          ],
        };

        const terIterasi2 = await Ter.findOne({
          where: tempTerIterasi2,
          include: [
            {
              model: Ptkp,
            },
            { model: Cabang },
          ],
        });

        let cariTarifPersen = formatNumberWithComma(terIterasi2.tarifPersen);
        tarif = cariTarifPersen;

        let hitungPPhYangDipotongDipungutIterasi2 = parseInt(
          (jumlahPenghasilan * (terIterasi2.tarifPersen / 100)) /
            (100 / 100 - terIterasi2.tarifPersen / 100)
        );
        // console.log(hitungPPhYangDipotongDipungutIterasi2);
        pPhYangDipotongDipungut = hitungPPhYangDipotongDipungutIterasi2;

        let hitungDppIterasi2 =
          parseInt(jumlahPenghasilan) +
          parseInt(hitungPPhYangDipotongDipungutIterasi2);

        // console.log(hitungDppIterasi2);
        hitungDpp = hitungDppIterasi2;
      } else {
        const ptkp = await Ptkp.findOne({
          where: {
            namaPtkp: tempNamaPtkp,
          },
          include: [{ model: Cabang }],
        });

        let tempTer = {
          ptkpId: ptkp.id,
          [Op.and]: [
            {
              jumlahPenghasilanMin: {
                [Op.lte]: jumlahPenghasilan,
              },
            },
            {
              jumlahPenghasilanMax: {
                [Op.gte]: jumlahPenghasilan,
              },
            },
          ],
        };

        const ter = await Ter.findOne({
          where: tempTer,
          include: [
            {
              model: Ptkp,
            },
            { model: Cabang },
          ],
        });

        let cariTarifPersen = formatNumberWithComma(ter.tarifPersen);
        tarif = cariTarifPersen;

        let hitungPPhYangDipotongDipungut = parseInt(
          (hitungDpp * ter.tarifPersen) / 100
        );
        pPhYangDipotongDipungut = hitungPPhYangDipotongDipungut;
      }
    } else if (findObjekPajak.bupot2126DasarPengenaanPajak) {
      hitungDpp = (parseInt(jumlahPenghasilan) * 50) / 100;

      let tempPkp = {
        [Op.and]: [
          {
            jumlahPenghasilanMin: {
              [Op.lte]: jumlahPenghasilan,
            },
          },
          {
            jumlahPenghasilanMax: {
              [Op.gte]: jumlahPenghasilan,
            },
          },
        ],
      };

      const pkp = await Pkp.findOne({
        where: tempPkp,
        include: [{ model: Cabang }],
      });
      tarif = pkp.tarifPersen;

      let hitungPPhYangDipotongDipungut =
        (parseInt(hitungDpp) * pkp.tarifPersen) / 100;
      pPhYangDipotongDipungut = hitungPPhYangDipotongDipungut;
    } else if (
      findObjekPajak.bupot2126DasarPengenaanPajakAkumulasiPenghasilanBruto &&
      !findObjekPajak.bupot2126FormulasiPenghitungan
    ) {
      if (isAkumulasiPenghasilanBrutoValid.toUpperCase() == "YA") {
        hitungDpp = parseInt(jumlahPenghasilan);

        let hitungDppTarif = parseInt(akumulasiPenghasilanBruto) + hitungDpp;

        let tempTarifPph21PP68Tahun2009 = {
          [Op.and]: [
            {
              jumlahPenghasilanMin: {
                [Op.lte]: hitungDppTarif,
              },
            },
            {
              jumlahPenghasilanMax: {
                [Op.gte]: hitungDppTarif,
              },
            },
          ],
        };

        const tarifPph21PP68Tahun2009 = await TarifPph21PP68Tahun2009.findOne({
          where: tempTarifPph21PP68Tahun2009,
          include: [{ model: Cabang }],
        });

        tarif = tarifPph21PP68Tahun2009.tarifPersen;

        let hitungPPhYangDipotongDipungut = parseInt(
          (hitungDpp * tarifPph21PP68Tahun2009.tarifPersen) / 100
        );
        pPhYangDipotongDipungut = hitungPPhYangDipotongDipungut;
      } else {
        hitungDpp = parseInt(jumlahPenghasilan);

        let tempTarifPph21PP68Tahun2009 = {
          [Op.and]: [
            {
              jumlahPenghasilanMin: {
                [Op.lte]: hitungDpp,
              },
            },
            {
              jumlahPenghasilanMax: {
                [Op.gte]: hitungDpp,
              },
            },
          ],
        };

        const tarifPph21PP68Tahun2009 = await TarifPph21PP68Tahun2009.findOne({
          where: tempTarifPph21PP68Tahun2009,
          include: [{ model: Cabang }],
        });

        tarif = tarifPph21PP68Tahun2009.tarifPersen;

        let hitungPPhYangDipotongDipungut = parseInt(
          (hitungDpp * tarifPph21PP68Tahun2009.tarifPersen) / 100
        );
        pPhYangDipotongDipungut = hitungPPhYangDipotongDipungut;
      }
    } else if (
      findObjekPajak.bupot2126DasarPengenaanPajakAkumulasiPenghasilanBruto &&
      findObjekPajak.bupot2126FormulasiPenghitungan
    ) {
      if (isAkumulasiPenghasilanBrutoValid.toUpperCase() == "YA") {
        hitungDpp = parseInt(jumlahPenghasilan);
        let hitungDppTarif = parseInt(akumulasiPenghasilanBruto) + hitungDpp;

        let tempTarifPph21PP68Tahun2009 = {
          [Op.and]: [
            {
              jumlahPenghasilanMin: {
                [Op.lte]: hitungDpp + hitungDppTarif,
              },
            },
            {
              jumlahPenghasilanMax: {
                [Op.gte]: hitungDpp + hitungDppTarif,
              },
            },
          ],
        };

        const tarifPph21PP68Tahun2009 = await TarifPph21PP68Tahun2009.findOne({
          where: tempTarifPph21PP68Tahun2009,
          include: [{ model: Cabang }],
        });
        tarif = tarifPph21PP68Tahun2009.tarifPersen;

        let hitungPPhYangDipotongDipungut = parseInt(
          (hitungDpp * tarifPph21PP68Tahun2009.tarifPersen) / 100
        );
        pPhYangDipotongDipungut = hitungPPhYangDipotongDipungut;
      } else {
        hitungDpp = parseInt(jumlahPenghasilan);

        let tempTarifPph21PP68Tahun2009 = {
          [Op.and]: [
            {
              jumlahPenghasilanMin: {
                [Op.lte]: hitungDpp,
              },
            },
            {
              jumlahPenghasilanMax: {
                [Op.gte]: hitungDpp,
              },
            },
          ],
        };

        const tarifPph21PP68Tahun2009 = await TarifPph21PP68Tahun2009.findOne({
          where: tempTarifPph21PP68Tahun2009,
          include: [{ model: Cabang }],
        });
        tarif = tarifPph21PP68Tahun2009.tarifPersen;

        let hitungPPhYangDipotongDipungut = parseInt(
          (hitungDpp * tarifPph21PP68Tahun2009.tarifPersen) / 100
        );
        pPhYangDipotongDipungut = hitungPPhYangDipotongDipungut;
      }
    }

    let nomorIdentitas = undefined;
    if (nomorIdentitasNpwp) {
      nomorIdentitas = nomorIdentitasNpwp;
    } else if (nomorIdentitasNik) {
      nomorIdentitas = nomorIdentitasNik;
    }
    // console.log({
    //   userEBupot2126PenandatanganId: req.body.userId,
    //   nomorIdentitas,
    // });
    const findPenandatangan = await EBupot2126Penandatangan.findOne({
      where: {
        userEBupot2126PenandatanganId: req.body.userId,
        nomorIdentitas,
      },
    });

    // Cari Masa Pajak
    let tempBulanPajak = masaPajak;
    // console.log(`tempBulanPajak: ${tempBulanPajak}`);
    let tempMasaPajak = getMonthName(masaPajak);
    // console.log(`tempMasaPajak: ${tempMasaPajak}`);

    const inputData = prepareInputData({
      nomorBuktiSetor: nextNomorBuktiSetor,
      tanggalBuktiSetor,
      userEBupot2126Pph21Id: req.body.userId,
      tahunPajak,
      bulanPajak: tempBulanPajak.toString().padStart(2, "0"),
      masaPajak: tempMasaPajak,
      identitas,
      npwpNitku,
      nik,
      nama: nama.toUpperCase(),
      alamat: alamat.toUpperCase(),
      objekPajakId: findObjekPajak.id,
      bupot2126SkemaPenghitungan: true,
      bupot2126PtkpTahunan: true,
      ptkpId: findPtkp.id,
      skemaPenghitungan: tempSkemaPenghitungan,
      jumlahPenghasilan,
      dpp: hitungDpp,
      tarif,
      pPhYangDipotongDipungut,
      tindakanKelebihanPemotonganPph: "1",
      eBupot2126PenandatanganId: findPenandatangan.id,
      userIdInput: req.body.userId,
      cabangId: req.body.kodeCabang,
    });
    // console.log(inputData);

    const insertedEBupot2126Pph21 = await EBupot2126Pph21.create(inputData, {
      transaction,
    });
  }
};

const processData26 = async (
  data21,
  masaPajak,
  tahunPajak,
  req,
  transaction
) => {
  for (let i = 1; i < data21.length; i++) {
    const record = data21[i];
    let {
      __EMPTY: no,
      __EMPTY_1: tanggalBuktiSetor,
      __EMPTY_2: tinPasporKitasKitap,
      __EMPTY_3: nama,
      __EMPTY_4: alamat,
      __EMPTY_6: kodeNegara,
      __EMPTY_8: nomorIdentitasNpwp,
      __EMPTY_9: nomorIdentitasNik,
      __EMPTY_10: jumlahPenghasilanBruto,
      __EMPTY_11: fasilitasPajakPenghasilan,
      __EMPTY_12: nomorSkdWpln,
    } = record;
    let kodeObjekPajak = "27-100-99";

    tanggalBuktiSetor = new Date(formatTextToDate(tanggalBuktiSetor));

    const maxNomorBuktiSetor = await getNextNomorBuktiSetor(
      EBupot2126Pph26,
      req.body.userIdInput,
      transaction
    );
    const nextNomorBuktiSetor = findNextKode(parseInt(maxNomorBuktiSetor), 10);

    let negaraId = null;
    if (kodeNegara) {
      let findNegara = await Negara.findOne({
        where: {
          kodeNegara: kodeNegara,
        },
      });
      negaraId = findNegara.id;
    }

    const findObjekPajak = await ObjekPajak.findOne({
      where: { kodeObjekPajak, untukBupot2126: "PPh 26" },
    });
    tarif = findObjekPajak.tarifPersen;

    let totalPphYangDipotongDipungut =
      (parseInt(jumlahPenghasilanBruto) * parseInt(tarif)) / 100;
    let pPhYangDipotongDipungut = totalPphYangDipotongDipungut;

    let nomorIdentitas = undefined;
    if (nomorIdentitasNpwp) {
      nomorIdentitas = nomorIdentitasNpwp;
    } else if (nomorIdentitasNik) {
      nomorIdentitas = nomorIdentitasNik;
    }
    const findPenandatangan = await EBupot2126Penandatangan.findOne({
      where: {
        userEBupot2126PenandatanganId: req.body.userId,
        nomorIdentitas,
      },
    });

    // Cari Masa Pajak
    let tempBulanPajak = masaPajak;
    let tempMasaPajak = getMonthName(masaPajak);

    const inputData = prepareInputData({
      nomorBuktiSetor: nextNomorBuktiSetor,
      tanggalBuktiSetor,
      userEBupot2126Pph26Id: req.body.userId,
      tahunPajak,
      bulanPajak: tempBulanPajak.toString().padStart(2, "0"),
      masaPajak: tempMasaPajak,
      tinPasporKitasKitap,
      nama: nama.toUpperCase(),
      alamat: alamat.toUpperCase(),
      negaraId,
      objekPajakId: findObjekPajak.id,
      jumlahPenghasilanBruto,
      tarif: findObjekPajak.tarifPersen,
      pPhYangDipotongDipungut,
      eBupot2126PenandatanganId: findPenandatangan.id,
      userIdInput: req.body.userId,
      cabangId: req.body.kodeCabang,
    });

    const insertedEBupot2126Pph26 = await EBupot2126Pph26.create(inputData, {
      transaction,
    });
  }
};

const saveEBupot2126BulananImporData = async (req, res) => {
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

    const { Rekap: dataRekap, 21: data21, 26: data26 } = req.body.jsonData;

    if (dataRekap.length !== 3) {
      status = "Gagal Validasi";
      keteranganUpload = "Format Excel tidak sesuai.";
      // Save EBupot2126ImporData
      const insertedEBupot2126ImporData = await EBupot2126ImporData.create(
        {
          userEBupot2126ImporDataId: req.body.userId,
          tipe: "Bulanan",
          nomorTiket,
          namaFile: req.body.fileName,
          tanggalUpload,
          jumlahBaris: 0,
          status,
          keteranganUpload,
          masaPajak: req.body.masaPajak,
          tahunPajak: req.body.tahunPajak,
          jumlahBuktiPotongPph21: 0,
          jumlahBuktiPotongPph26: 0,
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
    const jumlahBuktiPotongPph21 = dataRekap[1]["__EMPTY_6"];
    const jumlahBuktiPotongPph26 = dataRekap[2]["__EMPTY_6"];

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
      // Save EBupot2126ImporData
      const insertedEBupot2126ImporData = await EBupot2126ImporData.create(
        {
          userEBupot2126ImporDataId: req.body.userId,
          tipe: "Bulanan",
          nomorTiket,
          namaFile: req.body.fileName,
          tanggalUpload,
          jumlahBaris: 0,
          status,
          keteranganUpload,
          masaPajak: req.body.masaPajak,
          tahunPajak: req.body.tahunPajak,
          jumlahBuktiPotongPph21: jumlahBuktiPotongPph21,
          jumlahBuktiPotongPph26: jumlahBuktiPotongPph26,
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
    for (let i = 1; i < data21.length; i++) {
      const record = data21[i];
      let {
        __EMPTY: no,
        __EMPTY_1: tanggalBuktiSetor,
        __EMPTY_2: identitas,
        __EMPTY_3: npwpNitku,
        __EMPTY_4: nik,
        __EMPTY_5: nama,
        __EMPTY_6: alamat,
        __EMPTY_7: kodeObjekPajak,
        __EMPTY_8: jenisIdentitas,
        __EMPTY_9: nomorIdentitasNpwp,
        __EMPTY_10: nomorIdentitasNik,
        __EMPTY_11: namaPtkp,
        __EMPTY_12: pegawaiHarian,
        __EMPTY_13: skemaPenghitungan,
        __EMPTY_14: jumlahPenghasilan,
        __EMPTY_15: isAkumulasiPenghasilanBrutoValid,
        __EMPTY_17: isFasilitasValid,
        __EMPTY_18: bupot2126FasilitasDtpIkn,
      } = record;
      const findObjekPajak = await ObjekPajak.findOne({
        where: { kodeObjekPajak, untukBupot2126: "PPh 21" },
      });

      let nomorIdentitas = undefined;
      if (nomorIdentitasNpwp) {
        nomorIdentitas = nomorIdentitasNpwp;
      } else if (nomorIdentitasNik) {
        nomorIdentitas = nomorIdentitasNik;
      } else {
        nomorIdentitas = "";
      }
      const findPenandatangan = await EBupot2126Penandatangan.findOne({
        where: {
          userEBupot2126PenandatanganId: req.body.userId,
          nomorIdentitas,
        },
      });

      if (no == undefined) {
        pasal = "PPh Pasal 21";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data No di baris ke ${i} kosong.`;
        break;
      } else if (tanggalBuktiSetor == undefined) {
        pasal = "PPh Pasal 21";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Tgl Pemotongan di baris ke ${i} kosong.`;
        break;
      } else if (isNotDateFormat(tanggalBuktiSetor)) {
        pasal = "PPh Pasal 21";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Tgl Pemotongan di baris ke ${i} salah format tanggal.`;
        break;
      } else if (identitas == undefined) {
        pasal = "PPh Pasal 21";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Penerima Penghasilan di baris ke ${i} kosong.`;
        break;
      } else if (nama == undefined) {
        pasal = "PPh Pasal 21";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Nama Penerima Penghasilan Sesuai NIK di baris ke ${i} kosong.`;
        break;
      } else if (alamat == undefined) {
        pasal = "PPh Pasal 21";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Alamat Penerima Penghasilan Sesuai NIK di baris ke ${i} kosong.`;
        break;
      } else if (kodeObjekPajak == undefined) {
        pasal = "PPh Pasal 21";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Kode Objek Pajak di baris ke ${i} kosong.`;
        break;
      } else if (!findObjekPajak) {
        pasal = "PPh Pasal 21";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Kode Objek Pajak di baris ke ${i} tidak ditemukan / tidak sesuai dengan Kode Objek Pajak untuk PPh Pasal 21.`;
        break;
      } else if (nomorIdentitas == undefined) {
        pasal = "PPh Pasal 21";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data NPWP dan NIK EBupot2126Penandatangan di baris ke ${i} kosong.`;
        break;
      } else if (!findPenandatangan) {
        pasal = "PPh Pasal 21";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data EBupot2126Penandatangan di baris ke ${i} tidak ditemukan.`;
        break;
      } else if (jumlahPenghasilan == undefined) {
        pasal = "PPh Pasal 21";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Penghasilan di baris ke ${i} kosong.`;
        break;
      } else if (isNaN(jumlahPenghasilan)) {
        pasal = "PPh Pasal 21";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Penghasilan di baris ke ${i} format angka salah.`;
        break;
      }
    }
    for (let i = 1; i < data26.length; i++) {
      const record = data26[i];
      let {
        __EMPTY: no,
        __EMPTY_1: tanggalBuktiSetor,
        __EMPTY_2: tinPasporKitasKitap,
        __EMPTY_3: nama,
        __EMPTY_4: alamat,
        __EMPTY_6: kodeNegara,
        __EMPTY_8: nomorIdentitasNpwp,
        __EMPTY_9: nomorIdentitasNik,
        __EMPTY_10: jumlahPenghasilanBruto,
        __EMPTY_11: fasilitasPajakPenghasilan,
        __EMPTY_12: nomorSkdWpln,
      } = record;
      let kodeObjekPajak = "27-100-99";
      let findObjekPajak = await ObjekPajak.findOne({
        where: { kodeObjekPajak, untukBupot2126: "PPh 26" },
      });

      let nomorIdentitas = undefined;
      if (nomorIdentitasNpwp) {
        nomorIdentitas = nomorIdentitasNpwp;
      } else if (nomorIdentitasNik) {
        nomorIdentitas = nomorIdentitasNik;
      } else {
        nomorIdentitas = "";
      }
      const findPenandatangan = await EBupot2126Penandatangan.findOne({
        where: {
          userEBupot2126PenandatanganId: req.body.userId,
          nomorIdentitas,
        },
      });

      let findNegara = await Negara.findOne({ where: { kodeNegara } });

      if (no == undefined) {
        pasal = "PPh 26";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data No di baris ke ${i} kosong.`;
        break;
      } else if (tanggalBuktiSetor == undefined) {
        pasal = "PPh 26";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Tgl Pemotongan di baris ke ${i} kosong.`;
        break;
      } else if (tinPasporKitasKitap == undefined) {
        pasal = "PPh 26";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data TIN di baris ke ${i} kosong.`;
        break;
      } else if (nama == undefined) {
        pasal = "PPh 26";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Nama Penerima Penghasilan di baris ke ${i} kosong.`;
        break;
      } else if (alamat == undefined) {
        pasal = "PPh 26";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Alamat Penerima Penghasilan di baris ke ${i} kosong.`;
        break;
      } else if (kodeNegara == undefined) {
        pasal = "PPh 26";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Kode Negara di baris ke ${i} kosong.`;
        break;
      } else if (!findNegara) {
        pasal = "PPh 26";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Kode Negara di baris ke ${i} tidak ditemukan.`;
        break;
      } else if (jumlahPenghasilanBruto == undefined) {
        pasal = "PPh 26";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Penghasilan Bruto di baris ke ${i} kosong.`;
        break;
      } else if (isNaN(jumlahPenghasilanBruto)) {
        pasal = "PPh 26";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Penghasilan Bruto di baris ke ${i} format angka salah.`;
        break;
      } else if (nomorIdentitas == undefined) {
        pasal = "PPh 26";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data NPWP / NIK EBupot2126Penandatangan di baris ke ${i} tidak ditemukan.`;
        break;
      } else if (!findPenandatangan) {
        pasal = "PPh 26";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data EBupot2126Penandatangan di baris ke ${i} tidak ditemukan.`;
        break;
      }
    }

    // 02.) Save EBupot2126ImporData
    const insertedEBupot2126ImporData = await EBupot2126ImporData.create(
      {
        userEBupot2126ImporDataId: req.body.userId,
        tipe: "Bulanan",
        nomorTiket,
        namaFile: req.body.fileName,
        tanggalUpload,
        jumlahBaris: 0,
        status,
        keteranganUpload,
        masaPajak,
        tahunPajak,
        jumlahBuktiPotongPph21: jumlahBuktiPotongPph21,
        jumlahBuktiPotongPph26: jumlahBuktiPotongPph26,
        userIdInput: req.body.userId,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );

    if (status === "Gagal Validasi") {
      const insertedEBupot2126DetilValidasi =
        await EBupot2126DetilValidasi.create(
          {
            userEBupot2126DetilValidasiId: req.body.userId,
            userEBupot2126ImporDataId: insertedEBupot2126ImporData.id,
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
    // 03.) Handle data for "21"
    await processData21(data21, masaPajak, tahunPajak, req, transaction);

    console.log("In 2");
    // 04.) Handle data for "26"
    await processData26(data26, masaPajak, tahunPajak, req, transaction);
    console.log("In 3");

    // Commit transaction and respond with success
    await transaction.commit();
    res.status(201).json("Saved");
  } catch (error) {
    if (transaction) await transaction.rollback();
    res.status(400).json({ message: error.message });
  }
};

const processData21Tahunan = async (
  data21Tahunan,
  tahunPajak,
  req,
  transaction
) => {
  let masaPajak = "11";
  for (let i = 1; i < data21Tahunan.length; i++) {
    const record = data21Tahunan[i];
    // let {
    //   __EMPTY: no,
    //   __EMPTY_1: tanggalBuktiSetor,
    //   __EMPTY_2: identitas,
    //   __EMPTY_3: npwpNitku,
    //   __EMPTY_4: nik,
    //   __EMPTY_5: nama,
    //   __EMPTY_6: alamat,
    //   __EMPTY_7: kodeObjekPajak,
    //   __EMPTY_8: jenisIdentitas,
    //   __EMPTY_9: nomorIdentitasNpwp,
    //   __EMPTY_10: nomorIdentitasNik,
    //   __EMPTY_11: namaPtkp,
    //   __EMPTY_12: pegawaiHarian,
    //   __EMPTY_13: skemaPenghitungan,
    //   __EMPTY_14: jumlahPenghasilan,
    //   __EMPTY_15: isAkumulasiPenghasilanBrutoValid,
    //   __EMPTY_16: akumulasiPenghasilanBruto,
    //   __EMPTY_17: isFasilitasValid,
    //   __EMPTY_18: bupot2126FasilitasDtpIkn,
    // } = record;
    let {
      __EMPTY: no,
      __EMPTY_1: tanggalBuktiSetor,
      __EMPTY_2: identitas,
      __EMPTY_3: npwpNitku,
      __EMPTY_4: nik,
      __EMPTY_5: nama,
      __EMPTY_6: alamat,
      __EMPTY_7: jenisKelamin,
      __EMPTY_32: jumlahTanggunganKeluargaPtkp,
      __EMPTY_10: namaJabatan,
      __EMPTY_11: isStatusKaryawanAsing,
      __EMPTY_12: namaNegara,
      __EMPTY_13: kodeObjekPajak,
      __EMPTY_14: bulanPajakAwal,
      __EMPTY_15: bulanPajakAkhir,
      __EMPTY_16: jenisIdentitas,
      __EMPTY_17: nomorIdentitasNpwp,
      __EMPTY_18: nomorIdentitasNik,
      __EMPTY_19: jumlahPenghasilan,
      __EMPTY_20: gajiAtauUangPensiunanBerkala,
      __EMPTY_21: tunjanganPph,
      __EMPTY_22: tunjanganLainnya,
      __EMPTY_23: honorarium,
      __EMPTY_24: premiAsuransi,
      __EMPTY_25: penerimaanNatura,
      __EMPTY_26: tantiemBonusGratifikasiJasaProduksiThr,
      __EMPTY_27: biayaJabatan,
      __EMPTY_28: iuranPensiun,
      __EMPTY_29: zakatKeagamaan,
      __EMPTY_30: penghasilanNetoMasaPajakSebelumnya,
      __EMPTY_31: jumlahPenghasilanNetoPilihan,
      __EMPTY_33: pph21TelahDipotongMasaPajakSebelumnya,
      __EMPTY_34: pph21DtpTelahDipotongMasaPajakSebelumnya,
      __EMPTY_35: pph21Dipotong,
      __EMPTY_36: pph21Dtp,
      __EMPTY_37: isFasilitasValid,
      __EMPTY_38: nomorSuketDtpIkn,
    } = record;

    // Format Input
    if (!nik) {
      nik = "";
    }
    if (jenisKelamin == "L") {
      jenisKelamin = "Laki - laki";
    } else {
      jenisKelamin = "Perempuan";
    }
    jumlahTanggunganKeluargaPtkp = `(${jumlahTanggunganKeluargaPtkp})`;
    namaPtkp = jumlahTanggunganKeluargaPtkp;
    namaJabatan = namaJabatan.toUpperCase();
    if (isStatusKaryawanAsing.toUpperCase() == "YA") {
      isStatusKaryawanAsing = true;
    } else {
      isStatusKaryawanAsing = false;
    }
    if (!jumlahPenghasilan) {
      jumlahPenghasilan = 0;
    } else {
      jumlahPenghasilan = parseInt(jumlahPenghasilan);
    }
    if (!gajiAtauUangPensiunanBerkala) {
      gajiAtauUangPensiunanBerkala = 0;
    } else {
      gajiAtauUangPensiunanBerkala = parseInt(gajiAtauUangPensiunanBerkala);
    }
    if (!tunjanganPph) {
      tunjanganPph = 0;
    } else {
      tunjanganPph = parseInt(tunjanganPph);
    }
    if (!tunjanganLainnya) {
      tunjanganLainnya = 0;
    } else {
      tunjanganLainnya = parseInt(tunjanganLainnya);
    }
    if (!honorarium) {
      honorarium = 0;
    } else {
      honorarium = parseInt(honorarium);
    }
    if (!premiAsuransi) {
      premiAsuransi = 0;
    } else {
      premiAsuransi = parseInt(premiAsuransi);
    }
    if (!penerimaanNatura) {
      penerimaanNatura = 0;
    } else {
      penerimaanNatura = parseInt(penerimaanNatura);
    }
    if (!tantiemBonusGratifikasiJasaProduksiThr) {
      tantiemBonusGratifikasiJasaProduksiThr = 0;
    } else {
      tantiemBonusGratifikasiJasaProduksiThr = parseInt(
        tantiemBonusGratifikasiJasaProduksiThr
      );
    }
    let jumlahPenghasilanBruto1sd7 =
      gajiAtauUangPensiunanBerkala +
      tunjanganPph +
      tunjanganLainnya +
      honorarium +
      premiAsuransi +
      penerimaanNatura +
      tantiemBonusGratifikasiJasaProduksiThr;
    if (!biayaJabatan) {
      biayaJabatan = 0;
    } else {
      biayaJabatan = parseInt(biayaJabatan);
    }
    if (!iuranPensiun) {
      iuranPensiun = 0;
    } else {
      iuranPensiun = parseInt(iuranPensiun);
    }
    if (!zakatKeagamaan) {
      zakatKeagamaan = 0;
    } else {
      zakatKeagamaan = parseInt(zakatKeagamaan);
    }
    let jumlahPengurangan9sd11 = biayaJabatan + iuranPensiun + zakatKeagamaan;
    let jumlahPenghasilanNeto8sd12 =
      jumlahPenghasilanBruto1sd7 - jumlahPengurangan9sd11;
    if (!penghasilanNetoMasaPajakSebelumnya) {
      penghasilanNetoMasaPajakSebelumnya = 0;
    } else {
      penghasilanNetoMasaPajakSebelumnya = parseInt(
        penghasilanNetoMasaPajakSebelumnya
      );
    }
    let jumlahPenghasilanNetoSetahunAtauDisetahunkan =
      jumlahPenghasilanNeto8sd12 - penghasilanNetoMasaPajakSebelumnya;
    if (!pph21TelahDipotongMasaPajakSebelumnya) {
      pph21TelahDipotongMasaPajakSebelumnya = 0;
    } else {
      pph21TelahDipotongMasaPajakSebelumnya = parseInt(
        pph21TelahDipotongMasaPajakSebelumnya
      );
    }
    if (!pph21DtpTelahDipotongMasaPajakSebelumnya) {
      pph21DtpTelahDipotongMasaPajakSebelumnya = 0;
    } else {
      pph21DtpTelahDipotongMasaPajakSebelumnya = parseInt(
        pph21DtpTelahDipotongMasaPajakSebelumnya
      );
    }
    if (!pph21Dipotong) {
      pph21Dipotong = 0;
    } else {
      pph21Dipotong = parseInt(pph21Dipotong);
    }

    let pph21DipotongJanuari = "0";
    let pph21DipotongFebruari = "0";
    let pph21DipotongMaret = "0";
    let pph21DipotongApril = "0";
    let pph21DipotongMei = "0";
    let pph21DipotongJuni = "0";
    let pph21DipotongJuli = "0";
    let pph21DipotongAgustus = "0";
    let pph21DipotongSeptember = "0";
    let pph21DipotongOktober = "0";
    let pph21DipotongNovember = "0";
    let pph21DipotongDesember = "0";

    let totalPph21Dipotong = 0;
    for (let i = parseInt(bulanPajakAwal); i <= 12; i++) {
      let tempWhere = {
        userEBupot2126Pph21Id: req.body.userId,
        npwpNitku: npwpNitku,
        nik: nik,
        [Op.and]: [
          {
            bulanPajak: String(i).padStart(2, "0"),
          },
          {
            tahunPajak: tahunPajak,
          },
        ],
        [Op.or]: [
          {
            "$objekpajak.kodeObjekPajak$": "21-100-01",
          },
          {
            "$objekpajak.kodeObjekPajak$": "21-100-02",
          },
        ],
      };
      let tempInclude = [
        { model: User },
        { model: EBupot2126Penandatangan },
        { model: ObjekPajak, as: "objekpajak" },
        { model: Cabang },
      ];

      const eBupot2126Pph21s = await EBupot2126Pph21.findAll({
        where: tempWhere,
        include: tempInclude,
      });

      let totalPPhYangDipotongDipungut = 0;
      for (let data of eBupot2126Pph21s) {
        totalPPhYangDipotongDipungut += data.pPhYangDipotongDipungut;
        totalPph21Dipotong += data.pPhYangDipotongDipungut;
      }

      if (i == 1) {
        pph21DipotongJanuari = totalPPhYangDipotongDipungut;
      } else if (i == 2) {
        pph21DipotongFebruari = totalPPhYangDipotongDipungut;
      } else if (i == 3) {
        pph21DipotongMaret = totalPPhYangDipotongDipungut;
      } else if (i == 4) {
        pph21DipotongApril = totalPPhYangDipotongDipungut;
      } else if (i == 5) {
        pph21DipotongMei = totalPPhYangDipotongDipungut;
      } else if (i == 6) {
        pph21DipotongJuni = totalPPhYangDipotongDipungut;
      } else if (i == 7) {
        pph21DipotongJuli = totalPPhYangDipotongDipungut;
      } else if (i == 8) {
        pph21DipotongAgustus = totalPPhYangDipotongDipungut;
      } else if (i == 9) {
        pph21DipotongSeptember = totalPPhYangDipotongDipungut;
      } else if (i == 10) {
        pph21DipotongOktober = totalPPhYangDipotongDipungut;
      } else if (i == 11) {
        pph21DipotongNovember = totalPPhYangDipotongDipungut;
      } else if (i == 12) {
        pph21DipotongDesember = "0";
      }
    }
    pph21Dipotong = totalPph21Dipotong;

    if (!pph21Dtp) {
      pph21Dtp = 0;
    } else {
      pph21Dtp = parseInt(pph21Dtp);
    }

    let pph21DtpJanuari = "0";
    let pph21DtpFebruari = "0";
    let pph21DtpMaret = "0";
    let pph21DtpApril = "0";
    let pph21DtpMei = "0";
    let pph21DtpJuni = "0";
    let pph21DtpJuli = "0";
    let pph21DtpAgustus = "0";
    let pph21DtpSeptember = "0";
    let pph21DtpOktober = "0";
    let pph21DtpNovember = "0";
    let pph21DtpDesember = "0";

    let totalPph21Dtp = 0;
    for (let i = parseInt(bulanPajakAwal); i <= 12; i++) {
      let totalPPhYangDtp = 0;

      if (i == 1) {
        pph21DtpJanuari = totalPPhYangDtp;
      } else if (i == 2) {
        pph21DtpFebruari = totalPPhYangDtp;
      } else if (i == 3) {
        pph21DtpMaret = totalPPhYangDtp;
      } else if (i == 4) {
        pph21DtpApril = totalPPhYangDtp;
      } else if (i == 5) {
        pph21DtpMei = totalPPhYangDtp;
      } else if (i == 6) {
        pph21DtpJuni = totalPPhYangDtp;
      } else if (i == 7) {
        pph21DtpJuli = totalPPhYangDtp;
      } else if (i == 8) {
        pph21DtpAgustus = totalPPhYangDtp;
      } else if (i == 9) {
        pph21DtpSeptember = totalPPhYangDtp;
      } else if (i == 10) {
        pph21DtpOktober = totalPPhYangDtp;
      } else if (i == 11) {
        pph21DtpNovember = totalPPhYangDtp;
      } else if (i == 12) {
        pph21DtpDesember = "0";
      }
    }
    pph21Dtp = totalPph21Dtp;

    isFasilitasValid = true;
    if ((isFasilitasValid = "N")) {
      isFasilitasValid = false;
    }

    tanggalBuktiSetor = new Date(formatTextToDate(tanggalBuktiSetor));
    if (identitas.trim().toUpperCase() === "NPWP") identitas = "NPWP/NITKU";

    const maxNomorBuktiSetor = await getNextNomorBuktiSetor(
      EBupot2126Pph21Tahunan,
      req.body.userIdInput,
      transaction
    );
    const nextNomorBuktiSetor = findNextKode(parseInt(maxNomorBuktiSetor), 10);

    const findJumlahTanggunganKeluargaPtkp = await Ptkp.findOne({
      where: { namaPtkp: namaPtkp },
    });

    let negaraId = null;
    if (namaNegara) {
      let findNegara = await Negara.findOne({
        where: {
          namaNegara: namaNegara,
        },
      });
      negaraId = findNegara.id;
    }

    const findObjekPajak = await ObjekPajak.findOne({
      where: { kodeObjekPajak, untukBupot2126: "PPh 21" },
    });
    // console.log(findObjekPajak);
    // console.log(findJumlahTanggunganKeluargaPtkp);

    const findPtkp = await Ptkp.findOne({
      where: { namaPtkp: namaPtkp },
    });
    let pkpSetahunAtauDisetahunkan15sd16 =
      jumlahPenghasilanNetoSetahunAtauDisetahunkan - findPtkp.jumlahPtkp;

    let nomorIdentitas = undefined;
    if (nomorIdentitasNpwp) {
      nomorIdentitas = nomorIdentitasNpwp;
    } else if (nomorIdentitasNik) {
      nomorIdentitas = nomorIdentitasNik;
    }
    const findPenandatangan = await EBupot2126Penandatangan.findOne({
      where: {
        userEBupot2126PenandatanganId: req.body.userId,
        nomorIdentitas,
      },
    });

    // Cari Masa Pajak
    let tempBulanPajak = masaPajak;
    let tempMasaPajak = getMonthName(masaPajak);

    let tempPkp = {
      [Op.and]: [
        {
          jumlahPenghasilanMin: {
            [Op.lte]: jumlahPenghasilan,
          },
        },
        {
          jumlahPenghasilanMax: {
            [Op.gte]: jumlahPenghasilan,
          },
        },
      ],
    };

    const pkp = await Pkp.findOne({
      where: tempPkp,
      include: [{ model: Cabang }],
    });

    let finalPph21PkpSetahunAtauDisetahunkan =
      (parseInt(pkpSetahunAtauDisetahunkan15sd16) * parseInt(pkp.tarifPersen)) /
      100;

    let pph21Terutang18sd20 =
      finalPph21PkpSetahunAtauDisetahunkan -
      pph21TelahDipotongMasaPajakSebelumnya -
      pph21DtpTelahDipotongMasaPajakSebelumnya;

    let totalPph21KurangLebihBayarMasaPajakTerakhir =
      parseInt(pph21Terutang18sd20) -
      parseInt(pph21Dipotong) -
      parseInt(totalPph21Dtp);

    const inputData = prepareInputData({
      nomorBuktiSetor: nextNomorBuktiSetor,
      tanggalBuktiSetor,
      userEBupot2126Pph21TahunanId: req.body.userId,
      tahunPajak,
      bulanPajak: tempBulanPajak.toString().padStart(2, "0"),
      masaPajak: tempMasaPajak,
      identitas,
      npwpNitku,
      nik,
      nama: nama.toUpperCase(),
      alamat: alamat.toUpperCase(),
      jenisKelamin,
      jumlahTanggunganKeluargaPtkpId: findJumlahTanggunganKeluargaPtkp.id,
      namaJabatan,
      isStatusKaryawanAsing,
      negaraId,
      objekPajakId: findObjekPajak.id,
      bulanPajakAwal: bulanPajakAwal.toString().padStart(2, "0"),
      bulanPajakAkhir: bulanPajakAkhir.toString().padStart(2, "0"),
      isFasilitasValid,
      nomorSuketDtpIkn,
      jumlahPenghasilan,
      gajiAtauUangPensiunanBerkala,
      tunjanganPph,
      tunjanganLainnya,
      honorarium,
      premiAsuransi,
      penerimaanNatura,
      tantiemBonusGratifikasiJasaProduksiThr,
      jumlahPenghasilanBruto1sd7,
      biayaJabatan,
      iuranPensiun,
      zakatKeagamaan,
      jumlahPengurangan9sd11,
      jumlahPenghasilanNeto8sd12,
      penghasilanNetoMasaPajakSebelumnya,
      jumlahPenghasilanNetoPilihan,
      jumlahPenghasilanNetoSetahunAtauDisetahunkan,
      ptkpId: findPtkp.id,
      jumlahPtkp: findPtkp.jumlahPtkp,
      pkpSetahunAtauDisetahunkan15sd16,
      pph21PkpSetahunAtauDisetahunkan: finalPph21PkpSetahunAtauDisetahunkan,
      pph21TelahDipotongMasaPajakSebelumnya,
      pph21DtpTelahDipotongMasaPajakSebelumnya,
      pph21Terutang18sd20,
      pph21Dipotong,
      pph21DipotongJanuari,
      pph21DipotongFebruari,
      pph21DipotongMaret,
      pph21DipotongApril,
      pph21DipotongMei,
      pph21DipotongJuni,
      pph21DipotongJuli,
      pph21DipotongAgustus,
      pph21DipotongSeptember,
      pph21DipotongOktober,
      pph21DipotongNovember,
      pph21DipotongDesember,
      pph21Dtp,
      pph21DtpJanuari,
      pph21DtpFebruari,
      pph21DtpMaret,
      pph21DtpApril,
      pph21DtpMei,
      pph21DtpJuni,
      pph21DtpJuli,
      pph21DtpAgustus,
      pph21DtpSeptember,
      pph21DtpOktober,
      pph21DtpNovember,
      pph21DtpDesember,
      pph21KurangLebihBayarMasaPajakTerakhir:
        totalPph21KurangLebihBayarMasaPajakTerakhir,
      pph21KurangLebihBayarMasaPajakTerakhirDipotong:
        totalPph21KurangLebihBayarMasaPajakTerakhir,
      pph21KurangLebihBayarMasaPajakTerakhirDtp: 0,
      eBupot2126PenandatanganId: findPenandatangan.id,
      userIdInput: req.body.userId,
      cabangId: req.body.kodeCabang,
    });
    // console.log(inputData);

    const insertedEBupot2126Pph21Tahunan = await EBupot2126Pph21Tahunan.create(
      inputData,
      {
        transaction,
      }
    );
  }
};

const saveEBupot2126TahunanImporData = async (req, res) => {
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

    const { Rekap: dataRekap, A1: data21Tahunan } = req.body.jsonData;
    // console.log(dataRekap);

    if (dataRekap.length !== 2) {
      status = "Gagal Validasi";
      keteranganUpload = "Format Excel tidak sesuai.";
      // Save EBupot2126ImporData
      const insertedEBupot2126ImporData = await EBupot2126ImporData.create(
        {
          userEBupot2126ImporDataId: req.body.userId,
          tipe: "Tahunan",
          nomorTiket,
          namaFile: req.body.fileName,
          tanggalUpload,
          jumlahBaris: 0,
          status,
          keteranganUpload,
          masaPajak: "12",
          tahunPajak: req.body.tahunPajak,
          jumlahBuktiPotongA1: 0,
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
    const tahunPajak = dataRekap[0]["__EMPTY_6"];
    const jumlahBuktiPotongA1 = dataRekap[1]["__EMPTY_6"];

    // 01.) Handle Input
    let ifTahunPajakKosong = dataRekap[0]["__EMPTY_6"] === undefined;
    let ifTahunPajakSalah = req.body.tahunPajak != tahunPajak;

    if (ifTahunPajakKosong) {
      status = "Gagal Validasi";
      keteranganUpload = "Masa/Tahun Pajak pada excel tidak sesuai.";
      // Save EBupot2126ImporData
      const insertedEBupot2126ImporData = await EBupot2126ImporData.create(
        {
          userEBupot2126ImporDataId: req.body.userId,
          tipe: "Tahunan",
          nomorTiket,
          namaFile: req.body.fileName,
          tanggalUpload,
          jumlahBaris: 0,
          status,
          keteranganUpload,
          masaPajak: "12",
          tahunPajak: req.body.tahunPajak,
          jumlahBuktiPotongA1: jumlahBuktiPotongA1,
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
    if (ifTahunPajakSalah) {
      status = "Gagal Validasi";
      keteranganUpload = "Masa/Tahun Pajak pada excel tidak sesuai.";
    }
    for (let i = 1; i < data21Tahunan.length; i++) {
      const record = data21Tahunan[i];
      let {
        __EMPTY: no,
        __EMPTY_1: tanggalBuktiSetor,
        __EMPTY_2: identitas,
        __EMPTY_3: npwpNitku,
        __EMPTY_4: nik,
        __EMPTY_5: nama,
        __EMPTY_6: alamat,
        __EMPTY_7: jenisKelamin,
        __EMPTY_32: jumlahTanggunganKeluargaPtkp,
        __EMPTY_10: namaJabatan,
        __EMPTY_11: isStatusKaryawanAsing,
        __EMPTY_12: namaNegara,
        __EMPTY_13: kodeObjekPajak,
        __EMPTY_14: bulanPajakAwal,
        __EMPTY_15: bulanPajakAkhir,
        __EMPTY_16: jenisIdentitas,
        __EMPTY_17: nomorIdentitasNpwp,
        __EMPTY_18: nomorIdentitasNik,
        __EMPTY_19: jumlahPenghasilan,
        __EMPTY_20: gajiAtauUangPensiunanBerkala,
        __EMPTY_21: tunjanganPph,
        __EMPTY_22: tunjanganLainnya,
        __EMPTY_23: honorarium,
        __EMPTY_24: premiAsuransi,
        __EMPTY_25: penerimaanNatura,
        __EMPTY_26: tantiemBonusGratifikasiJasaProduksiThr,
        __EMPTY_27: biayaJabatan,
        __EMPTY_28: iuranPensiun,
        __EMPTY_29: zakatKeagamaan,
        __EMPTY_30: penghasilanNetoMasaPajakSebelumnya,
        __EMPTY_31: jumlahPenghasilanNetoPilihan,
        __EMPTY_32: namaPtkp,
        __EMPTY_33: pph21TelahDipotongMasaPajakSebelumnya,
        __EMPTY_34: pph21DtpTelahDipotongMasaPajakSebelumnya,
        __EMPTY_35: pph21Dipotong,
        __EMPTY_36: pph21Dtp,
        __EMPTY_38: nomorSuketDtpIkn,
      } = record;
      const findObjekPajak = await ObjekPajak.findOne({
        where: { kodeObjekPajak, untukBupot2126: "PPh 21" },
      });

      let nomorIdentitas = undefined;
      if (nomorIdentitasNpwp) {
        nomorIdentitas = nomorIdentitasNpwp;
      } else if (nomorIdentitasNik) {
        nomorIdentitas = nomorIdentitasNik;
      } else {
        nomorIdentitas = "";
      }
      const findPenandatangan = await EBupot2126Penandatangan.findOne({
        where: {
          userEBupot2126PenandatanganId: req.body.userId,
          nomorIdentitas,
        },
      });

      if (no == undefined) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data No di baris ke ${i} kosong.`;
        break;
      } else if (tanggalBuktiSetor == undefined) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Tgl Pemotongan di baris ke ${i} kosong.`;
        break;
      } else if (isNotDateFormat(tanggalBuktiSetor)) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Tgl Pemotongan di baris ke ${i} salah format tanggal.`;
        break;
      } else if (identitas == undefined) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Penerima Penghasilan di baris ke ${i} kosong.`;
        break;
      } else if (nama == undefined) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Nama Penerima Penghasilan Sesuai NIK di baris ke ${i} kosong.`;
        break;
      } else if (alamat == undefined) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Alamat Penerima Penghasilan Sesuai NIK di baris ke ${i} kosong.`;
        break;
      } else if (jenisKelamin == undefined) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Jenis Kelamin Penerima Penghasilan Sesuai NIK di baris ke ${i} kosong.`;
        break;
      } else if (namaJabatan == undefined) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Nama Jabatan Penerima Penghasilan Sesuai NIK di baris ke ${i} kosong.`;
        break;
      } else if (kodeObjekPajak == undefined) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Kode Objek Pajak di baris ke ${i} kosong.`;
        break;
      } else if (!findObjekPajak) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Kode Objek Pajak di baris ke ${i} tidak ditemukan / tidak sesuai dengan Kode Objek Pajak untuk PPh Pasal 21.`;
        break;
      } else if (bulanPajakAwal == undefined) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Masa Penghasilan Awal di baris ke ${i} kosong.`;
        break;
      } else if (bulanPajakAkhir == undefined) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Masa Penghasilan Awal di baris ke ${i} kosong.`;
        break;
      } else if (nomorIdentitas == undefined) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data NPWP dan NIK EBupot2126Penandatangan di baris ke ${i} kosong.`;
        break;
      } else if (!findPenandatangan) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data EBupot2126Penandatangan di baris ke ${i} tidak ditemukan.`;
        break;
      } else if (jumlahPenghasilan == undefined) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Penghasilan di baris ke ${i} kosong.`;
        break;
      } else if (isNaN(jumlahPenghasilan)) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Penghasilan di baris ke ${i} format angka salah.`;
        break;
      } else if (namaPtkp == undefined) {
        pasal = "PPh Pasal 21 Tahunan";
        barisExcel = `${i}`;
        status = "Gagal Validasi";
        keteranganUpload = `Data Kode PTKP di baris ke ${i} kosong.`;
        break;
      }
    }

    // 02.) Save EBupot2126ImporData
    const insertedEBupot2126ImporData = await EBupot2126ImporData.create(
      {
        userEBupot2126ImporDataId: req.body.userId,
        tipe: "Tahunan",
        nomorTiket,
        namaFile: req.body.fileName,
        tanggalUpload,
        jumlahBaris: 0,
        status,
        keteranganUpload,
        masaPajak: "12",
        tahunPajak,
        jumlahBuktiPotongA1: jumlahBuktiPotongA1,
        userIdInput: req.body.userId,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );

    if (status === "Gagal Validasi") {
      const insertedEBupot2126DetilValidasi =
        await EBupot2126DetilValidasi.create(
          {
            userEBupot2126DetilValidasiId: req.body.userId,
            userEBupot2126ImporDataId: insertedEBupot2126ImporData.id,
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
    // 03.) Handle data for "21"
    await processData21Tahunan(data21Tahunan, tahunPajak, req, transaction);

    console.log("In 2");

    // Commit transaction and respond with success
    await transaction.commit();
    res.status(201).json("Saved");
  } catch (error) {
    if (transaction) await transaction.rollback();
    res.status(400).json({ message: error.message });
  }
};

const updateEBupot2126ImporData = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let updatedEBupot2126ImporData = await EBupot2126ImporData.update(
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
    res.status(201).json(updatedEBupot2126ImporData);
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteEBupot2126ImporData = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupot2126ImporData.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json({ message: "E-Bupot 2126 Impor Data Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEBupot2126ImporDatas,
  getEBupot2126ImporDatasPagination,
  getEBupot2126ImporDatasByUserPagination,
  getEBupot2126ImporDatasByUserSearchPagination,
  getEBupot2126ImporDatasBulananByUserSearchPagination,
  getEBupot2126ImporDatasTahunanByUserSearchPagination,
  getEBupot2126ImporDataById,
  saveEBupot2126BulananImporData,
  saveEBupot2126TahunanImporData,
  updateEBupot2126ImporData,
  deleteEBupot2126ImporData,
};
