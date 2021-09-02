import express from "express";
import { User } from "../models/user.model.js";

export const authRouter = express.Router();

authRouter.get("/check", (req, res, next) => {
  if (req.isAuthenticated()){
    User.findOne({_id: req.session.passport.user}, {password: 0, updated_at:0, __v: 0})
    .then(user=> res.status(200).send({msg:"logged In", success: true, user:user}))
    .catch(err=>res.status(401).send({msg:err, success: false}))
  } else{
    res.status(401).send({msg:"Not logged In", success: false})
  }
});

