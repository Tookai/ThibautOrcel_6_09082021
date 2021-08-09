// ----------
const express = require("express");
const app = express();
// ----------
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
// ----------

// ----------
// Cross Origin Resource Sharing
app.use(cors());
// Headers Protection
app.use(helmet());
// ----------
mongoose
  .connect("mongodb+srv://Tookai:Thibaut21@cluster0.oniut.mongodb.net/projet6?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
// ----------
app.use((req, res) => {
  res.json({ message: "salut toi" });
});

// ----------
app.listen(3000, () => {
  console.log("La fin du dos est en train de courir");
});
