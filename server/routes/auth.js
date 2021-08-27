import express from "express";
import passport from "passport";
import { User } from "../models/user.model.js";


export const authRouter = express.Router();

//use the local strategy -first argument to passport.authenticate
authRouter.get("/check", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(200).send(info);
    }
    return res.status(200).send(user);
  })(req, res, next);
});

