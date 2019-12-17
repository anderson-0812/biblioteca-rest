const express = require('express');
const app = express();
const LibraryReturn = require('../models/libraryReturn');

const verificartoken = require('../middleware/auth');

app.get('/libraryReturn', verificartoken, (req, res) => {
    LibraryReturn.find({'state': true}).exec((err, libraryReturnDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!libraryReturnDB){
            return res.status(400).json({
                ok: false,
                libraryReturnDB
            });
        }
        res.status(200).json({
            ok: true,
            libraryReturnDB
        });
    });
});

app.post('/libraryReturn', verificartoken, (req, res) => {
    let body = req.body;
    let libraryReturnToSave = new LibraryReturn({
        loan: body.loan,
        loanDetail: body.loanDetail,
        cant: body.cant,
        date: body.date,
        observations: body.observations
    });

    libraryReturnToSave.save((err, libraryReturnDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!libraryReturnDB){
            return res.status(400).json({
                ok: false,
                libraryReturnDB
            });
        }
        return res.status(200).json({
            ok: true,
            libraryReturnDB
        });
    });
});

app.put('/libraryReturn/:id',verificartoken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let libraryReturnToEdit = {
        loan: body.loan,
        loanDetail: body.loanDetail,
        cant: body.cant,
        date: body.date,
        observations: body.observations
    }

    LibraryReturn.findByIdAndUpdate(id, libraryReturnToEdit, {
        new: true,
        runValidators: true
    }, (err, libraryReturnDB) => {
        if(err){
            return libraryReturnDB.status(500).json({
                ok: false,
                err
            });
        }
        if(!libraryReturnDB){
            return libraryReturnDB.status(400).json({
                ok: false,
                libraryReturnDB
            });
        }
        res.status(200).json({
            ok: true,
            libraryReturnDB
        });
    });
});

app.delete('/libraryReturn/:id',verificartoken, (req, res) => {
    let id = req.params.id;

    LibraryReturnState= {
        state: false
    }
    LibraryReturn.findByIdAndUpdate(id, LibraryReturnState, {
        new: true,
        runValidators: true
    }, (err, libraryReturnDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!libraryReturnDB){
            return res.status(400).json({
                ok: false,
                libraryReturnDB
            });
        }
        res.status(200).json({
            ok: true,
            libraryReturnDB
        });
    });
});

module.exports = app;