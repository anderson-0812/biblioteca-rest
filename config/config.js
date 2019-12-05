
// Definimos configuracion de bases de datos, entornos de desarrollo (devep or production),
// tokens y puertos

// varibles let and const are used in edmascript6 es6
// Let funciona netamente dentro del bloque q crea
// var te permite cometer errores ya q la variable puede ser reasiganda donde no debe
// si no declaras es peor se declara la variable anivel de wondows.object (puedes reasiganr valores sind arte cuenta)

let urlDB;

// process es un obj global q ayuda al control de proceso actual de node
process.env.ENV = 'dev'

if(process.env.ENV == 'dev'){
    urlDB = 'mongodb://localhost:27017/biblioteca';

    console.log('Estas en ambiente de desarrollo '+urlDB)
}else{
    //Encuentra la variable de configuración heroku.
    urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB

// le digo que en caso de que tengamos puerto en heroku coja ese o si no 3500
process.env.PORT = process.env.PORT || 3000;
console.log(`Puerto ${process.env.PORT}`)

// Configuro mi Token
process.env.SEED = process.env.SEED || "jwtsecretdev" // damos un nombre para la palabra firma o clave secreta q necesita jwt
process.env.CADUCIDAD = process.env.CADUCIDAD || "30s" // 1d definimos el tiempo de expiracion
