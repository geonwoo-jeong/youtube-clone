import { Router } from "express";
import {
  getJoin,
  getLogin,
  logout,
  postJoin
} from "../Controllers/userController";
import { home, search } from "../Controllers/videoController";
import { onlyPrivate, onlyPublic } from "../middlewares";
import routes from "../routes";
import { githubAuth, githubLogin } from "../Strategies/Github";
import { localLogin } from "../Strategies/Local";

const globalRouter = Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, localLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, localLogin);
globalRouter.get(routes.github, onlyPublic, githubLogin);
globalRouter.get(routes.githubCallback, githubAuth);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;
