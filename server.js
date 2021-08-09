// ----------
const express = require("express");
const app = express();
// ----------
const cors = require("cors");
const helmet = require("helmet");
// ----------

// ----------
// Cross Origin Resource Sharing
app.use(cors());
// Headers Protection
app.use(helmet());
// ----------

app.use((req, res) => {
  res.json({ message: "salut toi" });
});

// ----------
app.listen(3000, () => {
  console.log("backend is running");
});
