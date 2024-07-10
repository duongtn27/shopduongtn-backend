require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const checkOverload = require('./helpers/check.connect');

const app = express();

//init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
// checkOverload()
//init db
require('./databases/init.mongodb')

//init routes

module.exports = app;