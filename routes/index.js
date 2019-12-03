const express = require('express');
const app = express();
const bodyParser = require('body-parser');

console.log('\nTenemos armada nuestra estructura base\n');

// Agregamos las direcciones
app.use(require('./user'));
app.use(require('./role'));
app.use(require('./petitioner'));
app.use(require('./libraryResource'));

module.exports = app;