const mongoose = require("mongoose");

const SauceSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  manufacturer: {
    type: String,
  },
  description: {
    type: String,
  },
  mainPepper: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  heat: {
    type: Number,
    min: 1,
    max: 10,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
    min: 0,
  },
  usersLiked: {
    type: Array,
    default: [],
  },
  usersDisliked: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Sauce", SauceSchema);
