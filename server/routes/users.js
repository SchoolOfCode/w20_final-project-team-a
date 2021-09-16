import express from "express";
import passport from "passport";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const userRouter = express.Router();

//Handle Signup
userRouter.post("/signup", (req, res) => {
  const { email, displayName, password, confirmPassword } = req.body.formData;
  let errors = [];

  //Check required fields
  if (!email || !displayName || !password || !confirmPassword) {
    errors.push({ msg: "Please complete all fields" });
  }

  //Check passwords match
  if (password !== confirmPassword) {
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
          errors.push({ msg: "That email is already registered!" });
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

userRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", {session: true}, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(200).send(info);
    }
    req.logIn(user, (err)=>{
      if (err) return next(err);
      req.session.email = user.email;
      req.session.displayName = user.displayName;
      req.session.role = user.role;
      req.session.isAuth = true;
      let userTemp = {...user._doc}
      delete userTemp.password
      res.status(200).send({msg:`Logging in as ${user.displayName}`, success: true, user: userTemp})
      }
    )
  })(req, res, next);
});

//Handle logout
userRouter.get("/logout", (req, res) => {
  req.logOut();
  res.clearCookie('connect.sid');
  req.session.destroy((err)=>{
    res.status(200).send({msg:"You have been sucessfully logged out", success: true});
  });
});

//Get user data

userRouter.get("/all", async (req, res) => {
  const allUsers = await User.find({ role: "user"},{password: 0, updated_at:0, __v: 0});
  res.status(200).send(allUsers);
});


userRouter.get("/individual/:id", async(req,res) => {
  const userID =req.params.id.replace(":","")
  const user = await User.findById(userID,{password: 0, updated_at:0, __v: 0})
                      .populate({path:"projects", model:"Project"})
  if (user) {
    res.status(200).send({
      msg: user,
      success: true,
    })
    } else{
      res.status(400).send({
        msg: "Unable to find any projects associated with that user",
        success: false,
      })
    }
  

})