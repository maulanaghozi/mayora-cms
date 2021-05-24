const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.REACT_APP_BASE_URL_WEB || 3006;

app.listen(port, () => {
  console.log("mayora cms running on port " + port);
});
