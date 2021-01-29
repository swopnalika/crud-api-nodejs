const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createJWT } = require("../utils/authUtils");

const signup = (req, res, next) => {
  let { firstName, lastName, email, password, password_confirmation } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res
          .status(422)
          .json({ errors: [{ user: "email already exists" }] });
      } else {
        const saltRounds = 10;
        bcrypt
          .hash(password, saltRounds)
          .then((passwordHash) => {
            let user = new User({
              firstName,
              lastName,
              email,
              password: passwordHash,
            });
            user
              .save()
              .then((newUser) => {
                return res.status(201).json(newUser);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
    });
};

const signin = (req, res, next) => {
  let { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        const passwordCorrect = bcrypt
          .compare(password, user.password)
          .then((passwordCorrect) => {
            if (passwordCorrect) {
              let access_token = createJWT(user.email, user._id, 3600);
              return res.status(200).json({
                success: true,
                user: user._id,
                token: access_token,
              });
            } else {
              return res.status(403).json({
                error: "Incorrect password",
              });
            }
          })
          .catch((err) => console.log(err));
      } else {
        return res.status(404).json({
          errors: [{ user: "not found" }],
        });
      }
    })
    .catch((err) => console.log(err));
};


module.exports = {
  signup,
  signin,
};
