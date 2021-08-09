// ----------
const express = require("express");
const app = express();
// ----------
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
// ----------
const userRoute = require("./routes/users");
const sauceRoute = require("./routes/sauces");
// ----------
mongoose
  .connect("mongodb+srv://Tookai:Thibaut21@cluster0.oniut.mongodb.net/projet6?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
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
// ----------
app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);
// ----------
app.listen(3000, () => {
  console.log("La fin du dos est en train de courir");
});
