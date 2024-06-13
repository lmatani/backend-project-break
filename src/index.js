const express = require('express');
require('express-async-errors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));  

//conexión a bbdd
const { dbConnection } = require('./config/db');
dbConnection();

const routes = require('./routes/productRoutes');
app.use('/', routes);
app.use(require('./middlewares/errors'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
