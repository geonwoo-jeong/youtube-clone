import { Router } from "express";
import routes from "../routes";
import { home, search } from "../Controllers/videoController";
import { join, login, logout } from "../Controllers/userController";

const globalRouter = Router();
globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);

export default globalRouter;
