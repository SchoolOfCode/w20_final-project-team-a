import express from "express";
import { User } from "../models/user.model.js";
import { Project } from "../models/project.model.js";

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

authRouter.get("/admin/list", (req, res, next) => {
  if (req.isAuthenticated()){
    Project.find({}).populate({path:"users", model:"User"})
    .then(projects=> res.status(200).send({msg:"Projects retrieved and populated", success: true, projects:projects}))
    .catch(err=>res.status(401).send({msg:err, success: false}))
  } else{
    res.status(401).send({msg:"Please Login First", success: false})
  }
});

authRouter.put("/admin/update", (req, res, next) => {
  if (req.isAuthenticated()){
    Project.find({}).populate({path:"users", model:"User"})
    .then(projects=> res.status(200).send({msg:"Projects retrieved and populated", success: true, projects:projects}))
    .catch(err=>res.status(401).send({msg:err, success: false}))
  } else{
    res.status(401).send({msg:"Please Login First", success: false})
  }
});

authRouter.delete("/admin/delete", (req, res, next) => {
  if (req.isAuthenticated()){
    Project.deleteMany({_id:req.body})
    .then(()=> res.status(200).send({msg:"Projects Removed", success: true}))
    .catch(err=>res.status(401).send({msg:err, success: false}))
  } else{
    res.status(401).send({msg:"Please Login First", success: false})
  }
});