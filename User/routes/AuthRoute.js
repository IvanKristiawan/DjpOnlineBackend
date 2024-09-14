const express = require("express");
const content = require("../controllers/AuthController.js");
const content2 = require("../../utils/verifyToken.js");
const verifyUser = content2.verifyUser;
const register = content.register;
const login = content.login;
const loginAdmin = content.loginAdmin;

const router = express.Router();

router.post("/register", verifyUser, register);
router.post("/login", login);
router.post("/loginAdmin", loginAdmin);

module.exports = router;
