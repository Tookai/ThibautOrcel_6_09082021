const router = require("express").Router();
// ----------
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// ----------
const userCtrl = require("../controllers/user");
// ----------

router.post("/signup", userCtrl.createAccount);

router.post("/login", userCtrl.loginAccount);

module.exports = router;
