const multer = require('multer');



const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const mimeType = file.mimetype.split('//');
        const fileName = file.originalname;
        cb(null, fileName);
    }
})

const upload = multer({ storage: storage })


module.exports = upload