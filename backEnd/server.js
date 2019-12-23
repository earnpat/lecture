// main libraly
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors')


// connect database to create model
const db = require('./models');

const registerService = require('./services/registerService')
const uploadService = require('./services/uploadService')

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

db.sequelize.sync({force: false}).then(() => {
    registerService(app, db);
    uploadService(app, db);

    app.listen(8080, () => { console.log('server is running') })
})