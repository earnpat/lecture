const _ = require("lodash");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../config/passport/passport");

module.exports = (app, db) => {
  app.get("/shoppingcart",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      db.shopcart
        .findAll()
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          res.status(400).json({ message: err.message });
        });
    });

  app.post(
    "/shoppingcart",
    passport.authenticate("jwt", {
      session: false
    }),
    async (req, res) => {
      console.log(req.user, "😁😁")
      if (req.user.role === "user") {
        await db.shopcart
          .create({
            // image_url_1: req.body.image_url_1,
            // image_url_2: req.body.image_url_2,
            // image_url_3: req.body.image_url_3,
            // image_url_4: req.body.image_url_4,
          })
          .then(result => {
            res.status(201).json(result);
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


  app.delete('/deleteinshopcart/:id',
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      db.shopcart.destroy(
        {
          where: { id: req.params.id }
        }
      ).then((result) => {
        res.status(204).json('delete success')
      }).catch((err) => {
        res.status(400).json('delete error')
      })
    })


};
