import express, { Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

const handleHome = (res: Response, req: Request) => {
  res.send("Hello Home");
};

const handleProfile = (res: Response, req: Request) => {
  res.send("Hello Profile");
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
