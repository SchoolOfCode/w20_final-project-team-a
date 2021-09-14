import express from "express";
import { User } from "../models/user.model.js";
import { Project } from "../models/project.model.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/profiles/");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4().slice(0,12) + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true); //stores the file
  } else {
    cb(null, false); // equals ignore the file without erroring
    return cb(
      new Error("Only .png, .jpg, .jpeg and .gif formats are allowed!")
    );
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //files up to 5mb
  },
  fileFilter: fileFilter,
});

export const authRouter = express.Router();

authRouter.get("/check", (req, res, next) => {
  if (req.isAuthenticated()){
    User.findOne({_id: req.session.passport.user}, {password: 0, updated_at:0, __v: 0})
    .then(user=> res.status(200).send({msg:"logged In", success: true, user:user}))
    .catch(err=>res.status(400).send({msg:err, success: false}))
  } else{
    res.status(400).send({msg:"Not logged In", success: false})
  }
});

authRouter.get("/admin/list", (req, res, next) => {
  if (req.isAuthenticated()){
    Project.find({}).populate({path:"users", model:"User"})
    .then(projects=> res.status(200).send({msg:"Projects retrieved and populated", success: true, projects:projects}))
    .catch(err=>res.status(400).send({msg:err, success: false}))
  } else{
    res.status(400).send({msg:"Please Login First", success: false})
  }
});

authRouter.put("/admin/update", (req, res, next) => {
  if (req.isAuthenticated()){
    const projectList = req.body;
    const errors = [];

    projectList.forEach(project=>{
      Project.findByIdAndUpdate(project._id, {"$set": {approved:project.approved,featured:project.featured}})
      .catch(err=>errors.push(err))
    })

    if (errors.length === 0){
      res.status(200).send({msg:"All Projects Updated Successfully", success: true})
    } else{
      res.status(400).send({msg:errors, success: false})
    }
  } else{
    res.status(400).send({msg:"Please Login First", success: false})
  }
});

authRouter.delete("/admin/delete", (req, res, next) => {
  if (req.isAuthenticated()){
    Project.deleteMany({_id:req.body})
    .then(()=> res.status(200).send({msg:"Projects Removed", success: true}))
    .catch(err=>res.status(400).send({msg:err, success: false}))
  } else{
    res.status(400).send({msg:"Please Login First", success: false})
  }
});

//User Dashboard Auth Routes

authRouter.put("/user/update",upload.array("newProfilePhoto", 1), async(req,res) => {
  if (req.isAuthenticated()){
        let {
          _id,
          displayName,
          photo,
          githubUrl,
          linkedin,
          twitter,
          youtube,
          personalWebsite,
          cohort,
          location,
          statement,
        } = req.body;
      
        const URL = req.protocol + "://" + req.get("host");
        if (req.files.length > 0){
          photo = URL + "/uploads/profiles/" + req.files[0].filename;
        }
        if(!photo && req.files.length < 1){
          photo = URL + "uploads/profiles/defaultProfilePhoto.png"
        }
        User.findByIdAndUpdate(_id, 
          {"$set": {
            displayName,
            photo,
            githubUrl,
            linkedin,
            twitter,
            youtube,
            personalWebsite,
            cohort,
            location,
            statement,
          }},
          {upsert: true,
          new:true}
          )
          .then(user => res.status(200).send({msg:"User Updated", success: true, user: user}))
          .catch(err =>res.status(400).send({msg:err, success: false}))
    
  } else{
    res.status(401).send({msg:"Please Login First", success: false})
  }
})
