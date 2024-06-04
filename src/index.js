const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));  


//conexión a bbdd
const { dbConnection } = require('./config/db');
const routes = require('./routes/productRoutes');
app.use('/', routes);

dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
