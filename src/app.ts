import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter, videoRouter, globalRouter } from "./Routers";
import routes from "./routes";
import path from "path";
import { localMiddlewares } from "./middlewares";

const app: express.Application = express();

app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "Views"));
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(localMiddlewares);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
