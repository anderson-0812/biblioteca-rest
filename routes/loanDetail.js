const express = require('express');
const app = express();
const loanDetail = require('../models/loanDetail');
const verificarToken = require('../middleware/auth');

app.get('/loanDetail', verificarToken, (req, res) => {
    loanDetail.find({'state': true})
    .populate({path: 'loan', select:
        {
            _id: '_id',
            dateRegister: 'dateRegister',
            dateLimit: 'dateLimit',
            observations: 'observations'
        }
    })
    .exec((err, loanDetailDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!loanDetailDB){
            return res.status(400).json({
                ok: false,
                loanDetailDB
            });
        }
        return res.status(200).json({
            ok: true,
            loanDetailDB
        });
    });
});

app.post('/loanDetail', verificarToken, (req, res ) => {
    let body = req.body;

    let loanDetailToSave = new loanDetail({
        loan: body.loan,
        libraryResource: body.libraryResource,
        cant: body.cant
    });

    loanDetailToSave.save((err, loanDetailDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!loanDetailDB){
            return res.status(400).json({
                ok: false,
                loanDetailDB
            });
        }
        return res.status(200).json({
            ok: true,
            loanDetailDB
        });
    });
});

app.put('/loanDetail/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let loanDetailToEdit = {
        loan: body.loan,
        libraryResource: body.libraryResource,
        cant: body.cant
    }

    loanDetail.findByIdAndUpdate(id, loanDetailToEdit, {
        new: true,
        runValidators: true
    }, (err, loanDetailDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!loanDetailDB){
            return res.status(400).json({
                ok: false,
                loanDetailDB
            });
        }
        return res.status(200).json({
            ok: true,
            loanDetailDB
        });
    });
});

app.delete('/loanDetail/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    let loanDetailState = {
        state: false
    }

    loanDetail.findByIdAndUpdate(id, loanDetailState, {
        new: true,
        runValidators: true
    }, (err, loanDetailDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!loanDetailDB){
            return res.status(400).json({
                ok: false,
                loanDetailDB
            });
        }
        return res.status(200).json({
            ok: true,
            loanDetailDB
        });
    });
});

module.exports = app;