const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let petitionerSchema = new Schema({
    ci: {
        type: String,
        required: [true, 'This field is required']
    },
    name: {
        type: String,
        required: [true,'This field is required']
    },
    lastname: {
        type: String,
        required: [true, 'This field is required']
    },
    address: {
        type: String,
        required: [true, 'This field is required']
    },
    telephone: {
        type: Number
    },
    mail: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Petitioner', petitionerSchema);