require('./config/config.js')// Importo la configuracion hecha antes
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose'); // es elestandar de orm para mongodb
const app = express()
const bodyParser = require('body-parser')

// Middleware
//definimos el formato que va,os a ocupar
//app.use(bodyParser.json);

//es un standar para evitar un error de acceso a rutas en la etapa de desarrollo
app.use(cors());
// es un atribiuto de seguridad
app.use(bodyParser.urlencoded({
  extended:false
}))

app.use(bodyParser.json());
// definimos nuestra hoja de rutas (index)
app.use (require('./routes/index'))

mongoose.connect(process.env.URLDB,{ //process.env.URLDB =>  de esta manera va cuando ya tenemos configurado nuestro archivo config con la DB
  useUnifiedTopology: true,
  useNewUrlParser: true
},(err, res)=>{
  if(err) throw error;
  console.log(`Mongo is working ${6 + 7}`);
})
console.log('Desde server la url de la db '+ process.env.URLDB);

// sola esta linea es para heroku
app.listen(process.env.PORT,() => console.log(`Corriendo in the port ${process.env.PORT}!`))
