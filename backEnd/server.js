// main libraly
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// connected database to create model
const db = require("./models");

const registerService = require("./services/registerService");
const productService = require("./services/productService");

const app = express();

app.use(express.static("uploads"));
app.use(
  fileUpload({
    createParentPath: true
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.sequelize.sync({ force: false }).then(() => {
  registerService(app, db);
  productService(app, db);

  app.listen(8080, () => {
    console.log("server is running");
  });
});
