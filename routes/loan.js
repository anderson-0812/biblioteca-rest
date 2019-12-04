const express = require('express');
const app = express();
const Loan = require('../models/loan')
// para uso de fechas
// const dateFormat = require('dateformat')

app.get('/loan', (req, res) => {
    // populate hace joins con las entidades populate('nameCampo')
    Loan.find({'state': true})
    .populate({path: 'user'
        , select: 
            {
                _id: '_id'
                , ci: 'ci'
                , name: 'name'
                , lastname: 'lastname'
                , mail: 'mail'
                , role: 'role'
            }
        , populate:
        {
            path: 'role', select: 'name'
        }
    })
    .populate('petitioner').exec((err, loanDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!loanDB){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            loanDB
        });
    });
});

app.post('/loan', (req, res) => {
    let body = req.body;

    let loanToSave = new Loan({
        user: body.user,
        petitioner: body.petitioner,
        // dateRegister: dateFormat(now,"dddd, d 'de' mmmm, yyyy"),
        dateRegister: body.dateRegister,
        dateLimit: body.dateLimit,
        observations: body.observations
    });

    loanToSave.save((err, loanDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!loanDB){
            return res.status(400).json({
                ok: false,
                loanDB
            });
        }
        return res.status(200).json({
            ok: true,
            loanDB
        });
    });
});

app.put('/loan/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let loanToEdit = {
        user: body.user,
        petitioner: body.petitioner,
        // dateRegister: dateFormat(now,"dddd, d 'de' mmmm, yyyy"),
        dateRegister: body.dateRegister,
        dateLimit: body.dateLimit,
        observations: body.observations
    }

    Loan.findByIdAndUpdate(id, loanToEdit, {
        new: true,
        runValidators: true
    }, (err, loanDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!loanDB){
            return res.status(400).json({
                ok: false,
                loanDB
            });
        }
        return res.status(200).json({
            ok: true,
            loanDB
        });
    });
});

app.delete('/loan/:id', (req, res) => {
    let id = req.params.id;

    LoanState= {
        state: false
    }
    Loan.findByIdAndUpdate(id, LoanState, {
        new: true,
        runValidators: true
    }, (err, loanDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!loanDB){
            return res.status(400).json({
                ok: false,
                loanDB
            });
        }
        res.status(200).json({
            ok: true,
            loanDB
        });
    });
});

module.exports = app