const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const model = require("./model/model");
const passport = require("passport");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const url = "mongodb://localhost:27017/assii"; // Replace with your MongoDB database URL

const connectToDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

connectToDB();

let connectionCount = 0;
app.use((req, res, next) => {
  connectionCount++;
  console.log(`Connection count: ${connectionCount}`);
  next();
});

// Multer configuration for handling file uploads
const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage: storage });

app.post("/send", upload.single("photo"), async (req, res) => {
  const { ID, friendID, password } = req.body;
  console.log(ID, friendID, password);
  const image = req.file.buffer;
  console.log(image);
  try {
    // Create a new document using the Model and save it to MongoDB
    const newModel = new model({
      id: ID,
      friendID: friendID,
      image: image,
      password: password,
    });
    await newModel.save();

    console.log("Data saved to MongoDB:", newModel);

    res.status(200).json({ success: true, message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8000");
});
