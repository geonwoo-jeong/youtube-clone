import { Router } from "express";
import {
  getJoin,
  getLogin,
  logout,
  postJoin,
  postLogin
} from "../Controllers/userController";
import routes from "../routes";

import { home, search } from "../Controllers/videoController";
const globalRouter = Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

export default globalRouter;
