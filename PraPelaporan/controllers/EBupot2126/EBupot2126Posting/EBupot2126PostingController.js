const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupot2126Pph21 = require("../../../models/EBupot2126/EBupot2126Pph21/EBupot2126Pph21Model.js");
const EBupot2126Pph21Tahunan = require("../../../models/EBupot2126/EBupot2126Pph21Tahunan/EBupot2126Pph21TahunanModel.js");
const EBupot2126Pph26 = require("../../../models/EBupot2126/EBupot2126Pph26/EBupot2126Pph26Model.js");
const User = require("../../../../User/models/UserModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const EBupot2126Penandatangan = require("../../../models/EBupot2126/Penandatangan/EBupot2126PenandatanganModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
const {
  findNextKode,
  formatDate,
  getMonthIndex,
} = require("../../../../helper/helper");
const EBilling = require("../../../../EBilling/models/EBilling/EBillingModel.js");
const Tahun = require("../../../../Master/models/Tahun/TahunModel.js");
const Negara = require("../../../../Master/models/Negara/NegaraModel.js");
const EBupot2126TagihanPemotongan = require("../../../models/EBupot2126/EBupot2126TagihanPemotongan/EBupot2126TagihanPemotonganModel.js");
const EBupot2126PenyiapanSpt = require("../../../models/EBupot2126/EBupot2126PenyiapanSpt/EBupot2126PenyiapanSptModel.js");
const EBupot2126Posting = require("../../../models/EBupot2126/EBupot2126Posting/EBupot2126PostingModel.js");
const JenisSetoran = require("../../../../Master/models/JenisSetoran/JenisSetoranModel.js");
const JenisPajak = require("../../../../Master/models/JenisPajak/JenisPajakModel.js");

const eBupot2126Posting = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction(); // Start the transaction
    let tahun = req.body.tahunPajak;
    let bulan = getMonthIndex(req.body.masaPajak);

    let tempWhereEBupot2126PenyiapanSpt = {
      masaPajak: bulan,
      tahunPajak: tahun,
    };

    let findEBupot2126PenyiapanSpt = await EBupot2126PenyiapanSpt.findOne({
      where: tempWhereEBupot2126PenyiapanSpt,
      transaction, // Use transaction here
    });

    if (!findEBupot2126PenyiapanSpt) {
      // Find Tanggal Tagihan Pemotongan
      let tanggalTagihanPemotongan = new Date();

      findEBupot2126PenyiapanSpt = await EBupot2126PenyiapanSpt.create(
        {
          tanggalTagihanPemotongan,
          userEBupot2126PenyiapanSptId: req.body.userId,
          masaPajak: bulan,
          tahunPajak: tahun,
          pembetulanKe: 0,
          statusSpt: "Draft",
          keteranganSpt: "",
          userIdInput: req.body.userId,
          cabangId: req.body.kodeCabang,
        },
        { transaction }
      );
    }

    // Update All Tagihan Pemotongan in Periode
    let tempWhereTagihanPemotongan = {
      masaPajak: bulan,
      tahunPajak: tahun,
    };

    await EBupot2126TagihanPemotongan.update(
      {
        pphYangDipotong: 0,
      },
      {
        where: tempWhereTagihanPemotongan,
        transaction, // Ensure transaction is used
      }
    );

    // Delete Posting in Periode
    let tempWhereEBupot2126Posting = {
      masaPajak: bulan,
      tahunPajak: tahun,
    };

    await EBupot2126Posting.destroy({
      where: tempWhereEBupot2126Posting,
      transaction,
    });

    // Create EBupot2126Posting
    const objekPajaks = await ObjekPajak.findAll({
      where: {
        isBupot2126: true,
      },
      order: [["kodeObjekPajak", "ASC"]],
    });

    let tempNewEBupot2126Posting = [];
    for (let objekPajak of objekPajaks) {
      let objectEBupot2126Posting = {
        tanggalEBupot2126Posting: new Date(),
        userEBupot2126PostingId: req.body.userIdInput,
        masaPajak: bulan,
        tahunPajak: tahun,
        ebupot2126PenyiapanSptId: findEBupot2126PenyiapanSpt.id,
        objekPajakId: objekPajak.id,
        jumlahPenerimaPenghasilan: 0,
        jumlahDpp: 0,
        jumlahPph: 0,
        userIdInput: req.body.userId,
        cabangId: req.body.kodeCabang,
      };

      tempNewEBupot2126Posting.push(objectEBupot2126Posting);
    }
    await EBupot2126Posting.bulkCreate(tempNewEBupot2126Posting, {
      transaction,
    });

    // 01.) Posting EBupot2126Pph21
    const eBupot2126Pph21s = await EBupot2126Pph21.findAll({
      where: {
        userEBupot2126Pph21Id: req.body.userId,
        isHapus: false,
        [Op.and]: [
          {
            bulanPajak: bulan,
          },
          {
            tahunPajak: tahun,
          },
        ],
      },
      include: [
        { model: User },
        { model: EBupot2126Penandatangan },
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
      transaction, // Add transaction here
    });

    // Extract the IDs of the matching records
    const idsToUpdateEBupot2126Pph21 = eBupot2126Pph21s.map(
      (record) => record.id
    );

    await EBupot2126Pph21.update(
      {
        isPost: true,
      },
      {
        where: {
          id: idsToUpdateEBupot2126Pph21,
        },
        transaction, // Ensure transaction is used
      }
    );

    // Posting ke Tagihan Pemotongan
    for (let eBupot2126Pph21 of eBupot2126Pph21s) {
      let tempWhereTagihanPemotongan = {
        // objekPajakId: eBupot2126Pph21.objekPajakId,
        jenisSetoranId: eBupot2126Pph21.objekpajak.jenissetoran.id,
        masaPajak: eBupot2126Pph21.bulanPajak,
        tahunPajak: eBupot2126Pph21.tahunPajak,
      };

      let findEBupot2126TagihanPemotongan =
        await EBupot2126TagihanPemotongan.findOne({
          where: tempWhereTagihanPemotongan,
          transaction, // Use transaction here
        });

      if (!findEBupot2126TagihanPemotongan) {
        // Save Tagihan Pemotongan
        let dataTagihanPemotongan = {
          jenis: "PPh 21",
          tanggalTagihanPemotongan: new Date(),
          userEBupot2126TagihanPemotonganId: req.body.userId,
          ebupot2126PenyiapanSptId: findEBupot2126PenyiapanSpt.id,
          nop: "",
          jenisSetoranId: eBupot2126Pph21.objekpajak.jenissetoran.id,
          masaPajak: eBupot2126Pph21.bulanPajak,
          tahunPajak: eBupot2126Pph21.tahunPajak,
          nomorKetetapan: "",
          pphYangDipotong: eBupot2126Pph21.pPhYangDipotongDipungut,
          pphYangDisetor: 0,
          uraian: "",
          npwpPenyetor: eBupot2126Pph21.user.npwp15,
          nitkuPenyetor: eBupot2126Pph21.user.nitku,
          namaPenyetor: eBupot2126Pph21.user.nama,
          idBilling: "",
          masaAktifKodeBilling: null,
          userIdInput: req.body.userId,
          cabangId: req.body.kodeCabang,
        };

        await EBupot2126TagihanPemotongan.create(dataTagihanPemotongan, {
          transaction, // Insert within the transaction
        });
      } else {
        // Update Increment Tagihan Pemotongan
        await EBupot2126TagihanPemotongan.increment(
          {
            pphYangDipotong: eBupot2126Pph21.pPhYangDipotongDipungut,
          },
          {
            where: {
              id: findEBupot2126TagihanPemotongan.id,
            },
            transaction, // Ensure transaction is used
          }
        );
      }

      // Update Increment EBupot2126Posting
      await EBupot2126Posting.increment(
        {
          jumlahPenerimaPenghasilan: 1,
          jumlahDpp: eBupot2126Pph21.jumlahPenghasilan,
          jumlahPph: eBupot2126Pph21.pPhYangDipotongDipungut,
        },
        {
          where: {
            masaPajak: bulan,
            tahunPajak: tahun,
            objekPajakId: eBupot2126Pph21.objekpajak.id,
          },
          transaction, // Ensure transaction is used
        }
      );
    }

    // 02.) Posting EBupot2126Pph21Tahunan
    const eBupot2126Pph21Tahunans = await EBupot2126Pph21Tahunan.findAll({
      where: {
        userEBupot2126Pph21TahunanId: req.body.userId,
        isHapus: false,
        [Op.and]: [
          {
            bulanPajakAwal: {
              [Op.lte]: bulan,
            },
          },
          {
            bulanPajakAkhir: {
              [Op.gte]: bulan,
            },
          },
          {
            tahunPajak: tahun,
          },
        ],
      },
      include: [
        { model: User },
        { model: EBupot2126Penandatangan },
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
      transaction, // Add transaction here
    });

    // Extract the IDs of the matching records
    const idsToUpdateEBupot2126Pph21Tahunan = eBupot2126Pph21Tahunans.map(
      (record) => record.id
    );

    await EBupot2126Pph21Tahunan.update(
      {
        isPost: true,
      },
      {
        where: {
          id: idsToUpdateEBupot2126Pph21Tahunan,
        },
        transaction, // Ensure transaction is used
      }
    );

    // Posting ke Tagihan Pemotongan
    for (let eBupot2126Pph21Tahunan of eBupot2126Pph21Tahunans) {
      let tempWhereTagihanPemotongan = {
        // objekPajakId: eBupot2126Pph21Tahunan.objekPajakId,
        jenisSetoranId: eBupot2126Pph21Tahunan.objekpajak.jenissetoran.id,
        masaPajak: eBupot2126Pph21Tahunan.bulanPajakAkhir,
        tahunPajak: eBupot2126Pph21Tahunan.tahunPajak,
      };

      let findEBupot2126TagihanPemotongan =
        await EBupot2126TagihanPemotongan.findOne({
          where: tempWhereTagihanPemotongan,
          transaction, // Use transaction here
        });

      if (!findEBupot2126TagihanPemotongan) {
        // Save Tagihan Pemotongan
        let dataTagihanPemotongan = {
          jenis: "PPh 21 Tahunan",
          tanggalTagihanPemotongan: new Date(),
          userEBupot2126TagihanPemotonganId: req.body.userId,
          ebupot2126PenyiapanSptId: findEBupot2126PenyiapanSpt.id,
          nop: "",
          jenisSetoranId: eBupot2126Pph21Tahunan.objekpajak.jenissetoran.id,
          masaPajak: eBupot2126Pph21Tahunan.bulanPajakAkhir,
          tahunPajak: eBupot2126Pph21Tahunan.tahunPajak,
          nomorKetetapan: "",
          pphYangDipotong:
            eBupot2126Pph21Tahunan.pph21KurangLebihBayarMasaPajakTerakhir,
          pphYangDisetor: 0,
          uraian: "",
          npwpPenyetor: eBupot2126Pph21Tahunan.user.npwp15,
          nitkuPenyetor: eBupot2126Pph21Tahunan.user.nitku,
          namaPenyetor: eBupot2126Pph21Tahunan.user.nama,
          idBilling: "",
          masaAktifKodeBilling: null,
          userIdInput: req.body.userId,
          cabangId: req.body.kodeCabang,
        };

        await EBupot2126TagihanPemotongan.create(dataTagihanPemotongan, {
          transaction, // Insert within the transaction
        });
      } else {
        // Update Increment Tagihan Pemotongan
        await EBupot2126TagihanPemotongan.increment(
          {
            pphYangDipotong:
              eBupot2126Pph21Tahunan.pph21KurangLebihBayarMasaPajakTerakhir,
          },
          {
            where: {
              id: findEBupot2126TagihanPemotongan.id,
            },
            transaction, // Ensure transaction is used
          }
        );
      }

      // // Update Increment EBupot2126Posting
      // await EBupot2126Posting.increment(
      //   {
      //     jumlahDpp: eBupot2126Pph21.jumlahPenghasilan,
      //     jumlahPph: eBupot2126Pph21.pPhYangDipotongDipungut,
      //   },
      //   {
      //     where: {
      //       masaPajak: bulan,
      //       tahunPajak: tahun,
      //       objekPajakId: eBupot2126Pph21.objekpajak.id,
      //     },
      //     transaction, // Ensure transaction is used
      //   }
      // );
    }

    // 03.) Posting EBupot2126Pph26
    const eBupot2126Pph26s = await EBupot2126Pph26.findAll({
      where: {
        userEBupot2126Pph26Id: req.body.userId,
        isHapus: false,
        [Op.and]: [
          {
            bulanPajak: bulan,
          },
          {
            tahunPajak: tahun,
          },
        ],
      },
      include: [
        { model: User },
        { model: EBupot2126Penandatangan },
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
      transaction, // Add transaction here
    });

    // Extract the IDs of the matching records
    const idsToUpdateEBupot2126Pph26 = eBupot2126Pph26s.map(
      (record) => record.id
    );

    await EBupot2126Pph26.update(
      {
        isPost: true,
      },
      {
        where: {
          id: idsToUpdateEBupot2126Pph26,
        },
        transaction, // Ensure transaction is used
      }
    );

    // Posting ke Tagihan Pemotongan
    for (let eBupot2126Pph26 of eBupot2126Pph26s) {
      let tempWhereTagihanPemotongan = {
        // objekPajakId: eBupot2126Pph26.objekPajakId,
        jenisSetoranId: eBupot2126Pph26.objekpajak.jenissetoran.id,
        masaPajak: eBupot2126Pph26.bulanPajak,
        tahunPajak: eBupot2126Pph26.tahunPajak,
      };

      let findEBupot2126TagihanPemotongan =
        await EBupot2126TagihanPemotongan.findOne({
          where: tempWhereTagihanPemotongan,
          transaction, // Use transaction here
        });

      if (!findEBupot2126TagihanPemotongan) {
        // Save Tagihan Pemotongan
        let dataTagihanPemotongan = {
          jenis: "PPh 26",
          tanggalTagihanPemotongan: new Date(),
          userEBupot2126TagihanPemotonganId: req.body.userId,
          ebupot2126PenyiapanSptId: findEBupot2126PenyiapanSpt.id,
          nop: "",
          jenisSetoranId: eBupot2126Pph26.objekpajak.jenissetoran.id,
          masaPajak: eBupot2126Pph26.bulanPajak,
          tahunPajak: eBupot2126Pph26.tahunPajak,
          nomorKetetapan: "",
          pphYangDipotong: eBupot2126Pph26.pPhYangDipotongDipungut,
          pphYangDisetor: 0,
          uraian: "",
          npwpPenyetor: eBupot2126Pph26.user.npwp15,
          nitkuPenyetor: eBupot2126Pph26.user.nitku,
          namaPenyetor: eBupot2126Pph26.user.nama,
          idBilling: "",
          masaAktifKodeBilling: null,
          userIdInput: req.body.userId,
          cabangId: req.body.kodeCabang,
        };

        await EBupot2126TagihanPemotongan.create(dataTagihanPemotongan, {
          transaction, // Insert within the transaction
        });
      } else {
        // Update Increment Tagihan Pemotongan
        await EBupot2126TagihanPemotongan.increment(
          {
            pphYangDipotong: eBupot2126Pph26.pPhYangDipotongDipungut,
          },
          {
            where: {
              id: findEBupot2126TagihanPemotongan.id,
            },
            transaction, // Ensure transaction is used
          }
        );
      }

      // Update Increment EBupot2126Posting
      await EBupot2126Posting.increment(
        {
          jumlahPenerimaPenghasilan: 1,
          jumlahDpp: eBupot2126Pph26.jumlahPenghasilanBruto,
          jumlahPph: eBupot2126Pph26.pPhYangDipotongDipungut,
        },
        {
          where: {
            masaPajak: bulan,
            tahunPajak: tahun,
            objekPajakId: eBupot2126Pph26.objekpajak.id,
          },
          transaction, // Ensure transaction is used
        }
      );
    }

    // Commit the transaction
    await transaction.commit();
    res.status(200).json(eBupot2126Pph21s);
  } catch (error) {
    // Rollback transaction in case of error
    if (transaction) {
      await transaction.rollback();
    }
    res.status(500).json({ message: error.message });
  }
};

const getEBupot2126PostingsByUserSearchPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let tempWhere = {
    userEBupot2126PostingId: req.body.userEBupot2126PostingId,
    jumlahDpp: {
      [Op.gt]: 0,
    },
    [Op.and]: [
      {
        masaPajak: getMonthIndex(req.body.masaPajak),
      },
      {
        tahunPajak: req.body.tahunPajak,
      },
    ],
  };
  let tempInclude = [
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
  ];

  const totalRows = await EBupot2126Posting.count({
    where: tempWhere,
    include: tempInclude,
  });
  const totalPage = Math.ceil(totalRows / limit);
  try {
    const eBupot2126Postings = await EBupot2126Posting.findAll({
      where: tempWhere,
      include: tempInclude,
      offset: offset,
      limit: limit,
    });
    res.status(200).json({
      eBupot2126Postings,
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

const getEBupot2126PostingsMasaTahunPajak = async (req, res) => {
  let tempWhere = {
    userEBupot2126PostingId: req.body.userEBupot2126PostingId,
    [Op.and]: [
      {
        masaPajak: req.body.masaPajak,
      },
      {
        tahunPajak: req.body.tahunPajak,
      },
    ],
  };
  let tempInclude = [{ model: User }, { model: ObjekPajak }, { model: Cabang }];

  try {
    const eBupot2126Postings = await EBupot2126Posting.findAll({
      where: tempWhere,
      include: tempInclude,
    });

    let finalEBupot2126Posting = [];
    for (let eBupot2126Posting of eBupot2126Postings) {
      if (eBupot2126Posting.objekpajak.kodeObjekPajak === "21-100-01") {
        const objekPajak = await ObjekPajak.findOne({
          where: {
            kodeObjekPajak: "21-100-01",
          },
        });

        // 01.) Find Pajak Tahunan
        let tempWhereTahunan = {
          userEBupot2126Pph21TahunanId: req.body.userEBupot2126PostingId,
          tahunPajak: req.body.tahunPajak,
          objekPajakId: objekPajak.id,
        };
        let tempIncludeTahunan = [
          { model: User },
          { model: ObjekPajak },
          { model: Negara },
          { model: EBupot2126Penandatangan },
          { model: Cabang },
        ];

        const eBupot2126Pph21Tahunans = await EBupot2126Pph21Tahunan.findAll({
          where: tempWhereTahunan,
          include: tempIncludeTahunan,
        });

        let jumlahDpp = 0;
        let jumlahPph = 0;
        for (let eBupot2126Pph21Tahunan of eBupot2126Pph21Tahunans) {
          jumlahDpp += eBupot2126Pph21Tahunan.jumlahPenghasilanBruto1sd7;
          jumlahPph +=
            eBupot2126Pph21Tahunan.pph21KurangLebihBayarMasaPajakTerakhir;
        }

        // 02.) Find Pajak Bulanan
        let tempWhereBulanan = {
          userEBupot2126Pph21Id: req.body.userEBupot2126PostingId,
          [Op.and]: [
            {
              bulanPajak: req.body.masaPajak,
            },
            {
              tahunPajak: req.body.tahunPajak,
            },
          ],
          [Op.or]: [
            {
              "$objekpajak.kodeObjekPajak$": "21-100-01",
            },
          ],
        };
        let tempIncludeBulanan = [
          { model: User },
          { model: EBupot2126Penandatangan },
          { model: ObjekPajak, as: "objekpajak" },
          { model: Cabang },
        ];

        const eBupot2126Pph21s = await EBupot2126Pph21.findAll({
          where: tempWhereBulanan,
          include: tempIncludeBulanan,
        });

        for (let eBupot2126Pph21 of eBupot2126Pph21s) {
          jumlahDpp += eBupot2126Pph21.jumlahPenghasilan;
          jumlahPph += eBupot2126Pph21.pPhYangDipotongDipungut;
        }

        let objectPosting = {
          ...eBupot2126Posting.dataValues,
          jumlahDpp,
          jumlahPph,
        };
        finalEBupot2126Posting.push(objectPosting);
      } else if (eBupot2126Posting.objekpajak.kodeObjekPajak === "21-100-02") {
        const objekPajak = await ObjekPajak.findOne({
          where: {
            kodeObjekPajak: "21-100-02",
          },
        });

        // 01.) Find Pajak Tahunan
        let tempWhereTahunan = {
          userEBupot2126Pph21TahunanId: req.body.userEBupot2126PostingId,
          tahunPajak: req.body.tahunPajak,
          objekPajakId: objekPajak.id,
        };
        let tempIncludeTahunan = [
          { model: User },
          { model: ObjekPajak },
          { model: Negara },
          { model: EBupot2126Penandatangan },
          { model: Cabang },
        ];

        const eBupot2126Pph21Tahunans = await EBupot2126Pph21Tahunan.findAll({
          where: tempWhereTahunan,
          include: tempIncludeTahunan,
        });

        let jumlahDpp = 0;
        let jumlahPph = 0;
        for (let eBupot2126Pph21Tahunan of eBupot2126Pph21Tahunans) {
          jumlahDpp += eBupot2126Pph21Tahunan.jumlahPenghasilanBruto1sd7;
          jumlahPph +=
            eBupot2126Pph21Tahunan.pph21KurangLebihBayarMasaPajakTerakhir;
        }

        // 02.) Find Pajak Bulanan
        let tempWhereBulanan = {
          userEBupot2126Pph21Id: req.body.userEBupot2126PostingId,
          [Op.and]: [
            {
              bulanPajak: req.body.masaPajak,
            },
            {
              tahunPajak: req.body.tahunPajak,
            },
          ],
          [Op.or]: [
            {
              "$objekpajak.kodeObjekPajak$": "21-100-02",
            },
          ],
        };
        let tempIncludeBulanan = [
          { model: User },
          { model: EBupot2126Penandatangan },
          { model: ObjekPajak, as: "objekpajak" },
          { model: Cabang },
        ];

        const eBupot2126Pph21s = await EBupot2126Pph21.findAll({
          where: tempWhereBulanan,
          include: tempIncludeBulanan,
        });

        for (let eBupot2126Pph21 of eBupot2126Pph21s) {
          jumlahDpp += eBupot2126Pph21.jumlahPenghasilan;
          jumlahPph += eBupot2126Pph21.pPhYangDipotongDipungut;
        }

        let objectPosting = {
          ...eBupot2126Posting.dataValues,
          jumlahDpp,
          jumlahPph,
        };
        finalEBupot2126Posting.push(objectPosting);
      } else {
        finalEBupot2126Posting.push({
          ...eBupot2126Posting.dataValues,
        });
      }
    }

    // res.status(200).json(eBupot2126Postings);
    res.status(200).json(finalEBupot2126Posting);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  eBupot2126Posting,
  getEBupot2126PostingsByUserSearchPagination,
  getEBupot2126PostingsMasaTahunPajak,
};
