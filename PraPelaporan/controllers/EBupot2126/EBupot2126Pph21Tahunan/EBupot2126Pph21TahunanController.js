const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupot2126Pph21Tahunan = require("../../../models/EBupot2126/EBupot2126Pph21Tahunan/EBupot2126Pph21TahunanModel.js");
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

const getEBupot2126Pph21Tahunans = async (req, res) => {
  try {
    const eBupot2126Pph21Tahunans = await EBupot2126Pph21Tahunan.findAll({
      include: [
        { model: User },
        { model: ObjekPajak },
        {
          model: Ptkp,
          as: "TanggunganPtkp", // Alias for `jumlahTanggunganKeluargaPtkpId`
        },
        {
          model: Ptkp,
          as: "Ptkp", // Alias for `ptkpId`
        },
        { model: Negara },
        { model: EBupot2126Penandatangan },
        { model: Cabang },
      ],
    });
    res.status(200).json(eBupot2126Pph21Tahunans);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupot2126Pph21TahunansByUserForExcel = async (req, res) => {
  try {
    const eBupot2126Pph21Tahunans = await EBupot2126Pph21Tahunan.findAll({
      where: {
        userEBupot2126Pph21TahunanId: req.body.userEBupot2126Pph21TahunanId,
      },
      include: [
        { model: User },
        {
          model: ObjekPajak,
          include: [{ model: JenisSetoran, include: [{ model: JenisPajak }] }],
        },
        {
          model: Ptkp,
          as: "TanggunganPtkp", // Alias for `jumlahTanggunganKeluargaPtkpId`
        },
        {
          model: Ptkp,
          as: "Ptkp", // Alias for `ptkpId`
        },
        { model: Negara },
        { model: EBupot2126Penandatangan },
        { model: Cabang },
      ],
    });

    let filteredEBupot2126Pph21Tahunans = [];

    for (let eBupot2126Pph21Tahunan of eBupot2126Pph21Tahunans) {
      let objectData = {
        NO_BUKTI_POTONG: eBupot2126Pph21Tahunan.nomorBuktiSetor,
        TANGGAL_BUKTI_POTONG: formatDate(
          eBupot2126Pph21Tahunan.tanggalBuktiSetor
        ),
        NPWP_PEMOTONG: eBupot2126Pph21Tahunan.user.npwp15,
        NAMA_PEMOTONG: eBupot2126Pph21Tahunan.user.nama,
        PEREKAM: eBupot2126Pph21Tahunan.user.npwp15,
        IDENTITAS_PENERIMA_PENGHASILAN:
          eBupot2126Pph21Tahunan.identitas === "NPWP/NITKU"
            ? eBupot2126Pph21Tahunan.npwpNitku
            : eBupot2126Pph21Tahunan.nik,
        NAMA_PENERIMA_PENGHASILAN: eBupot2126Pph21Tahunan.nama,
        PENGHASILAN_BRUTO: eBupot2126Pph21Tahunan.jumlahPenghasilanBruto1sd7,
        PENGHASILAN_BRUTO_MASA_TERAKHIR:
          eBupot2126Pph21Tahunan.jumlahPenghasilan,
        PPH_DIPOTONG:
          eBupot2126Pph21Tahunan.pph21KurangLebihBayarMasaPajakTerakhir,
        KODE_OBJEK_PAJAK: eBupot2126Pph21Tahunan.objekpajak.kodeObjekPajak,
        PASAL:
          eBupot2126Pph21Tahunan.objekpajak.jenissetoran.jenispajak
            .namaJenisPajak,
        MASA_PAJAK: `${eBupot2126Pph21Tahunan.bulanPajakAwal}-${eBupot2126Pph21Tahunan.bulanPajakAkhir}`,
        TAHUN_PAJAK: eBupot2126Pph21Tahunan.tahunPajak,
        STATUS: eBupot2126Pph21Tahunan.isHapus ? "Dihapus" : "Normal",
        REV_NO: 0,
        POSTING: eBupot2126Pph21Tahunan.isPost ? "Sudah" : "Belum",
      };
      filteredEBupot2126Pph21Tahunans.push(objectData);
    }

    res.status(200).json(filteredEBupot2126Pph21Tahunans);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupot2126Pph21TahunansPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        npwpNitku: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: User },
    { model: ObjekPajak },
    {
      model: Ptkp,
      as: "TanggunganPtkp", // Alias for `jumlahTanggunganKeluargaPtkpId`
    },
    {
      model: Ptkp,
      as: "Ptkp", // Alias for `ptkpId`
    },
    { model: Negara },
    { model: EBupot2126Penandatangan },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126Pph21Tahunan.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126Pph21Tahunans = await EBupot2126Pph21Tahunan.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126Pph21Tahunans,
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

const getEBupot2126Pph21TahunansByUserPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    userIdInput: req.body.userIdInput,
    [Op.or]: [
      {
        npwpNitku: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: User },
    { model: ObjekPajak },
    {
      model: Ptkp,
      as: "TanggunganPtkp", // Alias for `jumlahTanggunganKeluargaPtkpId`
    },
    {
      model: Ptkp,
      as: "Ptkp", // Alias for `ptkpId`
    },
    { model: Negara },
    { model: EBupot2126Penandatangan },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126Pph21Tahunan.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126Pph21Tahunans = await EBupot2126Pph21Tahunan.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126Pph21Tahunans,
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

const getEBupot2126Pph21TahunansByUserSearchPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupot2126Pph21TahunanId: req.body.userEBupot2126Pph21TahunanId,
  };
  let tempInclude = [
    { model: User },
    { model: ObjekPajak },
    {
      model: Ptkp,
      as: "TanggunganPtkp", // Alias for `jumlahTanggunganKeluargaPtkpId`
    },
    {
      model: Ptkp,
      as: "Ptkp", // Alias for `ptkpId`
    },
    { model: Negara },
    { model: EBupot2126Penandatangan },
    { model: Cabang },
  ];

  if (req.body.pencairanBerdasarkan === "Periode") {
    let [bulan, tahun] = req.body.masaTahunPajakSearch.split("-");
    tempWhere = {
      tahunPajak: tahun,
    };
  } else if (req.body.pencairanBerdasarkan === "Nomor Bukti Setor") {
    tempWhere["nomorBuktiSetor"] = req.body.nomorBuktiSetor;
  } else if (req.body.pencairanBerdasarkan === "Identitas") {
    tempWhere = {
      userEBupot2126Pph21TahunanId: req.body.userEBupot2126Pph21TahunanId,
      [Op.or]: [
        {
          npwpNitku: req.body.identitas,
        },
        {
          nik: req.body.identitas,
        },
      ],
    };
  }

  const totalRows = await EBupot2126Pph21Tahunan.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126Pph21Tahunans = await EBupot2126Pph21Tahunan.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126Pph21Tahunans,
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

const getEBupot2126Pph21TahunanById = async (req, res) => {
  try {
    let eBupot2126Pph21Tahunan = await EBupot2126Pph21Tahunan.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: User },
        { model: ObjekPajak },
        {
          model: Ptkp,
          as: "TanggunganPtkp", // Alias for `jumlahTanggunganKeluargaPtkpId`
        },
        {
          model: Ptkp,
          as: "Ptkp", // Alias for `ptkpId`
        },
        { model: Negara },
        { model: EBupot2126Penandatangan },
        { model: Cabang },
      ],
    });

    res.status(200).json(eBupot2126Pph21Tahunan);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveEBupot2126Pph21Tahunan = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    console.log("In 1");
    // 01.) Find Next EBupot Unifikasi Pph42152223
    let maxNomorBuktiSetor = await EBupot2126Pph21Tahunan.max(
      "nomorBuktiSetor",
      {
        where: {
          userIdInput: req.body.userIdInput, // Apply the where clause to filter by userIdInput
        },
      }
    );

    if (maxNomorBuktiSetor === null) {
      maxNomorBuktiSetor = "0000000000";
    }

    let nextNomorBuktiSetor = findNextKode(parseInt(maxNomorBuktiSetor), 10);

    console.log("In 2");
    // 02.) Find Tanggal Bukti Setor
    let tanggalBuktiSetor = new Date();

    console.log("In 3");
    // 03.) Find Ptkp Jumlah Tanggungan Keluarga
    let jumlahTanggunganKeluargaPtkpId = null;
    if (req.body.jumlahTanggunganKeluarga) {
      let findPtkp = await Ptkp.findOne({
        where: {
          namaPtkp: req.body.jumlahTanggunganKeluarga,
        },
      });
      jumlahTanggunganKeluargaPtkpId = findPtkp.id;
    }

    console.log("In 4");
    // 04.) Find Negara
    let negaraId = null;
    if (req.body.namaNegara) {
      let findNegara = await Negara.findOne({
        where: {
          namaNegara: req.body.namaNegara,
        },
      });
      negaraId = findNegara.id;
    }

    console.log("In 5");
    // 05.) Find Objek Pajak
    let findObjekPajak = await ObjekPajak.findOne({
      where: {
        kodeObjekPajak: req.body.kodeObjekPajak,
      },
    });

    console.log("In 6");
    // 06.) Find Ptkp
    let ptkpId = null;
    if (req.body.ptkp) {
      let findPtkp = await Ptkp.findOne({
        where: {
          namaPtkp: req.body.ptkp,
        },
      });
      ptkpId = findPtkp.id;
    }

    console.log("In 7");
    // 07.) Find EBupot2126Penandatangan
    let findEBupot2126Penandatangan = await EBupot2126Penandatangan.findOne({
      where: {
        userEBupot2126PenandatanganId: req.body.userId,
        namaIdentitas: req.body.namaIdentitas,
      },
    });

    console.log("In 8");
    const insertedEBupot2126Pph21Tahunan = await EBupot2126Pph21Tahunan.create(
      {
        ...req.body,
        userEBupot2126Pph21TahunanId: req.body.userId,
        nomorBuktiSetor: nextNomorBuktiSetor,
        tanggalBuktiSetor,
        jumlahTanggunganKeluargaPtkpId,
        negaraId,
        objekPajakId: findObjekPajak.id,
        ptkpId,
        eBupot2126PenandatanganId: findEBupot2126Penandatangan.id,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );
    console.log("In 9");

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedEBupot2126Pph21Tahunan);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateEBupot2126Pph21Tahunan = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    console.log("In 3");
    // 03.) Find Ptkp
    let ptkpId = null;
    if (req.body.ptkp) {
      let findPtkp = await Ptkp.findOne({
        where: {
          namaPtkp: req.body.ptkp,
        },
      });
      ptkpId = findPtkp.id;
    }

    console.log("In 4");
    // 04.) Find EBupot2126Penandatangan
    let findEBupot2126Penandatangan = await EBupot2126Penandatangan.findOne({
      where: {
        userEBupot2126PenandatanganId: req.body.userId,
        namaIdentitas: req.body.namaIdentitas,
      },
    });

    console.log("In 5");
    let updatedEBupot2126Pph21Tahunan = await EBupot2126Pph21Tahunan.update(
      {
        ...req.body,
        ptkpId,
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
    console.log("In 6");

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(updatedEBupot2126Pph21Tahunan);
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const statusDeleteEBupot2126Pph21Tahunan = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupot2126Pph21Tahunan.update(
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
        res
          .status(200)
          .json({ message: "E-Bupot 2126 Pph 21 Tahunan Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `E-Bupot 2126 Pph 21 Tahunan ${req.params.id} not found!`,
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

const deleteEBupot2126Pph21Tahunan = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupot2126Pph21Tahunan.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json({ message: "E-Bupot 2126 Pph 21 Tahunan Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEBupot2126Pph21Tahunans,
  getEBupot2126Pph21TahunansByUserForExcel,
  getEBupot2126Pph21TahunansPagination,
  getEBupot2126Pph21TahunansByUserPagination,
  getEBupot2126Pph21TahunansByUserSearchPagination,
  getEBupot2126Pph21TahunanById,
  saveEBupot2126Pph21Tahunan,
  updateEBupot2126Pph21Tahunan,
  statusDeleteEBupot2126Pph21Tahunan,
  deleteEBupot2126Pph21Tahunan,
};
