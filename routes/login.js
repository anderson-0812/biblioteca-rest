// ocupamos la dependencia  instalada jsonwebtoken
const express = require('express');
const app = express();
const User = require('../models/user');

const bcrypt = require('bcrypt'); // encriptar la contraseña
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
    let body = req.body;
    // console.log(body);
    User.findOne({
        mail: body.mail
    }, (err, result) => {
        // console.log(result);
        if(err){
            return res.status(500).josn({
                ok: false,
                err
            });
        }
        if(!result){
            return res.status(400).json({
                ok: false,
                result,
                message: 'User was not found'
            });
        }
        // Comparamos el registro del post con el de la base
        const match = bcrypt.compareSync(body.password, result.password);
        console.log(body.password);
        console.log(result.password);
        console.log(match);
        // console.log(hash);
        // firmamos un token
        if(match){
            // Creamos el token
            let token = jwt.sign({
          // con jwt usando process.env.SEED estamos pasando o  lavemaestra la firma
            user: result
            }, process.env.SEED,{
          // le damos un tiempo de vidda al token
            expiresIn: process.env.CADUCIDAD
            });

            res.json({
                ok: true,
                usuario: result,
                token
            });
        }else{
            return res.status(401).json({
                ok: false,
                err: {
                    message: "The compare's password not is valid"
                }
            });
        }
    });
});

module.exports = app;