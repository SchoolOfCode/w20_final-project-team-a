import mongoose from "mongoose";

const user = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  githubUrl: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
  youtube: {
    type: String,
    required: false,
  },
  personalwebsite: {
    type: String,
    required: false,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  projects: [
    {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      // ref: "Project"
    },
  ],
});

export const User = mongoose.model("User", user);
