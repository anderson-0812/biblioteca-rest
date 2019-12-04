const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let loanSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'This field is required']
    },
    petitioner: {
        type: Schema.Types.ObjectId,
        ref: 'Petitioner',
        required: [true, 'This field is required']
    },
    dateRegister: {
        type: String
    },
    dateLimit: {
        type: String,
        required: [true, 'This field is required']
    },
    observations: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Loan', loanSchema);