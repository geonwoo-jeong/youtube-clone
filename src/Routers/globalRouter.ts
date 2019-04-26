import { Router } from "express";
import routes from "../routes";
import { home, search } from "../Controllers/videoController";
import {
  getJoin,
  postJoin,
  logout,
  postLogin,
  getLogin
} from "../Controllers/userController";

const globalRouter = Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

export default globalRouter;
