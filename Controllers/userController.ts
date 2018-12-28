import { Request, Response } from "express";

export const join = (req: Request, res: Response) => res.send("Join");
export const login = (req: Request, res: Response) => res.send("Login");
export const logout = (req: Request, res: Response) => res.send("Logout");
export const users = (req: Request, res: Response) => res.send("Users");
export const userDetail = (req: Request, res: Response) =>
  res.send("User Detail");
export const editProfile = (req: Request, res: Response) =>
  res.send("Edit Profile");
export const changePassword = (req: Request, res: Response) =>
  res.send("Change Password");
