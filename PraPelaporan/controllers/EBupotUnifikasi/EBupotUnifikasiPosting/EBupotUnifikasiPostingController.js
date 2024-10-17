const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../../config/Database.js");
const Op = sequelize.Sequelize.Op;
const EBupotUnifikasiPphDisetorSendiri = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPphDisetorSendiri/EBupotUnifikasiPphDisetorSendiriModel.js");
const EBupotUnifikasiPph42152223 = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPph42152223/EBupotUnifikasiPph42152223Model.js");
const EBupotUnifikasiPphNonResiden = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPphNonResiden/EBupotUnifikasiPphNonResidenModel.js");
const User = require("../../../../User/models/UserModel.js");
const ObjekPajak = require("../../../../Master/models/ObjekPajak/ObjekPajakModel.js");
const Penandatangan = require("../../../models/Penandatangan/PenandatanganModel.js");
const Cabang = require("../../../../Master/models/Cabang/CabangModel.js");
const {
  findNextKode,
  formatDate,
  getMonthIndex,
} = require("../../../../helper/helper");
const EBilling = require("../../../../EBilling/models/EBilling/EBillingModel.js");
const Tahun = require("../../../../Master/models/Tahun/TahunModel.js");
const Negara = require("../../../../Master/models/Negara/NegaraModel.js");
const EBupotUnifikasiTagihanPemotongan = require("../../../models/EBupotUnifikasi/EBupotUnifikasiTagihanPemotongan/EBupotUnifikasiTagihanPemotonganModel.js");
const EBupotUnifikasiPenyiapanSpt = require("../../../models/EBupotUnifikasi/EBupotUnifikasiPenyiapanSpt/EBupotUnifikasiPenyiapanSptModel.js");

