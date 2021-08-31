import express from "express";

export const authRouter = express.Router();


authRouter.get("/check", (req, res, next) => {
  console.log(req.session)
  if (req.isAuthenticated()){
    console.log("Authenticated!")
    res.status(200).send({msg:"logged In", success: true})
  } else{
    res.status(401).send({msg:"Not logged In", success: false})
  }
});

