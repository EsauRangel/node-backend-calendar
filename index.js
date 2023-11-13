const express = require('express');
require('dotenv').config();
const { dbConnection } = require("./database/config");
const cors = require("cors");

const app = express();

//Base de datos
dbConnection();


//CORS
app.use(cors());

app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());


//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use("/api/events", require('./routes/events'));



app.listen(process.env.PORT, () => console.log(`Servidor en puerto ${(process.env.PORT)}`));
