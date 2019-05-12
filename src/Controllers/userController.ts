import { NextFunction, Request, Response } from "express";
import status from "http-status-codes";
import passport = require("passport");
import User from "../Models/User";
import routes from "../routes";

export const getJoin = (req: Request, res: Response) =>
  res.render("Join", { pageTitle: "Join" });

export const postJoin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
    res.status(status.BAD_REQUEST);
    return res.render("Join", { pageTitle: "Join" });
  }
  try {
    const user = await new User({
      name,
      email
    });
    await User.register(user, password);
    next();
  } catch (error) {
    console.log(error);
  }
};

export const getLogin = (req: Request, res: Response) =>
  res.render("Login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const logout = (req: Request, res: Response) => {
  // TODO Process Log out
  res.redirect(routes.home);
};

export const users = (req: Request, res: Response) =>
  res.render("Users", { pageTitle: "Users" });

export const userDetail = (req: Request, res: Response) => {
  const {
    params: { id }
  } = req;
  res.render("UserDetail", { pageTitle: "User Detail", id });
};
export const editProfile = (req: Request, res: Response) =>
  res.render("EditProfile", { pageTitle: "Edit Profile" });

export const changePassword = (req: Request, res: Response) =>
  res.render("ChangePassword", { pageTitle: "Change Password" });
