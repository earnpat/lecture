// main libraly
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// connect database to create model
const db = require('./models');

const app = express();

app.use(bodyParser.json());

db.sequelize.sync({force: true}).then(() => {
    app.listen(3010, () => {
        console.log('server is running')
    })
})