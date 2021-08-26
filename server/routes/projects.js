import express from "express";
import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg" ||file.mimetype === "image/gif" ) {
    cb(null, true);//stores the file
  } else {
    cb(null, false);// equals ignore the file without erroring
    return cb(new Error('Only .png, .jpg, .jpeg and .gif formats are allowed!'));
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

// projectRouter.get("/all", async (req, res) => {
//   const allProjects = await Project.find({});
//   res.status(200).send(allProjects);
// });

projectRouter.post("/submit", upload.single("appImage"), (req, res, next) => {
  
  const {
    projectName,
    weekNumber,
    contributors,
    problemStatement,
    additionalInformation,
    githubUrl,
    techUsed,
    appDeploymentUrl,
    // additionalAppData,
  } = req.body;

  const URL = req.protocol + "://" + req.get('host')
  const appDeploymentImage = URL +'uploads/' + req.file.filename;

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
          // additionalAppData,
        });

        // contributors.map((email) => {
        //   console.log(email);
        //   User.findOneAndUpdate(
        //     { email: email },
        //     { $push: { projects: githubUrl } },
        //     (err, success) => {
        //       if (err) console.log(err);
        //       else console.log(success);
        //     }
        //   );
        //   newProject.users.push(email);
        //   return console.log("we hate typescript");
        // });

        newProject
          .save()
          .then((project) => {
            res
              .status(200)
              .send({ msg: "Project submitted sucessfully", success: true, project })
          })
          .catch((err) =>
            res
              .status(200)
              .send({ msg: "Project not submitted", success: false, err})

          );
      }
    })
    .catch((err) =>
      res.status(200).send({ msg: "Project not submitted", success: false })
    );
});
