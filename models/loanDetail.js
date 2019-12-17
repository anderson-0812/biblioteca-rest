const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let loanDetailSchema = new Schema({
    loan: {
        type: Schema.Types.ObjectId,
        ref: 'Loan',
        required: [true, 'This field is required']
    },
    libraryResource: {
        type: Schema.Types.ObjectId,
        ref: 'LibraryResource',
        required: [true, 'This field is required']
    },
    cant: {
        type: Number,
        required: [true, 'This field is required']
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('LoanDetail', loanDetailSchema);