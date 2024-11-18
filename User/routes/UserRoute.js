const express = require("express");
const content = require("../controllers/UserController.js");
const content2 = require("../../utils/verifyToken.js");
const updateUser = content.updateUser;
const updateUserPassword = content.updateUserPassword;
const updateUserHakAkses = content.updateUserHakAkses;
const updateUserThenLogin = content.updateUserThenLogin;
const updateAuthKeyUserThenLogin = content.updateAuthKeyUserThenLogin;
const updateUserThenLoginNoKewajiban = content.updateUserThenLoginNoKewajiban;
const deleteUser = content.deleteUser;
const getUser = content.getUser;
const getUsers = content.getUsers;
const getUsersPagination = content.getUsersPagination;
const getNama = content.getNama;
const getNpwp = content.getNpwp;
const getUsersPerCabang = content.getUsersPerCabang;
const getUsersPerCabangPagination = content.getUsersPerCabangPagination;
const getUsersPerCabangExceptOwnerPagination =
  content.getUsersPerCabangExceptOwnerPagination;
const verifyUser = content2.verifyUser;
const router = express.Router();

// UPDATE
router.post("/users/:id", verifyUser, updateUser);
router.post("/updateUserPassword/:id", verifyUser, updateUserPassword);
router.post("/updateUserHakAkses/:id", verifyUser, updateUserHakAkses);
router.post("/updateUserThenLogin/:id", verifyUser, updateUserThenLogin);
router.post(
  "/updateAuthKeyUserThenLogin/:id",
  verifyUser,
  updateAuthKeyUserThenLogin
);
router.post(
  "/updateUserThenLoginNoKewajiban/:id",
  verifyUser,
  updateUserThenLoginNoKewajiban
);
// DELETE
router.post("/users/deleteUser/:id", verifyUser, deleteUser);
// GET
router.post("/findUser/:id", verifyUser, getUser);
// GET ALL
router.post("/users", verifyUser, getUsers);
router.post("/usersPagination", verifyUser, getUsersPagination);
router.post("/getNama", verifyUser, getNama);
router.post("/getNpwp", verifyUser, getNpwp);
router.post("/usersPerCabang", verifyUser, getUsersPerCabang);
router.post(
  "/usersPerCabangPagination",
  verifyUser,
  getUsersPerCabangPagination
);
router.post(
  "/usersPerCabangExceptOwnerPagination",
  verifyUser,
  getUsersPerCabangExceptOwnerPagination
);

module.exports = router;
