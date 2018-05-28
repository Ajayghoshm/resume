var express = require('express');
var router = express.Router();
const moongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
var flash = require('connect-flash');

router.use(flash());
//load  model 
require("../models/user")
user = moongoose.model('users')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get("/signin",(req,res) =>{
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {

  let errors = [];
  //.mec checking
  var regex = /^\w+([\._]?\w+)+\.+(mec@gmail.com)+$/
  if (!regex.test(req.body.email)) {
    errors.push({ text: "email invalid" });
  }
  //password validation lengh >4

  if (req.body.password.length < 4) {
    errors.push({ text: "password length should be greter than 4" });
  }
  if (req.body.password2 != req.body.password) {
    errors.push({ text: "passwords don't match" });
  }

  //if error
  if (errors.length > 0) {
    res.render("signup", {
      errors: errors,
      email: req.body.email,
      password: req.body.password
    });
  } else {
    user.findOne({ email: req.body.email })
      .then(user => {
        if (user){
         // req.flash("sucess_msg","register");
          res.redirect("../users/signin")
        }
        else{
          const newUser = new user({
            email: req.body.email,
            password: req.body.password
          })
          bcrypt.genSalt(10, (error, salt) => {

            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                 // req.flash("sucess","register");
                  res.redirect("../users/signin")
                }).catch(err => {
                  console.log(err);
                  return;
                })
            })
          })
        }
      })

  }
  console.log(req.body);
});

module.exports = router;
