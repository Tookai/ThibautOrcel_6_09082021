const router = require("express").Router();
// ----------
// ----------
const userCtrl = require("../controllers/user");
// ----------

router.post("/signup", userCtrl.createAccount);

router.post("/login", userCtrl.loginAccount);

module.exports = router;
