import express from "express";
import dotenv from "dotenv";
//Database
import mongoose from "mongoose";
import { MongoDB } from "./configs/keys.js";
// Authentication
import session from "express-session"; //stores user data in cookies
import MongoStore from "connect-mongo";
// import passport from "passport"; //to handle authentication
import passport from "./configs/passport.js";

import cors from "cors";
//Routes
import { userRouter } from "./routes/users.js";
import { projectRouter } from "./routes/projects.js";
import { authRouter } from "./routes/auth.js";


const app = express();
dotenv.config();
const PORT = process.env.PORT || 3001;

const db = await mongoose.connect(MongoDB.MongoURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex:true
})
// db.connection.on('connected',()=> console.log("Connected to the DB") )

//Midlewares
//make uploads folder available publically/to react
app.use("/uploads", express.static("uploads"));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
//CORS
app.use(
  cors({
    origin: "http://localhost:3000", //or hosted location of the react app
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
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
      client: db.connection.getClient(),
      ttl: 1000*24*60 //1hour
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge:1000*60*60*24
    }
  })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
