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
import { facebookAuth, facebookLogin } from "../Strategies/Facebook";
import { githubAuth, githubLogin } from "../Strategies/Github";
import { localLogin } from "../Strategies/Local";

const globalRouter = Router();

// local join
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, localLogin);

// local login
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, localLogin);

// github login
globalRouter.get(routes.github, onlyPublic, githubLogin);
globalRouter.get(routes.githubCallback, githubAuth);

// facebook login
globalRouter.get(routes.facebook, onlyPublic, facebookLogin);
globalRouter.get(routes.facebookCallback, facebookAuth);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;
