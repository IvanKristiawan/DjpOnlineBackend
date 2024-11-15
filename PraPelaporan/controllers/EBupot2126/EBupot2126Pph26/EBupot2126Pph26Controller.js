const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupot2126Pph26 = require("../../../models/EBupot2126/EBupot2126Pph26/EBupot2126Pph26Model.js");
const User = require("../../../../User/models/UserModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const JenisSetoran = require("../../../../Master/models/JenisSetoran/JenisSetoranModel.js");
const JenisPajak = require("../../../../Master/models/JenisPajak/JenisPajakModel.js");
const JenisObjekPajak = require("../../../../Master/models/JenisObjekPajak/JenisObjekPajakModel.js");
const Ptkp = require("../../../../Master/models/Ptkp/PtkpModel.js");
const Negara = require("../../../../Master/models/Negara/NegaraModel.js");
const EBupot2126Penandatangan = require("../../../models/EBupot2126/Penandatangan/EBupot2126PenandatanganModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
const { findNextKode, formatDate } = require("../../../../helper/helper");

const getEBupot2126Pph26s = async (req, res) => {
  try {
    const eBupot2126Pph26s = await EBupot2126Pph26.findAll({
      include: [
        { model: User },
        { model: ObjekPajak },
        { model: Negara },
        { model: EBupot2126Penandatangan },
        { model: Cabang },
      ],
    });
    res.status(200).json(eBupot2126Pph26s);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupot2126Pph26sByUserForExcel = async (req, res) => {
  try {
    const eBupot2126Pph26s = await EBupot2126Pph26.findAll({
      where: {
        userEBupot2126Pph26Id: req.body.userEBupot2126Pph26Id,
      },
      include: [
        { model: User },
        { model: EBupot2126Penandatangan },
        {
          model: ObjekPajak,
          include: [{ model: JenisSetoran, include: [{ model: JenisPajak }] }],
        },
        { model: Negara },
        { model: Cabang },
      ],
    });

    let filteredEBupot2126Pph26s = [];

    for (let eBupot2126Pph26 of eBupot2126Pph26s) {
      let objectData = {
        NO_BUKTI_POTONG: eBupot2126Pph26.nomorBuktiSetor,
        TANGGAL_BUKTI_POTONG: formatDate(eBupot2126Pph26.tanggalBuktiSetor),
        NPWP_PEMOTONG: eBupot2126Pph26.user.npwp15,
        NAMA_PEMOTONG: eBupot2126Pph26.user.nama,
        PEREKAM: eBupot2126Pph26.user.npwp15,
        IDENTITAS_PENERIMA_PENGHASILAN:
          eBupot2126Pph26.identitas === "NPWP/NITKU"
            ? eBupot2126Pph26.npwpNitku
            : eBupot2126Pph26.nik,
        NAMA_PENERIMA_PENGHASILAN: eBupot2126Pph26.nama,
        PENGHASILAN_BRUTO: eBupot2126Pph26.jumlahPenghasilanBruto,
        PPH_DIPOTONG: eBupot2126Pph26.pPhYangDipotongDipungut,
        KODE_OBJEK_PAJAK: eBupot2126Pph26.objekpajak.kodeObjekPajak,

        PASAL:
          eBupot2126Pph26.objekpajak.jenissetoran.jenispajak.namaJenisPajak,

        MASA_PAJAK: eBupot2126Pph26.bulanPajak,
        TAHUN_PAJAK: eBupot2126Pph26.tahunPajak,
        STATUS: eBupot2126Pph26.isHapus ? "Dihapus" : "Normal",
        REV_NO: 0,
        POSTING: eBupot2126Pph26.isPost ? "Sudah" : "Belum",
      };
      filteredEBupot2126Pph26s.push(objectData);
    }

    res.status(200).json(filteredEBupot2126Pph26s);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupot2126Pph26sPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        tinPasporKitasKitap: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: User },
    { model: EBupot2126Penandatangan },
    { model: ObjekPajak },
    { model: Negara },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126Pph26.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126Pph26s = await EBupot2126Pph26.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126Pph26s,
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

const getEBupot2126Pph26sByUserPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    userIdInput: req.body.userIdInput,
    [Op.or]: [
      {
        tinPasporKitasKitap: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: User },
    { model: EBupot2126Penandatangan },
    { model: ObjekPajak },
    { model: Negara },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126Pph26.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126Pph26s = await EBupot2126Pph26.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126Pph26s,
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

const getEBupot2126Pph26sByUserSearchPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupot2126Pph26Id: req.body.userEBupot2126Pph26Id,
  };
  let tempInclude = [
    { model: User },
    { model: EBupot2126Penandatangan },
    { model: ObjekPajak },
    { model: Negara },
    { model: Cabang },
  ];

  if (req.body.pencairanBerdasarkan === "Periode") {
    let [bulan, tahun] = req.body.masaTahunPajakSearch.split("-");
    tempWhere = {
      [Op.and]: [
        tempWhere,
        {
          bulanPajak: bulan,
        },
        {
          tahunPajak: tahun,
        },
      ],
    };
  } else if (req.body.pencairanBerdasarkan === "Nomor Bukti Setor") {
    tempWhere["nomorBuktiSetor"] = req.body.nomorBuktiSetor;
  } else if (req.body.pencairanBerdasarkan === "Identitas") {
    tempWhere = {
      userEBupot2126Pph26Id: req.body.userEBupot2126Pph26Id,
      tinPasporKitasKitap: req.body.identitas,
    };
  }

  const totalRows = await EBupot2126Pph26.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126Pph26s = await EBupot2126Pph26.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126Pph26s,
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

const getEBupot2126Pph26ById = async (req, res) => {
  try {
    let eBupot2126Pph26 = await EBupot2126Pph26.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: User },
        { model: EBupot2126Penandatangan },
        { model: ObjekPajak },
        { model: Negara },
        { model: Cabang },
      ],
    });

    res.status(200).json(eBupot2126Pph26);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveEBupot2126Pph26 = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    console.log("In 1");
    // 01.) Find Next EBupot Unifikasi Pph42152223
    let maxNomorBuktiSetor = await EBupot2126Pph26.max("nomorBuktiSetor", {
      where: {
        userIdInput: req.body.userIdInput, // Apply the where clause to filter by userIdInput
      },
    });

    if (maxNomorBuktiSetor === null) {
      maxNomorBuktiSetor = "0000000000";
    }

    let nextNomorBuktiSetor = findNextKode(parseInt(maxNomorBuktiSetor), 10);

    console.log("In 2");
    // 02.) Find Tanggal Bukti Setor
    let tanggalBuktiSetor = new Date();

    console.log("In 3");
    // 03.) Find Negara
    let negaraId = null;
    if (req.body.namaNegara) {
      let findNegara = await Negara.findOne({
        where: {
          namaNegara: req.body.namaNegara,
        },
      });
      negaraId = findNegara.id;
    }

    console.log("In 4");
    // 04.) Find Objek Pajak
    let findObjekPajak = await ObjekPajak.findOne({
      where: {
        kodeObjekPajak: req.body.kodeObjekPajak,
      },
    });

    console.log("In 5");
    // 05.) Find EBupot2126Penandatangan
    let findEBupot2126Penandatangan = await EBupot2126Penandatangan.findOne({
      where: {
        userEBupot2126PenandatanganId: req.body.userId,
        namaIdentitas: req.body.namaIdentitas,
      },
    });

    console.log("In 6");
    // 06.) Cari Bulan
    let bulanPajak = getMonthIndex(req.body.masaPajak);

    console.log("In 7");
    const insertedEBupot2126Pph26 = await EBupot2126Pph26.create(
      {
        ...req.body,
        userEBupot2126Pph26Id: req.body.userId,
        nomorBuktiSetor: nextNomorBuktiSetor,
        tanggalBuktiSetor,
        negaraId,
        objekPajakId: findObjekPajak.id,
        eBupot2126PenandatanganId: findEBupot2126Penandatangan.id,
        bulanPajak,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    console.log("In 8");

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedEBupot2126Pph26);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateEBupot2126Pph26 = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    console.log("In 1");
    // 04.) Find EBupot2126Penandatangan
    let findEBupot2126Penandatangan = await EBupot2126Penandatangan.findOne({
      where: {
        userEBupot2126PenandatanganId: req.body.userId,
        namaIdentitas: req.body.namaIdentitas,
      },
    });

    console.log("In 2");
    let updatedEBupot2126Pph26 = await EBupot2126Pph26.update(
      {
        ...req.body,
        eBupot2126PenandatanganId: findEBupot2126Penandatangan.id,
        cabangId: req.body.kodeCabang,
      },
      {
        where: {
          id: req.params.id,
        },
        transaction,
      }
    );
    console.log("In 3");

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(updatedEBupot2126Pph26);
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const statusDeleteEBupot2126Pph26 = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupot2126Pph26.update(
      {
        isHapus: true,
      },
      {
        where: {
          id: req.params.id,
        },
        transaction,
      }
    ).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await transaction.commit();
        res.status(200).json({ message: "E-Bupot 2126 Pph 26 Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `E-Bupot 2126 Pph 26 ${req.params.id} not found!`,
        });
      }
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteEBupot2126Pph26 = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupot2126Pph26.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json({ message: "E-Bupot 2126 Pph 26 Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEBupot2126Pph26s,
  getEBupot2126Pph26sByUserForExcel,
  getEBupot2126Pph26sPagination,
  getEBupot2126Pph26sByUserPagination,
  getEBupot2126Pph26sByUserSearchPagination,
  getEBupot2126Pph26ById,
  saveEBupot2126Pph26,
  updateEBupot2126Pph26,
  statusDeleteEBupot2126Pph26,
  deleteEBupot2126Pph26,
};
