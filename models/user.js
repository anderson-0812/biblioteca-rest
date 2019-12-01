const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let userSchema = new Schema({
    ci: {
        type: String,
        required: [true,'This field is required']
    },
    name: {
        type: String,
        required: [true, 'This field is required']
    },
    lastname: {
        type: String,
        required: [true, 'This field is required']
    },
    mail: {
        type: String,
        required: [true, 'This field is required']
    },
    password:{
        type:String,
        required: [true, 'This field is required']
    },
    role:{
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'This field is required']
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports  = mongoose.model('User',userSchema);