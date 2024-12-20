const express = require("express");
const multer = require("multer");
const path = require('path');
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const app = express();

// Configure Cloudinary

cloudinary.config({
  cloud_name: "--",
  api_key: "--",
  api_secret: "--",
});

// Set up Cloudinary storage for Multear
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", 
    format: async (req, file) => "png", 
    public_id: (req, file) => file.originalname.split(".")[0], // Save with original name (without extension)
  },
});

const upload = multer({ storage });

app.use(express.static(path.join(__dirname, "public")));

app.post("/profile", upload.single("avatar"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    fileUrl: req.file.path, // Cloudinary URL
  });
});

app.listen(2020, () => {
  console.log("Server running on http://localhost:2020");
});
