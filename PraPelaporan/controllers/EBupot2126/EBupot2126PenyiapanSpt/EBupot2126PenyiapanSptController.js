const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupot2126PenyiapanSpt = require("../../../models/EBupot2126/EBupot2126PenyiapanSpt/EBupot2126PenyiapanSptModel.js");
const User = require("../../../../User/models/UserModel.js");
const EBupot2126Penandatangan = require("../../../models/EBupot2126/Penandatangan/EBupot2126PenandatanganModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
// const EBupot2126TagihanPemotongan = require("../../../models/EBupot2126/EBupot2126TagihanPemotongan/EBupot2126TagihanPemotonganModel.js");
const EBupot2126Posting = require("../../../models/EBupot2126/EBupot2126Posting/EBupot2126PostingModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const JenisSetoran = require("../../../../Master/models/JenisSetoran/JenisSetoranModel.js");
const JenisPajak = require("../../../../Master/models/JenisPajak/JenisPajakModel.js");
const Negara = require("../../../../Master/models/Negara/NegaraModel.js");
const { generateRandomNumberString } = require("../../../../helper/helper.js");
const Tahun = require("../../../../Master/models/Tahun/TahunModel.js");

const getEBupot2126PenyiapanSpts = async (req, res) => {
  try {
    const eBupot2126PenyiapanSpts = await EBupot2126PenyiapanSpt.findAll({
      include: [
        { model: User },
        { model: EBupot2126Penandatangan },
        { model: Cabang },
      ],
    });
    res.status(200).json(eBupot2126PenyiapanSpts);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getEBupot2126PenyiapanSptsPagination = async (req, res) => {
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
    { model: EBupot2126Penandatangan },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126PenyiapanSpt.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126PenyiapanSpts = await EBupot2126PenyiapanSpt.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126PenyiapanSpts,
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

const getEBupot2126PenyiapanSptsByUserPagination = async (req, res) => {
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
    { model: EBupot2126Penandatangan },
    { model: Cabang },
  ];

  const totalRows = await EBupot2126PenyiapanSpt.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126PenyiapanSpts = await EBupot2126PenyiapanSpt.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126PenyiapanSpts,
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

// const getEBupot2126PenyiapanSptsByUserSearchPagination = async (
//   req,
//   res
// ) => {
//   const page = parseInt(req.query.page) || 0;
//   const limit = parseInt(req.query.limit) || 10;
//   const search = req.query.search_query || "";
//   const offset = limit * page;

//   let tempWhere = {
//     userEBupot2126PenyiapanSptId:
//       req.body.userEBupot2126PenyiapanSptId,
//   };
//   let tempInclude = [
//     { model: User },
//     { model: EBupot2126Penandatangan },
//     { model: Cabang },
//   ];

//   const totalRows = await EBupot2126PenyiapanSpt.count({
//     where: tempWhere,
//     include: tempInclude,
//   });
//   const totalPage = Math.ceil(totalRows / limit);
//   try {
//     const eBupot2126PenyiapanSpts =
//       await EBupot2126PenyiapanSpt.findAll({
//         where: tempWhere,
//         include: tempInclude,
//         offset: offset,
//         limit: limit,
//       });
//     // console.log(eBupot2126PenyiapanSpts.length);

//     let tempEBupot2126PenyiapanSpts = [];
//     for (let eBupot2126PenyiapanSpt of eBupot2126PenyiapanSpts) {
//       const eBupot2126TagihanPemotongans =
//         await EBupot2126TagihanPemotongan.findAll({
//           where: {
//             ebupot2126PenyiapanSptId: eBupot2126PenyiapanSpt.id,
//           },
//           include: [
//             { model: User },
//             {
//               model: ObjekPajak,
//               include: [
//                 {
//                   model: JenisSetoran,
//                   as: "jenissetoran",
//                   include: [
//                     {
//                       model: JenisPajak,
//                       as: "jenispajak",
//                     },
//                   ],
//                 },
//               ],
//             },
//             { model: Cabang },
//           ],
//         });

//       // Use map and reduce to calculate the total pphYangDipotong
//       const totalPphYangDipotong = eBupot2126TagihanPemotongans
//         .map((record) => record.pphYangDipotong) // Extract the 'pphYangDipotong' field
//         .reduce((acc, curr) => acc + curr, 0); // Sum all values

//       // Use map and reduce to calculate the total pphYangDisetor
//       const totalPphYangDisetor = eBupot2126TagihanPemotongans
//         .map((record) => record.pphYangDisetor) // Extract the 'pphYangDipotong' field
//         .reduce((acc, curr) => acc + curr, 0); // Sum all values

//       let jumlahPphKurangSetor = totalPphYangDipotong - totalPphYangDisetor;
//       let keteranganSpt = "";
//       if (jumlahPphKurangSetor === 0) {
//         keteranganSpt = "SPT Anda siap kirim";
//       } else {
//         keteranganSpt =
//           "Terdapat Kekurangan Setor, Silahkan cek kembali SPT Anda.";
//       }

//       let objectData = {
//         ...eBupot2126PenyiapanSpt.dataValues,
//         jumlahPphKurangSetor: totalPphYangDipotong - totalPphYangDisetor,
//         keteranganSpt,
//       };

//       tempEBupot2126PenyiapanSpts.push(objectData);
//     }

//     res.status(200).json({
//       eBupot2126PenyiapanSpts: tempEBupot2126PenyiapanSpts,
//       page: page,
//       limit: limit,
//       totalRows: totalRows,
//       totalPage: totalPage,
//     });
//   } catch (error) {
//     // Error 500 = Kesalahan di server
//     res.status(500).json({ message: error.message });
//   }
// };

// const getEBupot2126PenyiapanSptsTerkirimByUserSearchPagination = async (
//   req,
//   res
// ) => {
//   const page = parseInt(req.query.page) || 0;
//   const limit = parseInt(req.query.limit) || 10;
//   const search = req.query.search_query || "";
//   const offset = limit * page;

//   let tempWhere = {
//     userEBupot2126PenyiapanSptId:
//       req.body.userEBupot2126PenyiapanSptId,
//     noBpeNtte: {
//       [Op.ne]: "",
//     },
//   };
//   let tempInclude = [
//     { model: User },
//     { model: EBupot2126Penandatangan },
//     { model: Cabang },
//   ];

//   const totalRows = await EBupot2126PenyiapanSpt.count({
//     where: tempWhere,
//     include: tempInclude,
//   });
//   const totalPage = Math.ceil(totalRows / limit);
//   try {
//     const eBupot2126PenyiapanSpts =
//       await EBupot2126PenyiapanSpt.findAll({
//         where: tempWhere,
//         include: tempInclude,
//         offset: offset,
//         limit: limit,
//       });
//     // console.log(eBupot2126PenyiapanSpts.length);

//     let tempEBupot2126PenyiapanSpts = [];
//     for (let eBupot2126PenyiapanSpt of eBupot2126PenyiapanSpts) {
//       const eBupot2126TagihanPemotongans =
//         await EBupot2126TagihanPemotongan.findAll({
//           where: {
//             ebupot2126PenyiapanSptId: eBupot2126PenyiapanSpt.id,
//           },
//           include: [
//             { model: User },
//             {
//               model: ObjekPajak,
//               include: [
//                 {
//                   model: JenisSetoran,
//                   as: "jenissetoran",
//                   include: [
//                     {
//                       model: JenisPajak,
//                       as: "jenispajak",
//                     },
//                   ],
//                 },
//               ],
//             },
//             { model: Cabang },
//           ],
//         });

//       // Use map and reduce to calculate the total pphYangDipotong
//       const totalPphYangDipotong = eBupot2126TagihanPemotongans
//         .map((record) => record.pphYangDipotong) // Extract the 'pphYangDipotong' field
//         .reduce((acc, curr) => acc + curr, 0); // Sum all values

//       // Use map and reduce to calculate the total pphYangDisetor
//       const totalPphYangDisetor = eBupot2126TagihanPemotongans
//         .map((record) => record.pphYangDisetor) // Extract the 'pphYangDipotong' field
//         .reduce((acc, curr) => acc + curr, 0); // Sum all values

//       let jumlahPphKurangSetor = totalPphYangDipotong - totalPphYangDisetor;
//       let keteranganSpt = "";
//       if (jumlahPphKurangSetor === 0) {
//         keteranganSpt = "SPT Anda siap kirim";
//       } else {
//         keteranganSpt =
//           "Terdapat Kekurangan Setor, Silahkan cek kembali SPT Anda.";
//       }

//       let objectData = {
//         ...eBupot2126PenyiapanSpt.dataValues,
//         jumlahPphKurangSetor: totalPphYangDipotong - totalPphYangDisetor,
//         keteranganSpt,
//       };

//       tempEBupot2126PenyiapanSpts.push(objectData);
//     }

//     res.status(200).json({
//       eBupot2126PenyiapanSpts: tempEBupot2126PenyiapanSpts,
//       page: page,
//       limit: limit,
//       totalRows: totalRows,
//       totalPage: totalPage,
//     });
//   } catch (error) {
//     // Error 500 = Kesalahan di server
//     res.status(500).json({ message: error.message });
//   }
// };

const getEBupot2126PenyiapanSptById = async (req, res) => {
  try {
    let eBupot2126PenyiapanSpt = await EBupot2126PenyiapanSpt.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: User },
        { model: EBupot2126Penandatangan },
        { model: Cabang },
      ],
    });

    res.status(200).json(eBupot2126PenyiapanSpt);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveEBupot2126PenyiapanSpt = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    // 01.) Find Tanggal Tagihan Pemotongan
    let tanggalTagihanPemotongan = new Date();

    // 03.) Cari Bulan
    let masaPajak = getMonthIndex(req.body.masaPajak);

    const insertedEBupot2126PenyiapanSpt = await EBupot2126PenyiapanSpt.create(
      {
        ...req.body,
        userEBupot2126PenyiapanSptId: req.body.userId,
        tanggalTagihanPemotongan,
        masaPajak,
        cabangId: req.body.kodeCabang,
      },
      { transaction }
    );

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(insertedEBupot2126PenyiapanSpt);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const kirimSptEBupot2126PenyiapanSpt = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    let eBupot2126PenyiapanSpt = await EBupot2126PenyiapanSpt.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: User },
        { model: EBupot2126Penandatangan },
        { model: Cabang },
      ],
      transaction,
    });

    if (eBupot2126PenyiapanSpt.noBpeNtte.length === 0) {
      // Kirim Spt
      let tempNoBpeNtte = generateRandomNumberString(20);

      let updatedEBupot2126PenyiapanSpt = await EBupot2126PenyiapanSpt.update(
        {
          noBpeNtte: tempNoBpeNtte,
          tanggalKirim: new Date(),
        },
        {
          where: {
            id: req.params.id,
          },
          transaction,
        }
      );
    } else {
      // Pembetulan Ke Spt
      await EBupot2126PenyiapanSpt.increment("pembetulanKe", {
        by: 1,
        where: {
          id: req.params.id,
        },
        transaction,
      });

      let updatedEBupot2126PenyiapanSpt = await EBupot2126PenyiapanSpt.update(
        {
          tanggalKirim: new Date(),
        },
        {
          where: {
            id: req.params.id,
          },
          transaction,
        }
      );
    }

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json("Spt Terkirim!");
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const ajukanUnduhBuktiPotongEBupot2126PenyiapanSpt = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    let updatedEBupot2126PenyiapanSpt = await EBupot2126PenyiapanSpt.update(
      {
        ajukanUnduhBuktiPotong: true,
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
    res.status(201).json("Unduh Bukti Potong Terajukan!");
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateEBupot2126PenyiapanSpt = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  let transaction;
  try {
    transaction = await sequelize.transaction();

    // 01.) Find EBupot2126Penandatangan
    let findPenandatangan = await EBupot2126Penandatangan.findOne({
      where: {
        userPenandatanganId: req.body.userId,
        namaIdentitas: req.body.namaIdentitas,
      },
    });

    // 02.) Update E-Bupot 2126 Penyiapan Spt
    let updatedEBupot2126PenyiapanSpt = await EBupot2126PenyiapanSpt.update(
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

    // 03.) Update E-Bupot 2126 Posting
    const eBupot2126Postings = Object.entries(req.body.eBupot2126Posting).map(
      ([id, values]) => ({
        id,
        ...values,
      })
    );

    for (let eBupot2126Posting of eBupot2126Postings) {
      await EBupot2126Posting.update(
        {
          jumlahDpp: eBupot2126Posting.jumlahDpp,
          jumlahPph: eBupot2126Posting.jumlahPph,
        },
        {
          where: {
            id: eBupot2126Posting.id,
          },
          transaction,
        }
      );
    }

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json(updatedEBupot2126PenyiapanSpt);
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteEBupot2126PenyiapanSpt = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    await EBupot2126PenyiapanSpt.destroy({
      where: {
        id: req.params.id,
      },
      transaction,
    });

    // Status 201 = Created
    await transaction.commit();
    res.status(201).json({ message: "E-Bupot 2126 Penyiapan Spt Deleted!" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEBupot2126PenyiapanSpts,
  getEBupot2126PenyiapanSptsPagination,
  getEBupot2126PenyiapanSptsByUserPagination,
  // getEBupot2126PenyiapanSptsByUserSearchPagination,
  // getEBupot2126PenyiapanSptsTerkirimByUserSearchPagination,
  getEBupot2126PenyiapanSptById,
  saveEBupot2126PenyiapanSpt,
  kirimSptEBupot2126PenyiapanSpt,
  ajukanUnduhBuktiPotongEBupot2126PenyiapanSpt,
  updateEBupot2126PenyiapanSpt,
  deleteEBupot2126PenyiapanSpt,
};
