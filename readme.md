## Send file to sever from frontend

refer → [docs](https://www.npmjs.com/package/multer)

Manipulate `<form/>` element to send files

Don't forget the `enctype="multipart/form-data"` in your form.

```
<form action="/upload" method="POST" enctype="multipart/form-data">
    <input type="file" name="avatar" required>
    <button type="submit">Upload</button>
</form>
```

---

## Api to upload the file to cloud

basic multer to store file in upload folder in our system no extention 

```jsx
const express = require('express')
const multer = require('multer')
const path = require('path')

const upload = multer({ dest: 'uploads/' })

const app = express()

app.use(express.static(path.join(__dirname, "public")));

app.post('/profile', upload.single('avatar'), (req, res) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req?.file, req?.body )
  res.send("done")
})

app.listen(2020,()=>{
  console.log("2020 watch")
})
```

with extension 

```json
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
```

now instead of saving file to memory save it to cloud

```jsx
npm i cloudinary
npm i multer-storage-cloudinary
```

```jsx
const express = require("express");
const multer = require("multer");
const path = require('path');
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const app = express();

// Configure Cloudinary

cloudinary.config({
  cloud_name: "-",
  api_key: "-",
  api_secret: "-",
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

```# file_upload
