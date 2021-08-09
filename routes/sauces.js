const router = require("express").Router();
const Sauce = require("../models/Sauce");
const multer = require("../middleware/multer");

router.get("/", async (req, res) => {
  try {
    const sauces = await Sauce.find();
    res.status(200).json(sauces);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const sauce = await Sauce.findById(req.params.id);
    res.status(200).json(sauce);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", multer, async (req, res) => {
  console.log(req.body.sauce);
  

  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
