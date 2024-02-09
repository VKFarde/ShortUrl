const express = require("express");
const urlRoutes = express.Router();
const userControl = require("../controllers/userControl");
const productControl = require("../controllers/productControl");

urlRoutes.post("/api/v1/convert", userControl.auth, productControl.convertUrl);

urlRoutes.get("/api/v1/userUrls", userControl.auth, productControl.allurls);

urlRoutes.get("/:shortId", productControl.hVisits);

module.exports = urlRoutes;
