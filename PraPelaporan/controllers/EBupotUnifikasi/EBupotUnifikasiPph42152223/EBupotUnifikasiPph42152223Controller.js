const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupotUnifikasiPph42152223 = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPph42152223/EBupotUnifikasiPph42152223Model.js");
const User = require("../../../../User/models/UserModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const Penandatangan = require("../../../models/Penandatangan/PenandatanganModel.js");
const DokumenDasarPemotonganEBupotUnifikasiPph42152223 = require("../../../models/EBupotUnifikasi/DokumenDasarPemotonganEBupotUnifikasiPph42152223/DokumenDasarPemotonganEBupotUnifikasiPph42152223Model.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
const { findNextKode } = require("../../../../helper/helper");

const getEBupotUnifikasiPph42152223s = async (req, res) => {
  try {
    const eBupotUnifikasiPph42152223s =
      await EBupotUnifikasiPph42152223.findAll({
        include: [
          { model: User },
          { model: Penandatangan },
          { model: ObjekPajak },
          { model: Cabang },
        ],
      });
    res.status(200).json(eBupotUnifikasiPph42152223s);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupotUnifikasiPph42152223sPagination = async (req, res) => {
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
    { model: Penandatangan },
    { model: ObjekPajak },
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiPph42152223.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiPph42152223s =
      await EBupotUnifikasiPph42152223.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiPph42152223s,
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

const getEBupotUnifikasiPph42152223sByUserPagination = async (req, res) => {
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
    { model: Penandatangan },
    { model: ObjekPajak },
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiPph42152223.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiPph42152223s =
      await EBupotUnifikasiPph42152223.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiPph42152223s,
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

const getEBupotUnifikasiPph42152223sByUserSearchPagination = async (
  req,
  res
) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupotUnifikasiPph42152223Id: req.body.userEBupotUnifikasiPph42152223Id,
  };
  let tempInclude = [
    { model: User },
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
      userEBupotUnifikasiPph42152223Id:
        req.body.userEBupotUnifikasiPph42152223Id,
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

  const totalRows = await EBupotUnifikasiPph42152223.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiPph42152223s =
      await EBupotUnifikasiPph42152223.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiPph42152223s,
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

const getEBupotUnifikasiPph42152223ById = async (req, res) => {
  try {
    let eBupotUnifikasiPph42152223 = await EBupotUnifikasiPph42152223.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: User },
        { model: Penandatangan },
        { model: ObjekPajak },
        { model: Cabang },
      ],
    });

    const dokumenDasarPemotonganEBupotUnifikasiPph42152223s =
      await DokumenDasarPemotonganEBupotUnifikasiPph42152223.findAll({
        where: {
          eBupotUnifikasiPph42152223Id: req.params.id,
        },
        include: [
          { model: EBupotUnifikasiPph42152223, include: [{ model: User }] },
          { model: Cabang },
        ],
      });

    let combinedResult = {
      eBupotUnifikasiPph42152223: eBupotUnifikasiPph42152223,
      dokumenDasarPemotongan: dokumenDasarPemotonganEBupotUnifikasiPph42152223s,
    };

    res.status(200).json(combinedResult);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveEBupotUnifikasiPph42152223 = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    // 01.) Find Next EBupot Unifikasi Pph42152223
    let maxNomorBuktiSetor = await EBupotUnifikasiPph42152223.max(
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

    // 03.) Find Objek Pajak
    let findObjekPajak = await ObjekPajak.findOne({
      where: {
        kodeObjekPajak: req.body.kodeObjekPajak,
      },
    });

    // 04.) Find Penandatangan
    let findPenandatangan = await Penandatangan.findOne({
      where: {
        userPenandatanganId: req.body.userId,
        namaIdentitas: req.body.namaIdentitas,
      },
    });

    // 05.) Cari Bulan
    let bulanPajak = getMonthIndex(req.body.masaPajak);

    const insertedEBupotUnifikasiPph42152223 =
      await EBupotUnifikasiPph42152223.create(
        {
          ...req.body,
          userEBupotUnifikasiPph42152223Id: req.body.userId,
          nomorBuktiSetor: nextNomorBuktiSetor,
          tanggalBuktiSetor,
          objekPajakId: findObjekPajak.id,
          penandatanganId: findPenandatangan.id,
          bulanPajak,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );

    for (let dasarPemotongan of req.body.dasarPemotongan) {
      const insertedDokumenDasarPemotonganEBupotUnifikasiPph42152223 =
        await DokumenDasarPemotonganEBupotUnifikasiPph42152223.create(
          {
            ...dasarPemotongan,
            eBupotUnifikasiPph42152223Id: insertedEBupotUnifikasiPph42152223.id,
            cabangId: req.body.kodeCabang,
          },
          { transaction }
        );
    }

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedEBupotUnifikasiPph42152223);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateEBupotUnifikasiPph42152223 = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    // 01.) Find Objek Pajak
    let findObjekPajak = await ObjekPajak.findOne({
      where: {
        kodeObjekPajak: req.body.kodeObjekPajak,
      },
    });

    // 02.) Find Penandatangan
    let findPenandatangan = await Penandatangan.findOne({
      where: {
        userPenandatanganId: req.body.userId,
        namaIdentitas: req.body.namaIdentitas,
      },
    });

    let updatedEBupotUnifikasiPph42152223 =
      await EBupotUnifikasiPph42152223.update(
        {
          ...req.body,
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

    await DokumenDasarPemotonganEBupotUnifikasiPph42152223.destroy({
      where: {
        eBupotUnifikasiPph42152223Id: req.params.id,
      },
      transaction,
    });

    let filteredDasarPemotongan = req.body.dasarPemotongan.map(
      ({ id, ...rest }) => rest
    );

    for (let dasarPemotongan of filteredDasarPemotongan) {
      const insertedDokumenDasarPemotonganEBupotUnifikasiPph42152223 =
        await DokumenDasarPemotonganEBupotUnifikasiPph42152223.create(
          {
            ...dasarPemotongan,
            eBupotUnifikasiPph42152223Id: req.params.id,
            cabangId: req.body.kodeCabang,
          },
          { transaction }
        );
    }

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(updatedEBupotUnifikasiPph42152223);
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const statusDeleteEBupotUnifikasiPph42152223 = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupotUnifikasiPph42152223.update(
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
          .json({ message: "E-Bupot Unifikasi Pph 42152223 Updated!" });
      } else {
        if (transaction) {
          await transaction.rollback();
        }
        res.status(400).json({
          message: `E-Bupot Unifikasi Pph 42152223 ${req.params.id} not found!`,
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

const deleteEBupotUnifikasiPph42152223 = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupotUnifikasiPph42152223.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res
      .status(201)
      .json({ message: "E-Bupot Unifikasi Pph 42152223 Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEBupotUnifikasiPph42152223s,
  getEBupotUnifikasiPph42152223sPagination,
  getEBupotUnifikasiPph42152223sByUserPagination,
  getEBupotUnifikasiPph42152223sByUserSearchPagination,
  getEBupotUnifikasiPph42152223ById,
  saveEBupotUnifikasiPph42152223,
  updateEBupotUnifikasiPph42152223,
  statusDeleteEBupotUnifikasiPph42152223,
  deleteEBupotUnifikasiPph42152223,
};
