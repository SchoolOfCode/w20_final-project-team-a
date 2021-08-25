import passportLocal from "passport-local";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//Load user model
import { User } from "../models/user.model.js";

const LocalStrategy = passportLocal.Strategy;

export const passportStrategy = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //Match user
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            //done - 1st param is error,
            return done(null, false, {
              message: "That email is not registered",
            });
          }
          //Match the password against the db
          bcrypt.compare(password, user.password, (err, isMatched) => {
            if (err) {
              console.error(err);
              throw err;
            }
            if (isMatched) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect Password" });
            }
          });
        })
        .catch((err) => console.error(err));
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
