const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const app = express();
const PORT = process.env.PORT || 5000;

const List = require("./models/List");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(keys.mongoURI);

require("./routes/listRoutes")(app);

app.listen(PORT, () =>
  console.log(`Server is listening on port: ${PORT}. . .`)
);
