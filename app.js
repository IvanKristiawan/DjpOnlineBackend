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
const CabangRoute = require("./Master/routes/Cabang/CabangRoute.js");

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
app.use(CabangRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
