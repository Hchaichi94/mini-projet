const File = require('../models/File')
const express = require('express')
const router = new express.Router()
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

router.post('/', upload.single('file'), async (req, res, next) => {
    const file = new File({
        title: req.file.originalname,
        path: req.file.path,
        createdAt: new Date()
    })
    await file.save()
    try {
        return res.status(200).send({ file })
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/', async (req, res) => {
    const list_files = await File.find().sort({ createdAt: -1 })
    try {
        res.status(200).send(list_files)
    } catch (e) {
        res.status(400).send(e.message)
    }
})


module.exports = router;