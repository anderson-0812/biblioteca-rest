const jwt = require('jsonwebtoken');

let verificarToken = (req, res, next) => {
    //recuperamos el token que pandamos en los headers
    let token = req.get('token');

    if(token){
        jwt.verify(token, process.env.SEED, (err, result) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: "Token invalido",
                        err
                    }
                });
            }
            // verifica el user
            req.user = result.user;
            next();//la api puede seguir el camino
        });
    }else{
        return res.status(400).json({
            ok: false,
            err:{
                message: "Token was not fount"
            }
        });
    }

}

module.exports = verificarToken;