const eBupotUnifikasiPosting = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction(); // Start the transaction
    let tahun = req.body.tahunPajak;
    let bulan = getMonthIndex(req.body.masaPajak);

    let tempWhereEBupotUnifikasiPenyiapanSpt = {
      masaPajak: bulan,
      tahunPajak: tahun,
    };

    let findEBupotUnifikasiPenyiapanSpt =
      await EBupotUnifikasiPenyiapanSpt.findOne({
        where: tempWhereEBupotUnifikasiPenyiapanSpt,
        transaction, // Use transaction here
      });

    if (!findEBupotUnifikasiPenyiapanSpt) {
      // Find Tanggal Tagihan Pemotongan
      let tanggalTagihanPemotongan = new Date();

      findEBupotUnifikasiPenyiapanSpt =
        await EBupotUnifikasiPenyiapanSpt.create(
          {
            tanggalTagihanPemotongan,
            userEBupotUnifikasiPenyiapanSptId: req.body.userId,
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

    // Delete All Tagihan Pemotongan in Periode
    let tempWhereTagihanPemotongan = {
      masaPajak: bulan,
      tahunPajak: tahun,
    };

    await EBupotUnifikasiTagihanPemotongan.update(
      {
        pphYangDipotong: 0,
      },
      {
        where: tempWhereTagihanPemotongan,
        transaction, // Ensure transaction is used
      }
    );

    // Delete All Tagihan Pemotongan in Periode PphDisetorSendiri
    let tempWhereTagihanPemotonganPphDisetorSendiri = {
      masaPajak: bulan,
      tahunPajak: tahun,
      jenis: "PphDisetorSendiri",
    };

    await EBupotUnifikasiTagihanPemotongan.update(
      {
        pphYangDipotong: 0,
        pphYangDisetor: 0,
      },
      {
        where: tempWhereTagihanPemotonganPphDisetorSendiri,
        transaction, // Ensure transaction is used
      }
    );

    // 01.) Posting EBupotUnifikasiPphDisetorSendiri
    let tempWhereEBupotUnifikasiPphDisetorSendiri = {
      userEBupotUnifikasiPphDisetorSendiriId: req.body.userId,
      isHapus: false,
      [Op.and]: [
        {
          "$ebilling.masaPajakDariBulan$": bulan,
        },
        {
          "$ebilling.tahun.tahun$": tahun,
        },
      ],
    };
    let tempIncludeEBupotUnifikasiPphDisetorSendiri = [
      { model: User },
      {
        model: EBilling,
        as: "ebilling",
        include: [{ model: Tahun, as: "tahun" }],
      },
      { model: ObjekPajak },
      { model: Cabang },
    ];

    // Fetch data inside transaction
    const eBupotUnifikasiPphDisetorSendiris =
      await EBupotUnifikasiPphDisetorSendiri.findAll({
        where: tempWhereEBupotUnifikasiPphDisetorSendiri,
        include: tempIncludeEBupotUnifikasiPphDisetorSendiri,
        transaction, // Include transaction here
      });

    // Extract the IDs of the matching records
    const idsToUpdateEBupotUnifikasiPphDisetorSendiri =
      eBupotUnifikasiPphDisetorSendiris.map((record) => record.id);

    // Perform the update with transaction
    await EBupotUnifikasiPphDisetorSendiri.update(
      {
        isPost: true,
      },
      {
        where: {
          id: idsToUpdateEBupotUnifikasiPphDisetorSendiri,
        },
        transaction, // Ensure transaction is used
      }
    );

    // Posting ke Tagihan Pemotongan
    for (let eBupotUnifikasiPphDisetorSendiri of eBupotUnifikasiPphDisetorSendiris) {
      let tempWhereTagihanPemotongan = {
        objekPajakId: eBupotUnifikasiPphDisetorSendiri.objekPajakId,
        masaPajak: eBupotUnifikasiPphDisetorSendiri.ebilling.masaPajakDariBulan,
        tahunPajak: eBupotUnifikasiPphDisetorSendiri.ebilling.tahun.tahun,
      };

      let findEBupotUnifikasiTagihanPemotongan =
        await EBupotUnifikasiTagihanPemotongan.findOne({
          where: tempWhereTagihanPemotongan,
          transaction, // Use transaction here
        });

      if (!findEBupotUnifikasiTagihanPemotongan) {
        // Save Tagihan Pemotongan
        let dataTagihanPemotongan = {
          jenis: "PphDisetorSendiri",
          tanggalTagihanPemotongan: new Date(),
          userEBupotUnifikasiTagihanPemotonganId: req.body.userIdInput,
          ebupotUnifikasiPenyiapanSptId: findEBupotUnifikasiPenyiapanSpt.id,
          nop: "",
          objekPajakId: eBupotUnifikasiPphDisetorSendiri.objekPajakId,
          masaPajak:
            eBupotUnifikasiPphDisetorSendiri.ebilling.masaPajakDariBulan,
          tahunPajak: eBupotUnifikasiPphDisetorSendiri.ebilling.tahun.tahun,
          nomorKetetapan: "",
          pphYangDipotong:
            eBupotUnifikasiPphDisetorSendiri.ebilling.jumlahSetor,
          pphYangDisetor: eBupotUnifikasiPphDisetorSendiri.ebilling.jumlahSetor,
          uraian: "",
          npwpPenyetor: eBupotUnifikasiPphDisetorSendiri.user.npwp15,
          nitkuPenyetor: eBupotUnifikasiPphDisetorSendiri.user.nitku,
          namaPenyetor: eBupotUnifikasiPphDisetorSendiri.user.nama,
          idBilling: "",
          masaAktifKodeBilling: null,
          userIdInput: req.body.userId,
          cabangId: req.body.kodeCabang,
        };

        await EBupotUnifikasiTagihanPemotongan.create(dataTagihanPemotongan, {
          transaction, // Insert within the transaction
        });
      } else {
        // Update Increment Tagihan Pemotongan
        await EBupotUnifikasiTagihanPemotongan.increment(
          {
            pphYangDipotong:
              eBupotUnifikasiPphDisetorSendiri.ebilling.jumlahSetor,
            pphYangDisetor:
              eBupotUnifikasiPphDisetorSendiri.ebilling.jumlahSetor,
          },
          {
            where: {
              id: findEBupotUnifikasiTagihanPemotongan.id,
            },
            transaction, // Ensure transaction is used
          }
        );
      }
    }

    // 02.) Posting EBupotUnifikasiPph42152223
    const eBupotUnifikasiPph42152223s =
      await EBupotUnifikasiPph42152223.findAll({
        where: {
          userEBupotUnifikasiPph42152223Id: req.body.userId,
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
          { model: Penandatangan },
          { model: ObjekPajak },
          { model: Cabang },
        ],
        transaction, // Add transaction here
      });

    // Extract the IDs of the matching records
    const idsToUpdateEBupotUnifikasiPph42152223 =
      eBupotUnifikasiPph42152223s.map((record) => record.id);

    await EBupotUnifikasiPph42152223.update(
      {
        isPost: true,
      },
      {
        where: {
          id: idsToUpdateEBupotUnifikasiPph42152223,
        },
        transaction, // Ensure transaction is used
      }
    );

    // Posting ke Tagihan Pemotongan
    for (let eBupotUnifikasiPph42152223 of eBupotUnifikasiPph42152223s) {
      let tempWhereTagihanPemotongan = {
        objekPajakId: eBupotUnifikasiPph42152223.objekPajakId,
        masaPajak: eBupotUnifikasiPph42152223.bulanPajak,
        tahunPajak: eBupotUnifikasiPph42152223.tahunPajak,
      };

      let findEBupotUnifikasiTagihanPemotongan =
        await EBupotUnifikasiTagihanPemotongan.findOne({
          where: tempWhereTagihanPemotongan,
          transaction, // Use transaction here
        });

      if (!findEBupotUnifikasiTagihanPemotongan) {
        // Save Tagihan Pemotongan
        let dataTagihanPemotongan = {
          jenis: "Pph42152223",
          tanggalTagihanPemotongan: new Date(),
          userEBupotUnifikasiTagihanPemotonganId: req.body.userId,
          ebupotUnifikasiPenyiapanSptId: findEBupotUnifikasiPenyiapanSpt.id,
          nop: "",
          objekPajakId: eBupotUnifikasiPph42152223.objekPajakId,
          masaPajak: eBupotUnifikasiPph42152223.bulanPajak,
          tahunPajak: eBupotUnifikasiPph42152223.tahunPajak,
          nomorKetetapan: "",
          pphYangDipotong: eBupotUnifikasiPph42152223.pPhYangDipotongDipungut,
          pphYangDisetor: 0,
          uraian: "",
          npwpPenyetor: eBupotUnifikasiPph42152223.user.npwp15,
          nitkuPenyetor: eBupotUnifikasiPph42152223.user.nitku,
          namaPenyetor: eBupotUnifikasiPph42152223.user.nama,
          idBilling: "",
          masaAktifKodeBilling: null,
          userIdInput: req.body.userId,
          cabangId: req.body.kodeCabang,
        };

        await EBupotUnifikasiTagihanPemotongan.create(dataTagihanPemotongan, {
          transaction, // Insert within the transaction
        });
      } else {
        // Update Increment Tagihan Pemotongan
        await EBupotUnifikasiTagihanPemotongan.increment(
          {
            pphYangDipotong: eBupotUnifikasiPph42152223.pPhYangDipotongDipungut,
          },
          {
            where: {
              id: findEBupotUnifikasiTagihanPemotongan.id,
            },
            transaction, // Ensure transaction is used
          }
        );
      }
    }

    // 03.) Posting EBupotUnifikasiPphNonResiden
    const eBupotUnifikasiPphNonResidens =
      await EBupotUnifikasiPphNonResiden.findAll({
        where: {
          userEBupotUnifikasiPphNonResidenId: req.body.userId,
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
          { model: Negara },
          { model: Penandatangan },
          { model: ObjekPajak },
          { model: Cabang },
        ],
        transaction, // Add transaction here
      });

    // Extract the IDs of the matching records
    const idsToUpdateEBupotUnifikasiPphNonResiden =
      eBupotUnifikasiPphNonResidens.map((record) => record.id);

    await EBupotUnifikasiPphNonResiden.update(
      {
        isPost: true,
      },
      {
        where: {
          id: idsToUpdateEBupotUnifikasiPphNonResiden,
        },
        transaction, // Ensure transaction is used
      }
    );

    // Posting ke Tagihan Pemotongan
    for (let eBupotUnifikasiPphNonResiden of eBupotUnifikasiPphNonResidens) {
      let tempWhereTagihanPemotongan = {
        objekPajakId: eBupotUnifikasiPphNonResiden.objekPajakId,
        masaPajak: eBupotUnifikasiPphNonResiden.bulanPajak,
        tahunPajak: eBupotUnifikasiPphNonResiden.tahunPajak,
      };

      let findEBupotUnifikasiTagihanPemotongan =
        await EBupotUnifikasiTagihanPemotongan.findOne({
          where: tempWhereTagihanPemotongan,
          transaction, // Use transaction here
        });

      if (!findEBupotUnifikasiTagihanPemotongan) {
        // Save Tagihan Pemotongan
        let dataTagihanPemotongan = {
          jenis: "PphNonResiden",
          tanggalTagihanPemotongan: new Date(),
          userEBupotUnifikasiTagihanPemotonganId: req.body.userId,
          ebupotUnifikasiPenyiapanSptId: findEBupotUnifikasiPenyiapanSpt.id,
          nop: "",
          objekPajakId: eBupotUnifikasiPphNonResiden.objekPajakId,
          masaPajak: eBupotUnifikasiPphNonResiden.bulanPajak,
          tahunPajak: eBupotUnifikasiPphNonResiden.tahunPajak,
          nomorKetetapan: "",
          pphYangDipotong: eBupotUnifikasiPphNonResiden.pPhYangDipotongDipungut,
          pphYangDisetor: 0,
          uraian: "",
          npwpPenyetor: eBupotUnifikasiPphNonResiden.user.npwp15,
          nitkuPenyetor: eBupotUnifikasiPphNonResiden.user.nitku,
          namaPenyetor: eBupotUnifikasiPphNonResiden.user.nama,
          idBilling: "",
          masaAktifKodeBilling: null,
          userIdInput: req.body.userId,
          cabangId: req.body.kodeCabang,
        };

        await EBupotUnifikasiTagihanPemotongan.create(dataTagihanPemotongan, {
          transaction, // Insert within the transaction
        });
      } else {
        // Update Increment Tagihan Pemotongan
        await EBupotUnifikasiTagihanPemotongan.increment(
          {
            pphYangDipotong:
              eBupotUnifikasiPphNonResiden.pPhYangDipotongDipungut,
          },
          {
            where: {
              id: findEBupotUnifikasiTagihanPemotongan.id,
            },
            transaction, // Ensure transaction is used
          }
        );
      }
    }

    // Commit the transaction
    await transaction.commit();
    res.status(200).json(eBupotUnifikasiPph42152223s);
  } catch (error) {
    // Rollback transaction in case of error
    if (transaction) {
      await transaction.rollback();
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  eBupotUnifikasiPosting,
};
