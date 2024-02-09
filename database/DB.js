const mongoose = require("mongoose");

const url = process.env.url;

const DB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected to", url);
  } catch (err) {
    console.error("Error connecting to database:", err.message);
  }
};

module.exports = DB;
