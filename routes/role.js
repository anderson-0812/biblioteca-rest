const express = require('express');
const app = express();
const Role = require('../models/role');

const verificartoken = require('../middleware/auth');

app.get('/role',verificartoken,(req, res)=>{

    Role.find({'state': true}).exec((err,roleDB)=> {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
        res.status(200).json({
            ok: true,
            roleDB
        });
    });

});

app.post('/role',verificartoken,(req, res)=>{
    let body = req.body;

    let roleToSave = new Role({
        name: body.name,
        description: body.description
    });

    roleToSave.save((err,roleDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!roleDB){
            return res.status(400).json({
                ok: false,
                roleDB
            });
        }
        res.status(200).json({
            ok: true,
            roleDB
        });
    });
});

app.put('/role/:id',verificartoken,(req,res) => {
    let id = req.params.id;

    let body = req.body;

    let roleToEdit = {
        name: body.name,
        description: body.description
    }

    Role.findByIdAndUpdate(id, roleToEdit, {
        new: true, // indica que devuelva el documento despues de actualizarlo
        runValidators: true // valida el required de los campos
    },(err, roleDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!roleDB){
            return res.status(400).json({
                ok:false,
                roleDB
            });
        }
        res.status(200).json({
            ok: true,
            roleDB
        });
    });
});

app.delete('/role/:id',verificartoken,(req,res)=>{
    let id = req.params.id;

    let roleState = {
        state: false
    }

    Role.findByIdAndUpdate(id, roleState, {
        new: true,
        runValidators: true
    }, (err, roleDB) => {
        if(err){
            return roleDB.status(500).json({
                ok: false,
                err
            });
        }
        if(!roleDB){
            return roleDB.status(400).json({
                ok: false,
                roleDB
            });
        }
        res.status(200).json({
            ok: true,
            roleDB
        });
    });
});

module.exports = app;