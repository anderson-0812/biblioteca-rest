const express = require('express');
const app = express();
const User = require('../models/user')

const bcrypt = require('bcrypt') // encriptar la contraseña
const verificartoken = require('../middleware/auth'); // importamos herramienta de verificacion


app.get('/user',verificartoken,(req, res) => {
    User.find({'state': true}).exec((err, userDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            userDB
        });
    });
});

app.post('/user',verificartoken,(req, res) => {
    let body = req.body;

    let userToSave = new User({
        ci: body.ci,
        name: body.name,
        lastname: body.lastname,
        mail: body.mail,
        // password: body.password,
        password: bcrypt.hashSync(body.password,10), // estoy encriptando 10 veces al pass
        role: body.role

    });

    userToSave.save((err, userDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!userDB){
            return res.status(400).json({
                ok: false,
                userDB
            });
        }
        res.status(200).json({
            ok: true,
            userDB
        });
    });
});

app.put('/user/:id',verificartoken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let userToEdit = {
        ci: body.ci,
        name: body.name,
        lastname: body.name,
        mail: body.mail,
        // password: body.password,
        password: bcrypt.hashSync(body.password,10), // estoy encriptando 10 veces al pass
        role: body.role
    }

    User.findByIdAndUpdate(id, userToEdit, {
        new: true,
        runValidators: true
    }, (err, userDB) => {

        if(err){
            return userDB.status(500).json({
                ok: false,
                err
            });
        }
        if(!userDB){
            return userDB.status(400).json({
                ok: false,
                userDB
            });
        }
        res.status(200).json({
            ok: true,
            userDB
        });
    });
});

app.delete('/user/:id',verificartoken, (req, res) => {
    let id  = req.params.id;

    let userState = {
        state: false
    }

    User.findByIdAndUpdate(id,userState, {
        new: true,
        runValidators: true
    }, (err, userDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!userDB){
            return res.status(400).json({
                ok: false,
                userDB
            });
        }
        res.status(200).json({
            ok: true,
            userDB
        });
    });
});

module.exports = app