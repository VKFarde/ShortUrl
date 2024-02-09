const express = require("express");
const userControl = require("../controllers/userControl");
const userRoutes = express.Router();

userRoutes.post("/api/v1/login", userControl.login);
userRoutes.post("/api/v1/res", userControl.register);
userRoutes.delete("/api/v1/logout", userControl.logout);

module.exports = userRoutes;
