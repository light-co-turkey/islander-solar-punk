const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const crypto = require('crypto');

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(keys.SENDGRID_API_KEY);

var ObjectId = require('mongodb').ObjectID;

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const { stringify } = require("querystring");


// @route Get User
router.get('/get_user/:userId', (req, res) => {
  let userId = req.params.userId
  User.findOne({ "_id": mongoose.Types.ObjectId(userId) }, {_id: 1, name: 1, surname: 1, email: 1, username: 1}, (error, data) => {
    if (error) {
      return console.log(error)
    } else {
      res.json(data)
    }
  })
});

// @route Get Users List
router.get('/get_all_users/', (req, res) => {
  User.find({}, { _id: 1, name: 1, surname: 1, username: 1 }, (error, data) => {
    if (error) {
      return res.json(error)
    } else {
      res.json(data)
    }
  })
});

// @route Get Single User Field
router.get('/get_user_field/:userId', (req, res) => {
  const userId = req.params.userId
  User.find({ _id: mongoose.Types.ObjectId(userId) }, { [req.body.field]: 1 }, (error, data) => {
    if (error) {
      return console.log(error)
    } else {
      res.json(data)
    }
  })
});

//Post Single User Field
router.post('/post_user_field/:userId', (req, res) => {
  const userId = req.params.userId
  User.updateMany({ _id: mongoose.Types.ObjectId(userId) },
    {
      $set: {
        [req.body.field]: req.body.value
      }
    })
    .then(() => res.json('Advisors updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @desc Register user
router.post("/signup", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.find({ $or: [{ email: req.body.email }, { username: req.body.username }] }, { email: 1, username: 1 })
    .then(user => {
      let usernames = [];
      let emails = []
			user.map((item) => {
				usernames.push({
          username: item.username
				});
				emails.push({
          email: item.email
				});
			});
      if (emails[0]) {
        return res.status(400).json({ email: "Email already exists" });
      } else if (usernames[0]) {
        return res.status(400).json({ username: "Username already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          surname: req.body.surname,
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
        });

        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.find({ $or: [{ email: req.body.email }, { username: req.body.email }] })
  .then(userr => {
    let user = userr[0]
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email / Username not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/reset-pwd", (req, res) => {
  const body = req.body
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        console.log("simple check of the error source");
        return res.json({ error: "No User exists with that email", user, body });
      }

      user.resetToken = token;
      user.expirationToken = Date.now() + 600000; // 10min in ms
      user.save().then((result) => {
        // this section will be fully functional after adding the SendGrid API Key
        // in order to use this feature
        // the following is an example of Email template

        const msg = {
          from: "no-reply@avatar-finance.com",
          to: user.email,
          subject: "Password Reset",
          html: `
           <p>A request has been made to change the password of your account </p>
					 <h5>click on this <a href="avatar-finance.com/#/reset/${token}">link</a> to reset your password</h5>
					 <p> Or copy and paste the following link :</p>
					 <h5>"avatar-finance.com/#/reset/${token}"</h5>`,
        };
        sgMail.send(msg);

        res.json({ message: "check your Email Inbox" });
      });
    });
  });
});

router.post("/new-pwd", (req, res) => {
  const Password = req.body.password;
  const Token = req.body.token;
  User.findOne({ resetToken: Token, expirationToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Session expired ! Try Again with a new Request" });
      }
      bcrypt.hash(Password, 12).then((HashPwd) => {
        user.password = HashPwd;
        user.resetToken = undefined;
        user.expirationToken = undefined;
        user.save().then((result) => {
          res.json({ message: "Password Updated successfully" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
