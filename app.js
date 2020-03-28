const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const winston = require('winston');
const error = require('./common/error');
const authRoutes = require('./routes/index');
require('winston-mongodb');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/authservice', authRoutes);
app.use(error);

winston.add(new winston.transports.File({filename:"logAuth.log"}));
winston.add(new winston.transports.MongoDB({db: process.env.DB_CONNECTION}));

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>{
        console.log("DB Connected");
        winston.info("DB Connected");
    })
    .catch((err) =>{
        console.log("Error in connecting the DB.");
        winston.error(err.message, err);
    })
if(process.env.NODE_ENV == 'test')
{
    app.listen(process.env.SERVICE_PORT);
    console.log("Listening to the Port : " + process.env.SERVICE_PORT);
}

//module.exports = app;