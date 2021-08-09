const router = require("express").Router();
// ----------
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");
// ----------
const sauceCtrl = require("../controllers/sauce");
// ----------

router.get("/", auth, sauceCtrl.getAllSauce);

router.get("/:id", auth, sauceCtrl.getOneSauce);

router.post("/", auth, multer, sauceCtrl.postOneSauce);

router.put("/:id", auth, multer, sauceCtrl.updateOneSauce);

router.delete("/:id", auth, sauceCtrl.deleteOneSauce);

router.post("/:id/like", auth, sauceCtrl.handleLike);

module.exports = router;
