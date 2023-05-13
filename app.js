const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const cors = require("cors");
const authRoutes = require("./src/routes/public/authRoute")
const userRoutes = require("./src/routes/userRoute");
const verifyJwt = require("./src/middlewares/jwt");

require('./src/config/sequelize');
const app = express();
const jwtSecret  = process.env.JWT_SECRET;
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
 app.use("/api/v1/public",authRoutes);
app.use(verifyJwt())
app.use("/api/v1/secured",userRoutes)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});