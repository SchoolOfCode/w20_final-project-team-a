import mongoose from "mongoose";

const project = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    weekNumber: {
      type: Number,
      required: true,
    },
    contributors: [
      {
        type: String,
        required: true,
      },
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    problemStatement: {
      type: String,
      required: true,
    },
    additionalInformation: {
      type: String,
      required: true,
    },
    githubUrl: {
      type: String,
      required: true,
      unique: true,
    },
    techUsed: [
      {
        type: String,
        required: false,
      },
    ],
    appDeploymentImage: {
      type: String,
      required: false,
    },
    appDeploymentUrl: {
      type: String,
      required: true,
    },
    additionaAppImageURLs: [
      {
        type: String,
        required: false,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const Project = mongoose.model("Project", project);

// {
//     "projectName": "project test",
//     "weekNumber": 1,
//     "contributors": ["becks@becks.ninja", "lewis@lewis.ninja"],
//     "problemStatement": "life is hard" ,
//     "additionalInformation": "and it just gets harder" ,
//     "githubUrl": "changeyourlife.com",
//     "techUsed": ["html" , "css"],
//     "appDeploymentImage": "random string",
//     "appDeploymentUrl": "another random string",
//     "additionalAppData": [{
//                "additionalImages": "random string1",
//                "additionalUrls": "another random string1"
//       },{
//             "additionalImages": "random string2",
//             "additionalUrls": "another random string2"
//       },{
//             "additionalImages": "random string3",
//             "additionalUrls": "another random string3"
//       }],
//        "featured":true,
//        "approved":true
//    }
