const express = require('express')
const app = express()
const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine })

app.post('/single', upload.single('image'), (req, res) => {
    console.log(req.file)
    res.send('single file upload success')
})

app.post('/multiple', upload.array('images', 3), (req, res) => {
    console.log(req.files)
    res.send('multiple files uploaded')
})

app.listen(4948, () => console.log('server running'))