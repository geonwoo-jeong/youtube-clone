import { Router } from "express";
import {
  changePassword,
  editProfile,
  userDetail,
  users
} from "../Controllers/userController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";

const userRouter = Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);
userRouter.get(routes.users, users);

export default userRouter;
