const express = require('express')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const app = express()
const port = 5050

const originUrl = 'http://localhost:5173'
// const originUrl = 'https://labb-3-skivregister.vercel.app/'

app.use(cors({ origin: originUrl }))

const uploadPath = path.join(__dirname, '../app/public/images')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath)
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

// Hantera POST-förfrågningar till /upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ success: true })
    res.send(file.originalname)
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
