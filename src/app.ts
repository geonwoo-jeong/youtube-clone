/* tslint:disable:ordered-imports */
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import ConnectMongo from "connect-mongo";
import expressSession from "express-session";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import path from "path";
import { localMiddlewares } from "./middlewares";
import { globalRouter, userRouter, videoRouter } from "./Routers";
import routes from "./routes";
import "./passport";

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

app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "Views"));
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(expressSession(expressSessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(localMiddlewares);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
