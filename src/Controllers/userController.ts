import { Request, Response } from "express";
import status from "http-status-codes";
import routes from "../routes";

export const getJoin = (req: Request, res: Response) =>
  res.render("Join", { pageTitle: "Join" });

export const postJoin = (req: Request, res: Response) => {
  const {
    body: { password, password2 }
  } = req;

  if (password !== password2) {
    res.status(status.BAD_REQUEST);
    return res.render("Join", { pageTitle: "Join" });
  }

  res.redirect(routes.home);
  // TODO: Register User
  // TODO: Log User In
};

export const login = (req: Request, res: Response) =>
  res.render("Login", { pageTitle: "Login" });

export const logout = (req: Request, res: Response) =>
  res.render("Logout", { pageTitle: "Logout" });

export const users = (req: Request, res: Response) =>
  res.render("Users", { pageTitle: "Users" });

export const userDetail = (req: Request, res: Response) =>
  res.render("UserDetail", { pageTitle: "User Detail" });

export const editProfile = (req: Request, res: Response) =>
  res.render("EditProfile", { pageTitle: "Edit Profile" });

export const changePassword = (req: Request, res: Response) =>
  res.render("ChangePassword", { pageTitle: "Change Password" });
