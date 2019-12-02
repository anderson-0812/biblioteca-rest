const express = require('express');
const app = express();
const Petitioner = require('../models/petitioner');

app.get('/petitioner', (req, res) => {
    Petitioner.find({'state': true}).exec((err, petitionerDB)=> {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!petitionerDB){
            return res.status(400).json({
                ok: false,
                petitionerDB
            });
        }
        res.status(200).json({
            ok: true,
            petitionerDB
        });
    });
});

app.post('/petitioner', (req, res) => {
    let body = req.body;

    let petitionerToSave = new Petitioner({
        ci: body.ci,
        name: body.name,
        lastname: body.lastname,
        address: body.address,
        telephone: body.telephone,
        mail: body.mail
    });

    petitionerToSave.save((err, petitionerDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!petitionerDB){
            return res.status(400).json({
                ok: false,
                petitionerDB
            });
        }
        return res.status(200).json({
            ok: true,
            petitionerDB
        });
    });
});

app.put('/petitioner/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let petitionerToEdit = {
        ci: body.ci,
        name: body.name,
        lastname: body.lastname,
        address: body.address,
        telephone: body.telephone,
        mail: body.mail
    }

    Petitioner.findByIdAndUpdate(id, petitionerToEdit, {
        new: true,
        runValidators: true
    }, (err, petitionerDB) => {
        if(err){
            return petitionerDB.status(500).json({
                ok: false,
                err
            });
        }
        if(!petitionerDB){
            return petitionerDB.status(400).json({
                ok: false,
                petitionerDB
            });
        }
        res.status(200).json({
            ok:true,
            petitionerDB
        });
    });
});

app.delete('/petitioner/:id', (req, res) => {
    let id = req.params.id;
    
    let petitionerState = {
        state:false
    }

    Petitioner.findByIdAndUpdate(id, petitionerState, {
        new: true,
        runValidators: true
    }, (err, petitionerDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!petitionerDB){
            return res.status(400).json({
                ok: false,
                petitionerDB
            });
        }
        res.status(200).json({
            ok: true,
            petitionerDB
        });
    });
});

module.exports = app;