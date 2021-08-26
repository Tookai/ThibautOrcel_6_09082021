// ---------- EXPRESS
const express = require("express");
const app = express();
// ---------- DEPENDENCIES
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const path = require("path");
// ---------- ROUTES
const userRoute = require("./routes/users");
const sauceRoute = require("./routes/sauces");
// ---------- MONGODB CONNECTION
mongoose
  .connect("mongodb+srv://Tookai:Thibaut21@cluster0.oniut.mongodb.net/projet6?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //
    useCreateIndex: true,
    useFindAndModify: false,
    // for deprecation warning
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
// ----------
// Cross Origin Resource Sharing
app.use(cors());
// Headers Protection
app.use(helmet());
// Readable Body
app.use(express.json());
// ----------
// gestionnaire de routage
app.use("/images", express.static(path.join(__dirname, "images")));
// ---------- ROUTES
app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);
// --- 404:Not Found Error
app.all("*", (req, res) => {
  res.status(404).json(`Can't find ${req.originalUrl} on this server!`);
});
// ----------
app.listen(3000, () => {
  console.log("La fin du dos est en train de courir");
});
