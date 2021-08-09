const router = require("express").Router();
// ----------
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const HashedPw = await bcrypt.hash(req.body.password, 10);
  try {
    const newUser = new User({
      email: req.body.email,
      password: HashedPw,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
