import express from "express";
import dotenv from "dotenv";
import path from "path";
import { __dirname } from "./serverConfig.js";

import mongoose from "mongoose";
import { MongoDB } from "./configs/keys.js";
import flash from "connect-flash";
import session from "express-session";
import passport from "passport";
import { passportStrategy } from "./configs/passport.js";
import cors from "cors";
import cookieParser from "cookie-parser"; //no longher need cookie-parser with express-session

//Routes
// import { indexRouter } from "./routes/index.js";
import { userRouter } from "./routes/users.js";
// import { projectRouter } from "./routes/projects.js";

const app = express();
const env = dotenv.config();
const PORT = process.env.PORT || 3000;

//DB Config
const db = MongoDB.MongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("CONNECTED!"))
  .catch((err) => console.log(err));

//Midlewares
//make uploads folder available
app.use("/uploads", express.static("uploads"));
//CORS
app.use(
  cors({
    origin: "*", //or hosted location of the react app
    credentials: true,
  })
);

//Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

//cookie parser
app.use(cookieParser(process.env.SESSION_SECRET));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//passport config
passportStrategy(passport);

//Connect flash middleware - gives access to request.flash
app.use(flash());

//Global variables
//allows storage of messages in the session
app.use((req, res, next) => {
  res.locals.sucess_msg = req.flash("sucess_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Routes
// app.use('/', indexRouter)
app.use("/api/users", userRouter);
// app.use('/projects', projectRouter)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
