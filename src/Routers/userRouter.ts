import { Router } from "express";
import {
  changePassword,
  editProfile,
  userDetail,
  users
} from "../Controllers/userController";
import routes from "../routes";

const userRouter = Router();

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail(), userDetail);
userRouter.get(routes.users, users);

export default userRouter;
