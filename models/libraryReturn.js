const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let libraryReturnSchema = new Schema({
    loan: {
        type: Schema.Types.ObjectId,
        ref: 'Loan',
        required: [true, 'This field is required']
    },
    loanDetail: {
        type: Schema.Types.ObjectId,
        ref: 'LoanDetail',
        required: [true, 'This field is required']
    },
    cant: {
        type: Number,
        required: [true, 'This field is required']
    },
    state: {
        type: Boolean,
        default: true
    },
    date: {
        type: String,
        required: [true, 'This field is required']
    },
    observations: {
        type: String
    },

});

module.exports = mongoose.model('LibraryReturn', libraryReturnSchema);