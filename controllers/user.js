const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createAccount = async (req, res) => {
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
};

exports.loginAccount = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json(`Pas d'utilisateur avec ce nom.`);
    } else {
      const validPw = await bcrypt.compare(req.body.password, user.password);
      if (!validPw) {
        res.status(401).json(`Le mot de passe n'est pas bon.`);
      }
      res.status(200).json({
        userId: user._id,
        token: jwt.sign({ userId: user._id }, "SUPER_SECRET_KEY", { expiresIn: "1d" }),
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
