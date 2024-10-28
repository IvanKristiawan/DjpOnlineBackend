const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupotUnifikasiPenyiapanSpt = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPenyiapanSpt/EBupotUnifikasiPenyiapanSptModel.js");
const User = require("../../../../User/models/UserModel.js");
const Penandatangan = require("../../../models/Penandatangan/PenandatanganModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
const EBupotUnifikasiTagihanPemotongan = require("../../../models/EBupotUnifikasi/EBupotUnifikasiTagihanPemotongan/EBupotUnifikasiTagihanPemotonganModel.js");
const EBupotUnifikasiPosting = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPosting/EBupotUnifikasiPostingModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const JenisSetoran = require("../../../../Master/models/JenisSetoran/JenisSetoranModel.js");
const JenisPajak = require("../../../../Master/models/JenisPajak/JenisPajakModel.js");
const EBupotUnifikasiPphDisetorSendiri = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPphDisetorSendiri/EBupotUnifikasiPphDisetorSendiriModel.js");
const EBilling = require("../../../../EBilling/models/EBilling/EBillingModel.js");
const EBupotUnifikasiPph42152223 = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPph42152223/EBupotUnifikasiPph42152223Model.js");
const EBupotUnifikasiPphNonResiden = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPphNonResiden/EBupotUnifikasiPphNonResidenModel.js");
const Negara = require("../../../../Master/models/Negara/NegaraModel.js");

const getEBupotUnifikasiPenyiapanSpts = async (req, res) => {
  try {
    const eBupotUnifikasiPenyiapanSpts =
      await EBupotUnifikasiPenyiapanSpt.findAll({
        include: [{ model: User }, { model: Penandatangan }, { model: Cabang }],
      });
    res.status(200).json(eBupotUnifikasiPenyiapanSpts);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupotUnifikasiPenyiapanSptsPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    [Op.or]: [
      {
        masaPajak: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: User },
    { model: Penandatangan },
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiPenyiapanSpt.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiPenyiapanSpts =
      await EBupotUnifikasiPenyiapanSpt.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiPenyiapanSpts,
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

const getEBupotUnifikasiPenyiapanSptsByUserPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let tempWhere = {
    userIdInput: req.body.userIdInput,
    [Op.or]: [
      {
        masaPajak: {
          [Op.like]: "%" + search + "%",
        },
      },
    ],
  };
  let tempInclude = [
    { model: User },
    { model: Penandatangan },
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiPenyiapanSpt.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiPenyiapanSpts =
      await EBupotUnifikasiPenyiapanSpt.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    res.status(200).json({
      eBupotUnifikasiPenyiapanSpts,
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

const getEBupotUnifikasiPenyiapanSptsByUserSearchPagination = async (
  req,
  res
) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupotUnifikasiPenyiapanSptId:
      req.body.userEBupotUnifikasiPenyiapanSptId,
  };
  let tempInclude = [
    { model: User },
    { model: Penandatangan },
    { model: Cabang },
  ];

  const totalRows = await EBupotUnifikasiPenyiapanSpt.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupotUnifikasiPenyiapanSpts =
      await EBupotUnifikasiPenyiapanSpt.findAll({
        where: tempWhere,
        include: tempInclude,
        offset: offset,
        limit: limit,
      });
    console.log(eBupotUnifikasiPenyiapanSpts.length);

    let tempEBupotUnifikasiPenyiapanSpts = [];
    for (let eBupotUnifikasiPenyiapanSpt of eBupotUnifikasiPenyiapanSpts) {
      const eBupotUnifikasiTagihanPemotongans =
        await EBupotUnifikasiTagihanPemotongan.findAll({
          where: {
            ebupotUnifikasiPenyiapanSptId: eBupotUnifikasiPenyiapanSpt.id,
          },
          include: [
            { model: User },
            {
              model: ObjekPajak,
              include: [
                {
                  model: JenisSetoran,
                  as: "jenissetoran",
                  include: [
                    {
                      model: JenisPajak,
                      as: "jenispajak",
                    },
                  ],
                },
              ],
            },
            { model: Cabang },
          ],
        });

      // Use map and reduce to calculate the total pphYangDipotong
      const totalPphYangDipotong = eBupotUnifikasiTagihanPemotongans
        .map((record) => record.pphYangDipotong) // Extract the 'pphYangDipotong' field
        .reduce((acc, curr) => acc + curr, 0); // Sum all values

      // Use map and reduce to calculate the total pphYangDisetor
      const totalPphYangDisetor = eBupotUnifikasiTagihanPemotongans
        .map((record) => record.pphYangDisetor) // Extract the 'pphYangDipotong' field
        .reduce((acc, curr) => acc + curr, 0); // Sum all values

      let jumlahPphKurangSetor = totalPphYangDipotong - totalPphYangDisetor;
      let keteranganSpt = "";
      if (jumlahPphKurangSetor === 0) {
        keteranganSpt = "SPT Anda siap kirim";
      } else {
        keteranganSpt =
          "Terdapat Kekurangan Setor, Silahkan cek kembali SPT Anda.";
      }

      let objectData = {
        ...eBupotUnifikasiPenyiapanSpt.dataValues,
        jumlahPphKurangSetor: totalPphYangDipotong - totalPphYangDisetor,
        keteranganSpt,
      };

      tempEBupotUnifikasiPenyiapanSpts.push(objectData);
    }

    res.status(200).json({
      eBupotUnifikasiPenyiapanSpts: tempEBupotUnifikasiPenyiapanSpts,
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

const getEBupotUnifikasiCombinedPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let userIdInput = req.body.userIdInput;
  let combinedData = [];

  // Define the where conditions for each type
  const whereConditions = [
    {
      model: EBupotUnifikasiPphDisetorSendiri,
      condition: {
        userIdInput,
      },
      include: [
        { model: User },
        { model: EBilling },
        {
          model: ObjekPajak,
          as: "objekpajak",
          include: [
            {
              model: JenisSetoran,
              as: "jenissetoran",
              include: [
                {
                  model: JenisPajak,
                  as: "jenispajak",
                },
              ],
            },
          ],
        },
        { model: Cabang },
      ],
    },
    {
      model: EBupotUnifikasiPph42152223,
      condition: {
        userIdInput,
      },
      include: [
        { model: User },
        { model: Penandatangan },
        {
          model: ObjekPajak,
          as: "objekpajak",
          include: [
            {
              model: JenisSetoran,
              as: "jenissetoran",
              include: [
                {
                  model: JenisPajak,
                  as: "jenispajak",
                },
              ],
            },
          ],
        },
        { model: Cabang },
      ],
    },
    {
      model: EBupotUnifikasiPphNonResiden,
      condition: {
        userIdInput,
      },
      include: [
        { model: User },
        { model: Negara },
        { model: Penandatangan },
        {
          model: ObjekPajak,
          as: "objekpajak",
          include: [
            {
              model: JenisSetoran,
              as: "jenissetoran",
              include: [
                {
                  model: JenisPajak,
                  as: "jenispajak",
                },
              ],
            },
          ],
        },
        { model: Cabang },
      ],
    },
  ];

  try {
    // Perform each query and get counts
    const results = await Promise.all(
      whereConditions.map(async ({ model, condition, include }) => {
        const totalRows = await model.count({ where: condition, include });
        const data = await model.findAll({
          where: condition,
          include,
          offset,
          limit,
        });
        return { totalRows, data };
      })
    );

    // Aggregate data and total counts
    results.forEach(({ totalRows, data }) => {
      combinedData = [...combinedData, ...data];
    });

    const totalRows = results.reduce(
      (sum, result) => sum + result.totalRows,
      0
    );
    const totalPage = Math.ceil(totalRows / limit);

    res.status(200).json({
      data: combinedData,
      page,
      limit,
      totalRows,
      totalPage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEBupotUnifikasiPenyiapanSptById = async (req, res) => {
  try {
    let eBupotUnifikasiPenyiapanSpt = await EBupotUnifikasiPenyiapanSpt.findOne(
      {
        where: {
          id: req.params.id,
        },
        include: [{ model: User }, { model: Penandatangan }, { model: Cabang }],
      }
    );

    res.status(200).json(eBupotUnifikasiPenyiapanSpt);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveEBupotUnifikasiPenyiapanSpt = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    // 01.) Find Tanggal Tagihan Pemotongan
    let tanggalTagihanPemotongan = new Date();

    // 03.) Cari Bulan
    let masaPajak = getMonthIndex(req.body.masaPajak);

    const insertedEBupotUnifikasiPenyiapanSpt =
      await EBupotUnifikasiPenyiapanSpt.create(
        {
          ...req.body,
          userEBupotUnifikasiPenyiapanSptId: req.body.userId,
          tanggalTagihanPemotongan,
          masaPajak,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedEBupotUnifikasiPenyiapanSpt);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateEBupotUnifikasiPenyiapanSpt = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    // 01.) Find Penandatangan
    let findPenandatangan = await Penandatangan.findOne({
      where: {
        userPenandatanganId: req.body.userId,
        namaIdentitas: req.body.namaIdentitas,
      },
    });

    // 02.) Update E-Bupot Unifikasi Penyiapan Spt
    let updatedEBupotUnifikasiPenyiapanSpt =
      await EBupotUnifikasiPenyiapanSpt.update(
        {
          ...req.body,
          penandatanganId: findPenandatangan.id,
        },
        {
          where: {
            id: req.params.id,
          },
          transaction,
        }
      );

    // 03.) Update E-Bupot Unifikasi Posting
    const eBupotUnifikasiPostings = Object.entries(
      req.body.eBupotUnifikasiPosting
    ).map(([id, values]) => ({
      id,
      ...values,
    }));

    for (let eBupotUnifikasiPosting of eBupotUnifikasiPostings) {
      await EBupotUnifikasiPosting.update(
        {
          jumlahDpp: eBupotUnifikasiPosting.jumlahDpp,
          jumlahPph: eBupotUnifikasiPosting.jumlahPph,
        },
        {
          where: {
            id: eBupotUnifikasiPosting.id,
          },
          transaction,
        }
      );
    }

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(updatedEBupotUnifikasiPenyiapanSpt);
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteEBupotUnifikasiPenyiapanSpt = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupotUnifikasiPenyiapanSpt.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res
      .status(201)
      .json({ message: "E-Bupot Unifikasi Penyiapan Spt Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEBupotUnifikasiPenyiapanSpts,
  getEBupotUnifikasiPenyiapanSptsPagination,
  getEBupotUnifikasiPenyiapanSptsByUserPagination,
  getEBupotUnifikasiPenyiapanSptsByUserSearchPagination,
  getEBupotUnifikasiCombinedPagination,
  getEBupotUnifikasiPenyiapanSptById,
  saveEBupotUnifikasiPenyiapanSpt,
  updateEBupotUnifikasiPenyiapanSpt,
  deleteEBupotUnifikasiPenyiapanSpt,
};
