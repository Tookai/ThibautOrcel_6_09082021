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
  data = JSON.parse(req.body.sauce);
  console.log(data);
  const newSauce = new Sauce({
    ...data,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  try {
    const savedSauce = await newSauce.save();
    res.status(200).json(savedSauce);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", multer, async (req, res) => {
  console.log(!req.file);
  try {
    if (!req.file) {
      const data = req.body;
      const updatedSauce = await Sauce.findByIdAndUpdate({ _id: req.params.id }, data, { new: true });
      const savedSauce = await updatedSauce.save();
      res.status(200).json(savedSauce);
    } else {
      const data = JSON.parse(req.body.sauce);
      const updatedSauce = await Sauce.findByIdAndUpdate(
        { _id: req.params.id },
        { ...data, imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` },
        { new: true }
      );
      const savedSauce = await updatedSauce.save();
      res.status(200).json(savedSauce);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
