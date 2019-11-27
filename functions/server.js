const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//Route Files
const bootcamps = require('./routes/bootcamps');
const firebase = require('./routes/firebase');

//Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());

//dev Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/firebase', firebase);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
