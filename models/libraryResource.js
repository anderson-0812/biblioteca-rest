const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let libraryResourceSchema = new Schema({
    name: {
        type: String,
        required: [true, 'This field is required']
    },
    description: {
        type: String
    },
    author: {
        type: String,
        required: [true, 'This field is required']
    },
    stock: {
        type: Number,
        required: [true, 'This field is required']
    },
    stockCurrent: {
        type: Number,
        required: [true, 'This field is required']
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('LibraryResource', libraryResourceSchema);