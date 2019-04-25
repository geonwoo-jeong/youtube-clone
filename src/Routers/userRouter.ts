import { Router } from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  editProfile,
  changePassword
} from "../Controllers/userController";

const userRouter = Router();

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail);
userRouter.get(routes.users, users);

export default userRouter;
