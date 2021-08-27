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
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true
  },https://www.w3schools.com/cssref/tryit.asp?filename=trycss3_background-size5
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    },
  ],
},{ timestamps: { 
  createdAt: 'created_at',
  updatedAt: 'updated_at' 
  }}
);

export const User = mongoose.model("User", user);
