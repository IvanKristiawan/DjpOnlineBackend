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
const CabangRoute = require("./Master/routes/Cabang/CabangRoute.js");
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
app.use(CabangRoute);
// Migrasi
app.use(MigrasiRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
