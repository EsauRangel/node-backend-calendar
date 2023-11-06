const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());
//Rutas
app.use('/api/auth', require('./routes/auth'));
//TODO: auth, crear, login, renew





app.listen(process.env.PORT, () => console.log(`Servidor en puerto ${(process.env.PORT)}`));
