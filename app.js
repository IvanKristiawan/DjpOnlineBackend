const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
// Import Routes
const UserRoute = require("./User/routes/UserRoute.js");
const HakAksesRoute = require("./User/routes/HakAkses/HakAksesRoute.js");
const KewajibanPerpajakanRoute = require("./User/routes/KewajibanPerpajakan/KewajibanPerpajakanRoute.js");
const AuthRoute = require("./User/routes/AuthRoute.js");
// Import Setting
const SettingRoute = require("./Setting/routes/SettingRoute.js");
// Import Master
const KategoriKluRoute = require("./Master/routes/KategoriKlu/KategoriKluRoute.js");
const GolonganPokokKluRoute = require("./Master/routes/GolonganPokokKlu/GolonganPokokKluRoute.js");
const GolonganKluRoute = require("./Master/routes/GolonganKlu/GolonganKluRoute.js");
const SubGolonganKluRoute = require("./Master/routes/SubGolonganKlu/SubGolonganKluRoute.js");
const KelompokKegiatanEkonomiKluRoute = require("./Master/routes/KelompokKegiatanEkonomiKlu/KelompokKegiatanEkonomiKluRoute.js");
const JenisPajakRoute = require("./Master/routes/JenisPajak/JenisPajakRoute.js");
const JenisSetoranRoute = require("./Master/routes/JenisSetoran/JenisSetoranRoute.js");
const ObjekPajakRoute = require("./Master/routes/ObjekPajak/ObjekPajakRoute.js");
const PtkpRoute = require("./Master/routes/Ptkp/PtkpRoute.js");
const TerRoute = require("./Master/routes/Ter/TerRoute.js");
const JenisObjekPajakRoute = require("./Master/routes/JenisObjekPajak/JenisObjekPajakRoute.js");
const PkpRoute = require("./Master/routes/Pkp/PkpRoute.js");
const TarifPph21PP68Tahun2009Route = require("./Master/routes/TarifPph21PP68Tahun2009/TarifPph21PP68Tahun2009Route.js");
const TarifPph21PP149Tahun2000Route = require("./Master/routes/TarifPph21PP149Tahun2000/TarifPph21PP149Tahun2000Route.js");
const NegaraRoute = require("./Master/routes/Negara/NegaraRoute.js");
const TahunRoute = require("./Master/routes/Tahun/TahunRoute.js");
const CabangRoute = require("./Master/routes/Cabang/CabangRoute.js");
// Import EBilling
const EBillingRoute = require("./EBilling/routes/EBilling/EBillingRoute.js");
// Import EBupot 2126
const EBupot2126Pph21Route = require("./PraPelaporan/routes/EBupot2126/EBupot2126Pph21/EBupot2126Pph21Route.js");
const EBupot2126Pph21TahunanRoute = require("./PraPelaporan/routes/EBupot2126/EBupot2126Pph21Tahunan/EBupot2126Pph21TahunanRoute.js");
const EBupot2126Pph26Route = require("./PraPelaporan/routes/EBupot2126/EBupot2126Pph26/EBupot2126Pph26Route.js");
const EBupot2126ImporDataRoute = require("./PraPelaporan/routes/EBupot2126/EBupot2126ImporData/EBupot2126ImporDataRoute.js");
const EBupot2126DetilValidasiRoute = require("./PraPelaporan/routes/EBupot2126/EBupot2126DetilValidasi/EBupot2126DetilValidasiRoute.js");
const EBupot2126PenandatanganRoute = require("./PraPelaporan/routes/EBupot2126/Penandatangan/EBupot2126PenandatanganRoute.js");
const EBupot2126PenyiapanSptRoute = require("./PraPelaporan/routes/EBupot2126/EBupot2126PenyiapanSpt/EBupot2126PenyiapanSptRoute.js");
const EBupot2126PostingRoute = require("./PraPelaporan/routes/EBupot2126/EBupot2126Posting/EBupot2126PostingRoute.js");
const EBupot2126TagihanPemotonganRoute = require("./PraPelaporan/routes/EBupot2126/EBupot2126TagihanPemotongan/EBupot2126TagihanPemotonganRoute.js");
const EBupot2126BuktiSetorRoute = require("./PraPelaporan/routes/EBupot2126/EBupot2126BuktiSetor/EBupot2126BuktiSetorRoute.js");
// Import EBupot Unifikasi Pph Disetor Sendiri
const EBupotUnifikasiPphDisetorSendiriRoute = require("./PraPelaporan/routes/EBupotUnifikasi/EBupotUnifikasiPphDisetorSendiri/EBupotUnifikasiPphDisetorSendiriRoute.js");
const EBupotUnifikasiPph42152223Route = require("./PraPelaporan/routes/EBupotUnifikasi/EBupotUnifikasiPph42152223/EBupotUnifikasiPph42152223Route.js");
const DokumenDasarPemotonganEBupotUnifikasiPph42152223Route = require("./PraPelaporan/routes/EBupotUnifikasi/DokumenDasarPemotonganEBupotUnifikasiPph42152223/DokumenDasarPemotonganEBupotUnifikasiPph42152223Route.js");
const EBupotUnifikasiPphNonResidenRoute = require("./PraPelaporan/routes/EBupotUnifikasi/EBupotUnifikasiPphNonResiden/EBupotUnifikasiPphNonResidenRoute.js");
const DokumenDasarPemotonganEBupotUnifikasiPphNonResidenRoute = require("./PraPelaporan/routes/EBupotUnifikasi/DokumenDasarPemotonganEBupotUnifikasiPphNonResiden/DokumenDasarPemotonganEBupotUnifikasiPphNonResidenRoute.js");
const EBupotUnifikasiImporDataRoute = require("./PraPelaporan/routes/EBupotUnifikasi/EBupotUnifikasiImporData/EBupotUnifikasiImporDataRoute.js");
const EBupotUnifikasiDetilValidasiRoute = require("./PraPelaporan/routes/EBupotUnifikasi/EBupotUnifikasiDetilValidasi/EBupotUnifikasiDetilValidasiRoute.js");
const EBupotUnifikasiPostingRoute = require("./PraPelaporan/routes/EBupotUnifikasi/EBupotUnifikasiPosting/EBupotUnifikasiPostingRoute.js");
const EBupotUnifikasiTagihanPemotonganRoute = require("./PraPelaporan/routes/EBupotUnifikasi/EBupotUnifikasiTagihanPemotongan/EBupotUnifikasiTagihanPemotonganRoute.js");
const EBupotUnifikasiBuktiSetorRoute = require("./PraPelaporan/routes/EBupotUnifikasi/EBupotUnifikasiBuktiSetor/EBupotUnifikasiBuktiSetorRoute.js");
const EBupotUnifikasiPenyiapanSptRoute = require("./PraPelaporan/routes/EBupotUnifikasi/EBupotUnifikasiPenyiapanSpt/EBupotUnifikasiPenyiapanSptRoute.js");
// Import Penandatangan
const PenandatanganRoute = require("./PraPelaporan/routes/Penandatangan/PenandatanganRoute.js");
// Import Setting
const MigrasiRoute = require("./Migrasi/routes/MigrasiRoute.js");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
// Use Routes
app.use(UserRoute);
app.use(HakAksesRoute);
app.use(KewajibanPerpajakanRoute);
app.use("/auth", AuthRoute);
// Setting
app.use(SettingRoute);
// Master
app.use(KategoriKluRoute);
app.use(GolonganPokokKluRoute);
app.use(GolonganKluRoute);
app.use(SubGolonganKluRoute);
app.use(KelompokKegiatanEkonomiKluRoute);
app.use(JenisPajakRoute);
app.use(JenisSetoranRoute);
app.use(ObjekPajakRoute);
app.use(PtkpRoute);
app.use(TerRoute);
app.use(JenisObjekPajakRoute);
app.use(PkpRoute);
app.use(TarifPph21PP68Tahun2009Route);
app.use(TarifPph21PP149Tahun2000Route);
app.use(NegaraRoute);
app.use(TahunRoute);
app.use(CabangRoute);
// EBilling
app.use(EBillingRoute);
// EBupot 2126
app.use(EBupot2126Pph21Route);
app.use(EBupot2126Pph21TahunanRoute);
app.use(EBupot2126Pph26Route);
app.use(EBupot2126ImporDataRoute);
app.use(EBupot2126DetilValidasiRoute);
app.use(EBupot2126PenandatanganRoute);
app.use(EBupot2126PenyiapanSptRoute);
app.use(EBupot2126PostingRoute);
app.use(EBupot2126TagihanPemotonganRoute);
app.use(EBupot2126BuktiSetorRoute);
// EBupot Unifikasi
app.use(EBupotUnifikasiPphDisetorSendiriRoute);
app.use(EBupotUnifikasiPph42152223Route);
app.use(DokumenDasarPemotonganEBupotUnifikasiPph42152223Route);
app.use(EBupotUnifikasiPphNonResidenRoute);
app.use(DokumenDasarPemotonganEBupotUnifikasiPphNonResidenRoute);
app.use(EBupotUnifikasiImporDataRoute);
app.use(EBupotUnifikasiDetilValidasiRoute);
app.use(EBupotUnifikasiPostingRoute);
app.use(EBupotUnifikasiTagihanPemotonganRoute);
app.use(EBupotUnifikasiBuktiSetorRoute);
app.use(EBupotUnifikasiPenyiapanSptRoute);
// Penandatangan
app.use(PenandatanganRoute);
// Migrasi
app.use(MigrasiRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
