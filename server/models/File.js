const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let fileSchema = new Schema({
    title: {
        type: String
    },
    path: {
        type: String
    },
    createdAt: {
        type: Date
    }
})

module.exports = mongoose.model('File', fileSchema)
