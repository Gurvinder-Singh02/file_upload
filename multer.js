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