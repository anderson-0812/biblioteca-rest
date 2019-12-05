const jwt = require('jsonwebtoken');

let verificarToken = (req, res, next) => {
    let token = req.get('token');

    if(token){
        jwt.verify(token, process.env.SEE, (err, result) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: "Token invalido"
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