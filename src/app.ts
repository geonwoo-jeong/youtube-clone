/* tslint:disable:ordered-imports */
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import ConnectMongo from "connect-mongo";
import expressSession from "express-session";
import flash from "express-flash";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import path from "path";
import { localMiddlewares } from "./middlewares";
import { globalRouter, userRouter, videoRouter } from "./Routers";
import routes from "./routes";
import "./passport";
import cors from "cors";
import apiRouter from "./Routers/apiRouter";

const COOKIE_SECRET = process.env.COOKIE_SECRET;

if (typeof COOKIE_SECRET === "undefined") {
  throw new Error("[cookie] COOKIE_SECRET is undefined");
}

const CookieStore = ConnectMongo(expressSession);

const mongooseConnectionOptions: ConnectMongo.MongooseConnectionOptions = {
  mongooseConnection: mongoose.connection
};

const expressSessionOptions: expressSession.SessionOptions = {
  resave: true,
  saveUninitialized: false,
  secret: COOKIE_SECRET,
  store: new CookieStore(mongooseConnectionOptions)
};

const app: express.Application = express();
const isProduction = process.env.NODE_ENV === "production" ? true : false;

app.use(cors());
app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "Views"));
isProduction
  ? app.use("/static", express.static(path.join(__dirname, "static")))
  : app.use("/static", express.static("static"));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(expressSession(expressSessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(localMiddlewares);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
