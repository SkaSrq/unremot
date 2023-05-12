const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const cors = require("cors");

require('./src/config/sequelize');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(
    cors({
      origin: process.env.CLIENT_URL,
      methods: "GET,POST,PUT,DELETE",
      credentials: true
    })
  );

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});