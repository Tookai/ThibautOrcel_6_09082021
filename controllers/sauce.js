const Sauce = require("../models/Sauce");
const fs = require("fs");

exports.getAllSauce = async (req, res) => {
  try {
    const sauces = await Sauce.find();
    res.status(200).json(sauces);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOneSauce = async (req, res) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    res.status(200).json(sauce);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.postOneSauce = async (req, res) => {
  data = JSON.parse(req.body.sauce);
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
};

exports.updateOneSauce = async (req, res) => {
  try {
    if (!req.file) {
      const data = req.body;
      const updatedSauce = await Sauce.findOneAndUpdate({ _id: req.params.id }, data, { new: true });
      const savedSauce = await updatedSauce.save();
      res.status(200).json(savedSauce);
    } else {
      const data = JSON.parse(req.body.sauce);
      const updatedSauce = await Sauce.findOneAndUpdate(
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
};

exports.deleteOneSauce = async (req, res) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    const filename = sauce.imageUrl.split("/images")[1];
    fs.unlink(`images/${filename}`, () => console.log("Image Supprimée"));
    const deletedSauce = await Sauce.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(deletedSauce);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.handleLike = async (req, res) => {
  const sauce = await Sauce.findOne({ _id: req.params.id });
  const indexLike = sauce.usersLiked.indexOf(req.body.userId);
  const indexDislike = sauce.usersDisliked.indexOf(req.body.userId);
  function findId(id) {
    return id == req.body.userId;
  }
  try {
    if (req.body.like == "1") {
      sauce.likes++, sauce.usersLiked.push(req.body.userId), await sauce.save();
      res.status(200).json(`Vous aimez cette sauce`);
    }

    if (req.body.like == "-1") {
      sauce.dislikes++, sauce.usersDisliked.push(req.body.userId), await sauce.save();
      res.status(200).json(`Vous détestez cette sauce`);
    }

    if (req.body.like === 0 && sauce.usersLiked.find(findId) === req.body.userId) {
      sauce.likes--, sauce.usersLiked.splice(indexLike, 1), await sauce.save();
      res.status(200).json(`Vous n'aimez plus cette sauce`);
    }

    if (req.body.like === 0 && sauce.usersDisliked.find(findId) === req.body.userId) {
      sauce.dislikes--, sauce.usersDisliked.splice(indexDislike, 1), await sauce.save();
      res.status(200).json(`Vous ne détestez plus cette sauce`);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
