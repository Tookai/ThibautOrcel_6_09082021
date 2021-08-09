// Hello World !
const express = require("express");
const app = express();

app.use((req, res) => {
  res.json({ message: "salut toi" });
});

app.listen(3000, () => {
  console.log("backend is running");
});
