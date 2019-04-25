import { Request, Response } from "express";

export const join = (req: Request, res: Response) =>
  res.render("Join", { pageTitle: "Join" });
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
