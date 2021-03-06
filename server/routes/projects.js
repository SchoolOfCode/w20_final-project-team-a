import express from "express";
import mongoose from "mongoose";
import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/projects/");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4().slice(0, 12) + "_" + file.originalname);
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

export const projectRouter = express.Router();

projectRouter.get("/all", async (req, res) => {
  const allProjects = await Project.find({ approved: true }).populate({
    path: "users",
    model: "User",
  });;
  // .populate({path:"users", model:"User"}); //add this line to convert the user IDs to users
  res.status(200).send(allProjects);
});

projectRouter.get("/update/:id", async (req, res) => {
  const projID = req.params.id.replace(":", "");
  if (mongoose.isValidObjectId(projID)) {
    const proj = await Project.findById(projID);
    const contributors = await proj.contributors;
    for (const contributor of contributors) {
      const user = await User.findOne({ email: contributor });
      if (user) {
        await user.projects.push(projID)
        await user.save();
        await proj.users.push(user._id)
        await proj.save();
      }
    }
    res.status(200).send({
      msg: "Sucessfully linked Projects and Users",
      success: true,
    });
  } else {
    res.status(400).send({
      msg: "Error: Invalid ObjectID",
      success: false,
    });
  }
});

projectRouter.post(
  "/submit",
  upload.array("appImages", 4),
  (req, res, next) => {
    const {
      projectName,
      weekNumber,
      contributors,
      problemStatement,
      additionalInformation,
      githubUrl,
      techUsed,
      appDeploymentUrl,
    } = req.body;

    const URL = req.protocol + "://" + req.get("host");
    const appDeploymentImage =
      URL + "/uploads/projects/" + req.files[0].filename;
    const additionaAppImageURLs = [];
    for (let i = 1; i < req.files.length; i++) {
      additionaAppImageURLs.push(
        URL + "/uploads/projects/" + req.files[i].filename
      );
    }

    Project.findOne({ githubUrl: githubUrl })
      .then((project) => {
        if (project) {
          //project already exists
          res.status(200).send({
            msg: "Project with that GitHub URL already exists",
            success: false,
          });
        } else {
          const newProject = new Project({
            projectName,
            weekNumber,
            contributors,
            problemStatement,
            additionalInformation,
            githubUrl,
            techUsed,
            appDeploymentImage,
            appDeploymentUrl,
            additionaAppImageURLs,
          });

          newProject
            .save()
            .then((project) => {
              res.status(200).send({
                msg: "Project submitted sucessfully",
                success: true,
                project: project._id,
              });
            })
            .catch((err) =>
              res
                .status(200)
                .send({ msg: "Project not submitted", success: false, err })
            );
        }
      })
      .catch((err) =>
        res.status(200).send({ msg: "Project not submitted", success: false })
      );
  }
);

projectRouter.get("/featured", async (req, res) => {
  const featuredProject = await Project.findOne({ featured: true }).populate({
    path: "users",
    model: "User",
  });
  res.status(200).send(await featuredProject);
});

//FILTER

// projectRouter.get("/filtered", asyn (req, res) => {
//   const filteredProjects = await Project.find({})

// })
