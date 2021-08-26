import express from "express";
import dotenv from "dotenv";

import mongoose from "mongoose";
import { MongoDB } from "./configs/keys.js";
import session from "express-session"; //stores user data in cookies
import passport from "passport"; //to handle authentication
import { passportStrategy } from "./configs/passport.js";
import cors from "cors";
import cookieParser from "cookie-parser"; //no longher need cookie-parser with express-session

//Routes
// gets appropriate route file
// import { indexRouter } from "./routes/index.js";
import { userRouter } from "./routes/users.js";
import { projectRouter } from "./routes/projects.js";
import { authRouter } from "./routes/auth.js";

const app = express();
dotenv.config();
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


//Routes
app.use('/api/auth', authRouter)
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
