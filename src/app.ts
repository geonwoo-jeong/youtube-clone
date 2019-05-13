import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import expressSession from "express-session";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import path from "path";
import { localMiddlewares } from "./middlewares";
import "./passport";
import { globalRouter, userRouter, videoRouter } from "./Routers";
import routes from "./routes";

const expressSessionOptions: expressSession.SessionOptions = {
  resave: true,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET as string
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
app.use(localMiddlewares);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
