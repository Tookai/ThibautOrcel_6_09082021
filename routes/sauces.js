const router = require("express").Router();
const Sauce = require("../models/Sauce");

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
    const sauce = await Sauce.findOne(req.param.id);
    res.status(200).json(sauce);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
