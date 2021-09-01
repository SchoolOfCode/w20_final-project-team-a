import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from "bcryptjs";

//Load user model
import { User } from "../models/user.model.js";

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
    //user id will be saved in the session, later used to retrieve 
    //the whole user object from deserializer function
    //serialize user determines which part of the user object to store
    //result is attached to the session as req.session.passport.user = {id: "me"}
    //pass the user object to passport.logIn

  });

  passport.deserializeUser((id, done) => {
    //pass in key of the user object that was given to the done function
    //key matched with the database and fetched object is attached as
    //req.user
    //deserialize user is called when a request is sent with a session cookie
    //containing the serialized user id
    User.findById(id, (err, user) => {
      if(err) {
        console.log("error:",err)
        return done(err)
      } else {
        console.log(id,user)
        done(null,user);
      }
    });
  });

export default passport;