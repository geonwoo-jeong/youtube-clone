import { Router } from "express";
import {
  changePassword,
  getEditProfile,
  postEditProfile,
  userDetail,
  users
} from "../Controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";
import routes from "../routes";

const userRouter = Router();

// Edit Profile
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

// Change Password
userRouter.get(routes.changePassword, onlyPrivate, changePassword);

// User Detail
userRouter.get(routes.userDetail(), userDetail);

// User
userRouter.get(routes.users, users);

export default userRouter;
