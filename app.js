require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    app.set('json spaces', 2);
}

app.use(cors());

module.exports = app;
