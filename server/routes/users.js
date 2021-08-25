import express from "express";
import passport from "passport";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const userRouter = express.Router();

// userRouter.get('/login', (req,res)=>{
//     res.send('login')
// })

// userRouter.get('/signup', (req,res)=>{
//     res.send('signup')
// })

//Handle Signup
userRouter.post("/signup", (req, res) => {
  const { email, displayName, password, password2 } = req.body;
  let errors = [];

  //Check required fields
  if (!email || !displayName || !password || !password2) {
    errors.push({ msg: "Please complete all fields" });
  }

  //Check passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  //Check password is >= 6 characters
  if (password.length < 6) {
    errors.push({ msg: "Password must be 6 characters or more" });
  }

  if (errors.length > 0) {
    res.status(200).send({ msg: errors, success: false });
  } else {
    //validation passed
    User.findOne({ email: email })
      .then((user) => {
        //if the user exists, re-render the registration form
        //keep the old values to allow editing
        if (user) {
          //user exists already
          errors.push({ msg: "Email is already registered!" });
          res.status(200).send({ msg: errors, success: false });
        } else {
          //create a user, encrypt the password
          const newUser = new User({
            email,
            displayName,
            password,
          });
          //generate salt to create a hash
          bcrypt.genSalt(10, (err, salt) => {
            //generate hash from the password and salt
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              //check for any error
              if (err) {
                console.error(err);
                errors.push({
                  msg: "Submission Error. Please try again or contact an administrator",
                });
                throw err;
              }

              //set pasword to the generated hash
              newUser.password = hash;
              //save the user - returns a promise
              //if saved, redirect to the login page
              newUser
                .save()
                .then((user) => {
                  res.status(200).send({
                    msg: "You are now registered and can login",
                    success: true,
                  });
                })
                .catch((err) => console.error(err));
            });
          });
        }
      })
      .catch((err) => console.error(err));
  }
});

//Handle Login
//use the local strategy -first argument to passport.authenticate
userRouter.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send({ msg: "Successfully logged in!", success: true });
});

//Handle logout
userRouter.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out!");
  res.redirect("/users/login");
});
