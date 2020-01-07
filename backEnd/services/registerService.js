const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../config/passport/passport");

module.exports = (app, db) => {
  app.get("/users", (req, res) => {
    db.user
      .findAll()
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(400).json({ message: err.message });
      });
  });

  app.post("/register", (req, res, next) => {
    passport.authenticate("register", (err, users, info) => {
      if (err) {
        console.error(err);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send(info.message);
      } else {
        db.user
          .findOne({ where: { username: users.username } })
          .then(userFound => {
            userFound
              .update({
                user_id: req.body.user_id,
                username: req.body.username,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                birth: req.body.birth,
                email: req.body.email,
                address: req.body.address,
                tel: req.body.tel,
                role: "user"
              })
              .then(() => {
                console.log("user created in db");
                res.status(200).send({ message: "user created" });
              })
              .catch(err => console.log(err));
          })
          .catch(err => {
            console.error(err);
            res.status(400).send({ message: err.message });
          });
      }
    })(req, res, next);
  });

  app.post("/login", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
      if (err) {
        console.error(err);
      }
      if (info !== undefined) {
        console.error(info.message);
        if (info.message === "username or password is incorrect.") {
          res.status(401).send({ message: info.message });
        } else {
          res.status(400).send(info.message);
        }
      } else {
        const token = jwt.sign(
          { 
            id: user.user_id,
            role: user.role,
            name: user.username,
          },
          config.jwtOptions.secretOrKey,
          { expiresIn: 3600 }
        );
        res.status(200).send({
          auth: true,
          token,
          message: "user found & logged in"
        });
      }
    })(req, res, next);
  });

  // app.put('/boat/:id', (req, res) => {
  //     db.boat.update(
  //         {
  //             name: req.body.name,
  //             color: req.body.color
  //         },
  //         {
  //             where: { id: req.params.id }
  //         }
  //     ).then((result) => {
  //         res.status(201).json('update success')
  //     }).catch((err) => {
  //         res.status(400).json('update error')
  //     })
  // })
  // app.delete('/boat/:id', (req, res) => {
  //     db.boat.destroy(
  //         {
  //             where: { id: req.params.id }
  //         }
  //     ).then((result) => {
  //         res.status(204).json('delete success')
  //     }).catch((err) => {
  //         res.status(400).json('delete error')
  //     })
  // })
};
