const express = require('express');
const app = express();
const bodyParser = require('body-parser');

console.log('\nTenemos armada nuestra estructura base\n');

// Agregamos las direcciones
app.use(require('./user'));
app.use(require('./role'));

module.exports = app;