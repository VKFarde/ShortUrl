const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
port = process.env.port;
const DB = require("./database/DB");
const userRoutes = require("./routes/userRoutes");
const urlRoutes = require("./routes/productRoutes");
const cors = require("cors");

const app = express();
DB();

app.use(bodyParser.json());
app.use(cors());
app.use(userRoutes);
app.use(urlRoutes);

app.listen(port, () => console.log("server is running on ", port));
