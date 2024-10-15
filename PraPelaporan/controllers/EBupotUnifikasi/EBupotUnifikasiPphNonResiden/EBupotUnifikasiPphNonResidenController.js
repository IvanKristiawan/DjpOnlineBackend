const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupotUnifikasiPphNonResiden = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPphNonResiden/EBupotUnifikasiPphNonResidenModel.js");
const User = require("../../../../User/models/UserModel.js");
const Negara = require("../../../../Master/models/Negara/NegaraModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const JenisSetoran = require("../../../../Master/models/JenisSetoran/JenisSetoranModel.js");
const JenisPajak = require("../../../../Master/models/JenisPajak/JenisPajakModel.js");
const Penandatangan = require("../../../models/Penandatangan/PenandatanganModel.js");
const DokumenDasarPemotonganEBupotUnifikasiPphNonResiden = require("../../../models/EBupotUnifikasi/DokumenDasarPemotonganEBupotUnifikasiPphNonResiden/DokumenDasarPemotonganEBupotUnifikasiPphNonResidenModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
const { findNextKode, formatDate } = require("../../../../helper/helper");

const getEBupotUnifikasiPphNonResidens = async (req, res) => {
  try {
    const eBupotUnifikasiPphNonResidens =
      await EBupotUnifikasiPphNonResiden.findAll({
        include: [
          { model: User },
          { model: Negara },
          { model: Penandatangan },
          { model: ObjekPajak },
          { model: Cabang },
        ],
      });
    res.status(200).json(eBupotUnifikasiPphNonResidens);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupotUnifikasiPphNonResidensByUserForExcel = async (req, res) => {
  try {
    const eBupotUnifikasiPphNonResidens =
      await EBupotUnifikasiPphNonResiden.findAll({
        where: {
          userEBupotUnifikasiPphNonResidenId:
            req.body.userEBupotUnifikasiPphNonResidenId,
        },
        include: [
          { model: User },
          { model: Negara },
          { model: Penandatangan },
          {
            model: ObjekPajak,
            include: [
              { model: JenisSetoran, include: [{ model: JenisPajak }] },
            ],
          },
          { model: Cabang },
        ],
      });

    let filteredEBupotUnifikasiPphNonResidens = [];

    for (let eBupotUnifikasiPphNonResiden of eBupotUnifikasiPphNonResidens) {
      let objectData = {
        NO_BUKTI_POTONG: eBupotUnifikasiPphNonResiden.nomorBuktiSetor,
        TANGGAL_BUKTI_POTONG: formatDate(
          eBupotUnifikasiPphNonResiden.tanggalBuktiSetor
        ),
        NPWP_PEMOTONG: eBupotUnifikasiPphNonResiden.user.npwp15,
        NAMA_PEMOTONG: eBupotUnifikasiPphNonResiden.user.nama,
        IDENTITAS_PENERIMA_PENGHASILAN: eBupotUnifikasiPphNonResiden.tin,
        NAMA_PENERIMA_PENGHASILAN: eBupotUnifikasiPphNonResiden.nama,
        PENGHASILAN_BRUTO: eBupotUnifikasiPphNonResiden.jumlahPenghasilanBruto,
        PPH_DIPOTONG: eBupotUnifikasiPphNonResiden.pPhYangDipotongDipungut,
        KODE_OBJEK_PAJAK:
          eBupotUnifikasiPphNonResiden.objekpajak.kodeObjekPajak,

        PASAL:
          eBupotUnifikasiPphNonResiden.objekpajak.jenissetoran.jenispajak
            .namaJenisPajak,

        MASA_PAJAK: eBupotUnifikasiPphNonResiden.bulanPajak,
        TAHUN_PAJAK: eBupotUnifikasiPphNonResiden.tahunPajak,
        STATUS: eBupotUnifikasiPphNonResiden.isHapus ? "Dihapus" : "Normal",
        REV_NO: 0,
        POSTING: eBupotUnifikasiPphNonResiden.isPost ? "Sudah" : "Belum",
      };
      filteredEBupotUnifikasiPphNonResidens.push(objectData);
    }

    res.status(200).json(filteredEBupotUnifikasiPphNonResidens);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupotUnifikasiPphNonResidensPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        nama: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: User },
    { model: Negara },
    { model: Penandatangan },
    { model: ObjekPajak },
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiPphNonResiden.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiPphNonResidens =
      await EBupotUnifikasiPphNonResiden.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiPphNonResidens,
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

const getEBupotUnifikasiPphNonResidensByUserPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    userIdInput: req.body.userIdInput,
    [Op.or]: [
      {
        nama: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: User },
    { model: Negara },
    { model: Penandatangan },
    { model: ObjekPajak },
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiPphNonResiden.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiPphNonResidens =
      await EBupotUnifikasiPphNonResiden.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiPphNonResidens,
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

const getEBupotUnifikasiPphNonResidensByUserSearchPagination = async (
  req,
  res
) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupotUnifikasiPphNonResidenId:
      req.body.userEBupotUnifikasiPphNonResidenId,
  };
  let tempInclude = [
    { model: User },
    { model: Negara },
    { model: Penandatangan },
    { model: ObjekPajak },
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
      userEBupotUnifikasiPphNonResidenId:
        req.body.userEBupotUnifikasiPphNonResidenId,
      [Op.or]: [
        {
          tin: req.body.identitas,
        },
      ],
    };
  }

  const totalRows = await EBupotUnifikasiPphNonResiden.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiPphNonResidens =
      await EBupotUnifikasiPphNonResiden.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiPphNonResidens,
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

const getEBupotUnifikasiPphNonResidenById = async (req, res) => {
  try {
    let eBupotUnifikasiPphNonResiden =
      await EBupotUnifikasiPphNonResiden.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          { model: User },
          { model: Negara },
          { model: Penandatangan },
          { model: ObjekPajak },
          { model: Cabang },
        ],
      });

    const dokumenDasarPemotonganEBupotUnifikasiPphNonResidens =
      await DokumenDasarPemotonganEBupotUnifikasiPphNonResiden.findAll({
        where: {
          eBupotUnifikasiPphNonResidenId: req.params.id,
        },
        include: [
          { model: EBupotUnifikasiPphNonResiden, include: [{ model: User }] },
          { model: Cabang },
        ],
      });

    let combinedResult = {
      eBupotUnifikasiPphNonResiden: eBupotUnifikasiPphNonResiden,
      dokumenDasarPemotongan:
        dokumenDasarPemotonganEBupotUnifikasiPphNonResidens,
    };

    res.status(200).json(combinedResult);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveEBupotUnifikasiPphNonResiden = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    // 01.) Find Next EBupot Unifikasi PphNonResiden
    let maxNomorBuktiSetor = await EBupotUnifikasiPphNonResiden.max(
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

    // 02.) Find Tanggal Bukti Setor
    let tanggalBuktiSetor = new Date();

    // 03.) Find Negara
    let findNegara = await Negara.findOne({
      where: {
        namaNegara: req.body.namaNegara,
      },
    });

    // 04.) Find Objek Pajak
    let findObjekPajak = await ObjekPajak.findOne({
      where: {
        kodeObjekPajak: req.body.kodeObjekPajak,
      },
    });

    // 05.) Find Penandatangan
    let findPenandatangan = await Penandatangan.findOne({
      where: {
        userPenandatanganId: req.body.userId,
        namaIdentitas: req.body.namaIdentitas,
      },
    });

    // 06.) Cari Bulan
    let bulanPajak = getMonthIndex(req.body.masaPajak);

    const insertedEBupotUnifikasiPphNonResiden =
      await EBupotUnifikasiPphNonResiden.create(
        {
          ...req.body,
          userEBupotUnifikasiPphNonResidenId: req.body.userId,
          nomorBuktiSetor: nextNomorBuktiSetor,
          tanggalBuktiSetor,
          negaraId: findNegara.id,
          objekPajakId: findObjekPajak.id,
          penandatanganId: findPenandatangan.id,
          bulanPajak,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );

    for (let dasarPemotongan of req.body.dasarPemotongan) {
      const insertedDokumenDasarPemotonganEBupotUnifikasiPphNonResiden =
        await DokumenDasarPemotonganEBupotUnifikasiPphNonResiden.create(
          {
            ...dasarPemotongan,
            eBupotUnifikasiPphNonResidenId:
              insertedEBupotUnifikasiPphNonResiden.id,
            cabangId: req.body.kodeCabang,
          },
          { transaction }
        );
    }

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedEBupotUnifikasiPphNonResiden);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateEBupotUnifikasiPphNonResiden = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    // 01.) Find Negara
    let findNegara = await Negara.findOne({
      where: {
        namaNegara: req.body.namaNegara,
      },
    });

    // 02.) Find Objek Pajak
    let findObjekPajak = await ObjekPajak.findOne({
      where: {
        kodeObjekPajak: req.body.kodeObjekPajak,
      },
    });

    // 03.) Find Penandatangan
    let findPenandatangan = await Penandatangan.findOne({
      where: {
        userPenandatanganId: req.body.userId,
        namaIdentitas: req.body.namaIdentitas,
      },
    });

    let updatedEBupotUnifikasiPphNonResiden =
      await EBupotUnifikasiPphNonResiden.update(
        {
          ...req.body,
          negaraId: findNegara.id,
          objekPajakId: findObjekPajak.id,
          penandatanganId: findPenandatangan.id,
          cabangId: req.body.kodeCabang,
        },
        {
          where: {
            id: req.params.id,
          },
          transaction,
        }
      );

    await DokumenDasarPemotonganEBupotUnifikasiPphNonResiden.destroy({
      where: {
        eBupotUnifikasiPphNonResidenId: req.params.id,
      },
      transaction,
    });

    let filteredDasarPemotongan = req.body.dasarPemotongan.map(
      ({ id, ...rest }) => rest
    );

    for (let dasarPemotongan of filteredDasarPemotongan) {
      const insertedDokumenDasarPemotonganEBupotUnifikasiPphNonResiden =
        await DokumenDasarPemotonganEBupotUnifikasiPphNonResiden.create(
          {
            ...dasarPemotongan,
            eBupotUnifikasiPphNonResidenId: req.params.id,
            cabangId: req.body.kodeCabang,
          },
          { transaction }
        );
    }

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(updatedEBupotUnifikasiPphNonResiden);
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const statusDeleteEBupotUnifikasiPphNonResiden = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupotUnifikasiPphNonResiden.update(
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
          .json({ message: "E-Bupot Unifikasi Pph NonResiden Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `E-Bupot Unifikasi Pph NonResiden ${req.params.id} not found!`,
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

const deleteEBupotUnifikasiPphNonResiden = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupotUnifikasiPphNonResiden.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res
      .status(201)
      .json({ message: "E-Bupot Unifikasi Pph NonResiden Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEBupotUnifikasiPphNonResidens,
  getEBupotUnifikasiPphNonResidensByUserForExcel,
  getEBupotUnifikasiPphNonResidensPagination,
  getEBupotUnifikasiPphNonResidensByUserPagination,
  getEBupotUnifikasiPphNonResidensByUserSearchPagination,
  getEBupotUnifikasiPphNonResidenById,
  saveEBupotUnifikasiPphNonResiden,
  updateEBupotUnifikasiPphNonResiden,
  statusDeleteEBupotUnifikasiPphNonResiden,
  deleteEBupotUnifikasiPphNonResiden,
};
