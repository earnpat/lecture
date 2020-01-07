const _ = require("lodash");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../config/passport/passport");

module.exports = (app, db) => {
  app.get("/products", (req, res) => {
    db.product
      .findAll({ include: [db.images] })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(400).json({ message: err.message });
      });
  });

  // app.post("/upload", (req, res) => {
  //   db.images
  //     .create({
  //       image_url_1: req.body.image_url_1,
  //       image_url_2: req.body.image_url_2,
  //       image_url_3: req.body.image_url_3,
  //       image_url_4: req.body.image_url_4,
  //     })
  //     .then(result => {
  //       console.log(result);
  //       db.product.create({
  //         images_id: result.images_id,
  //         product_id: req.body.product_id,
  //         product_name: req.body.product_name,
  //         price: req.body.price,
  //         detail: req.body.detail,
  //         category: req.body.category
  //       });

  //       res.status(201).json(result);
  //     })
  //     .catch(err => {
  //       res.status(400).json({ ErrorMessage: err.message });
  //     });
  // });

  app.post(
    "/upload",
    passport.authenticate("jwt", {
      session: false
    }),
    async (req, res) => {
      console.log(req.user, "😁😁")
      if (req.user.role === "admin") {
        await db.images
          .create({
            image_url_1: req.body.image_url_1,
            image_url_2: req.body.image_url_2,
            image_url_3: req.body.image_url_3,
            image_url_4: req.body.image_url_4,
          })
          .then(result => {
            res.status(201).json(result);
            db.product.create({
              images_id: result.images_id,
              product_id: req.body.product_id,
              product_name: req.body.product_name,
              price: req.body.price,
              detail: req.body.detail,
              category: req.body.category
            });
          })
          .catch(err => {
            console.error(err);
            res.status(400).json({ ErrorMessage: err.message });
          });
      } else {
        res.status(401).send({
          message: "Unauthorized"
        });
      }
    }
  );


  app.post("/upload-photo", async (req, res) => {
    try {
      if (!req.files) {
        res.send({
          status: false,
          message: "No file uploaded"
        });
      } else {
        //Use the name of the input field (i.e. "photo") to retrieve the uploaded file
        let photo = req.files.photo;
        let photoName = new Date().getTime() + ".jpeg";

        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        photo.mv("./uploads/" + photoName);

        //send response
        res.send({
          status: true,
          message: "File is uploaded",
          data: {
            name: photoName,
            mimetype: photo.mimetype,
            size: photo.size
          }
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
};
