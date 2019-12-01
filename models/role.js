const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let roleSchema = new Schema({
    name:{
        type: String,
        required: [true,'The Role is necesary']
    },
    description: {
        type: String
    },
    state:{
        type: Boolean,
        default: true
    }
});

module.exports  = mongoose.model('Role',roleSchema);
