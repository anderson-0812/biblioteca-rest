const express = require('express');
const app = express();
const LibraryResource = require('../models/libraryResource');

app.get('/libraryResource', (req, res) => {
    LibraryResource.find({'state': true}).exec((err, libraryResourceDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!libraryResourceDB){
            return res.status(400).json({
                ok: false,
                libraryResourceDB
            });
        }
        res.status(200).json({
            ok: true,
            libraryResourceDB
        });
    });
});

app.post('/libraryResource', (req, res) => {
    let body = req.body;

    let libraryResourceToSave = new LibraryResource({
        name: body.name,
        description: body.description,
        author: body.author,
        stock: body.stock,
        stockCurrent: body.stock
    });

    libraryResourceToSave.save((err, libraryResourceDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!libraryResourceDB){
            return res.status(400).json({
                ok: false,
                libraryResourceDB
            });
        }
        return res.status(200).json({
            ok: true,
            libraryResourceDB
        });
    });
});

app.put('/libraryResource/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let libraryResourceToEdit = {
        name: body.name,
        description: body.description,
        author: body.author,
        stock: body.stock,
        stockCurrent: body.stock
    }

    LibraryResource.findByIdAndUpdate(id, libraryResourceToEdit, {
        new: true,
        runValidators: true
    }, (err, libraryResourceDB) => {
        if(err){
            return libraryResourceDB.status(500).json({
                ok: false,
                err
            });
        }
        if(!libraryResourceDB){
            return libraryResourceDB.status(400).json({
                ok: false,
                libraryResourceDB
            });
        }
        res.status(200).json({
            ok: true,
            libraryResourceDB
        });
    });
});

app.delete('/libraryResource/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    LibraryResourceState= {
        state: false
    }
    LibraryResource.findByIdAndUpdate(id, LibraryResourceState, {
        new: true,
        runValidators: true
    }, (err, libraryResourceDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!libraryResourceDB){
            return res.status(400).json({
                ok: false,
                libraryResourceDB
            });
        }
        res.status(200).json({
            ok: true,
            libraryResourceDB
        });
    });
});

module.exports = app;