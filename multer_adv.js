const express = require("express");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.post("/profile", upload.single("avatar"), (req, res) => {
  console.log(req.file, req.body);
  res.send("done");
});

app.listen(2020, () => {
  console.log("watching 2020 ......");
});
