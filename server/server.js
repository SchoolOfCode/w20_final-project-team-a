import express from "express";
import dotenv from "dotenv";
//Database
import mongoose from "mongoose";
import { MongoDB } from "./configs/keys.js";
// Authentication
import session, { MemoryStore } from "express-session"; //stores user data in cookies
import MongoStore from "connect-mongo";
import passport from "passport"; //to handle authentication
import { passportStrategy } from "./configs/passport.js";

import cors from "cors";
//Routes
import { userRouter } from "./routes/users.js";
import { projectRouter } from "./routes/projects.js";
import { authRouter } from "./routes/auth.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3001;

//DB Config
const db = MongoDB.MongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true,  })
  .then(() => console.log("CONNECTED!"))
  .catch((err) => console.log(err));

//Midlewares
//make uploads folder available publically/to react
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
    store: MongoStore.create({
      mongoUrl:MongoDB.MongoURI,
      ttl: 1000*24*60 //1hour
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
      maxAge:1000*60*60*24
    }
  })
);


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//passport config
passportStrategy(passport);

//Routes

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
