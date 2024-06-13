const express = require('express');
require('express-async-errors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

const config = require('./config/firebase.js');
config.app;

const session = require('express-session');

app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));  

//conexión a bbdd
const { dbConnection } = require('./config/db');
dbConnection();

const routes = require('./routes/productRoutes');
app.use('/', routes);
const auth = require('./routes/authRoutes');
app.use('/', auth);
app.use(require('./middlewares/errors'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
