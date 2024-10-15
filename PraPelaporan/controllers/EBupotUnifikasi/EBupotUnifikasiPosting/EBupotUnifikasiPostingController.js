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

const eBupotUnifikasiPosting = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();
    let tahun = req.body.tahunPajak;
    let bulan = getMonthIndex(req.body.masaPajak);

    // 01.) Posting EBupotUnifikasiPphDisetorSendiri
    let tempWhereEBupotUnifikasiPphDisetorSendiri = {
      userEBupotUnifikasiPphDisetorSendiriId: req.body.userId,
      isPost: false,
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

    const eBupotUnifikasiPphDisetorSendiris =
      await EBupotUnifikasiPphDisetorSendiri.findAll({
        where: tempWhereEBupotUnifikasiPphDisetorSendiri,
        include: tempIncludeEBupotUnifikasiPphDisetorSendiri,
      });

    // Extract the IDs of the matching records
    const idsToUpdateEBupotUnifikasiPphDisetorSendiri =
      eBupotUnifikasiPphDisetorSendiris.map((record) => record.id);

    await EBupotUnifikasiPphDisetorSendiri.update(
      {
        isPost: true,
      },
      {
        where: {
          id: idsToUpdateEBupotUnifikasiPphDisetorSendiri, // Use the IDs of the matched records
        },
        transaction,
      }
    );

    // 02.) Posting EBupotUnifikasiPph42152223
    let tempWhereEBupotUnifikasiPph42152223 = {
      userEBupotUnifikasiPph42152223Id: req.body.userId,
      isPost: false,
      isHapus: false,
      [Op.and]: [
        {
          bulanPajak: bulan,
        },
        {
          tahunPajak: tahun,
        },
      ],
    };
    let tempIncludeEBupotUnifikasiPph42152223 = [
      { model: User },
      { model: Penandatangan },
      { model: ObjekPajak },
      { model: Cabang },
    ];

    const eBupotUnifikasiPph42152223s =
      await EBupotUnifikasiPph42152223.findAll({
        where: tempWhereEBupotUnifikasiPph42152223,
        include: tempIncludeEBupotUnifikasiPph42152223,
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
          id: idsToUpdateEBupotUnifikasiPph42152223, // Use the IDs of the matched records
        },
        transaction,
      }
    );

    // 03.) Posting EBupotUnifikasiPphNonResiden
    let tempWhereEBupotUnifikasiPphNonResiden = {
      userEBupotUnifikasiPphNonResidenId: req.body.userId,
      isPost: false,
      isHapus: false,
      [Op.and]: [
        {
          bulanPajak: bulan,
        },
        {
          tahunPajak: tahun,
        },
      ],
    };
    let tempIncludeEBupotUnifikasiPphNonResiden = [
      { model: User },
      { model: Negara },
      { model: Penandatangan },
      { model: ObjekPajak },
      { model: Cabang },
    ];

    const eBupotUnifikasiPphNonResidens =
      await EBupotUnifikasiPphNonResiden.findAll({
        where: tempWhereEBupotUnifikasiPphNonResiden,
        include: tempIncludeEBupotUnifikasiPphNonResiden,
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
          id: idsToUpdateEBupotUnifikasiPphNonResiden, // Use the IDs of the matched records
        },
        transaction,
      }
    );

    await transaction.commit();
    res.status(200).json(eBupotUnifikasiPph42152223s);
  } catch (error) {
    // Error 500 = Kesalahan di server
    if (transaction) {
      await transaction.rollback();
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  eBupotUnifikasiPosting,
};
