const router = require("express").Router();
// ----------
const multer = require("../middleware/multer");
// ----------
const sauceCtrl = require("../controllers/sauce");
// ----------

router.get("/", sauceCtrl.getAllSauce);

router.get("/:id", sauceCtrl.getOneSauce);

router.post("/", multer, sauceCtrl.postOneSauce);

router.put("/:id", multer, sauceCtrl.updateOneSauce);

router.delete("/:id", sauceCtrl.deleteOneSauce);

router.post("/:id/like", sauceCtrl.handleLike);

module.exports = router;
