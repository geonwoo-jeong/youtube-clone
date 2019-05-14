import Express from "express";
import status from "http-status-codes";
import passport from "passport";
import User from "../Models/User";
import routes from "../routes";

const AuthenticateOptions: passport.AuthenticateOptions = {
  failureRedirect: routes.login,
  successRedirect: routes.home
};

export const getJoin = (req: Express.Request, res: Express.Response) =>
  res.render("Join", { pageTitle: "Join" });

export const postJoin = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
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
      email,
      name
    });
    await User.register(user, password);
    next();
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getLogin = (req: Express.Request, res: Express.Response) =>
  res.render("Login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", AuthenticateOptions);

export const logout = (req: Express.Request, res: Express.Response) => {
  // TODO Process Log out
  res.redirect(routes.home);
};

export const users = (req: Express.Request, res: Express.Response) =>
  res.render("Users", { pageTitle: "Users" });

export const userDetail = (req: Express.Request, res: Express.Response) => {
  const {
    params: { id }
  } = req;
  res.render("UserDetail", { pageTitle: "User Detail", id });
};
export const editProfile = (req: Express.Request, res: Express.Response) =>
  res.render("EditProfile", { pageTitle: "Edit Profile" });

export const changePassword = (req: Express.Request, res: Express.Response) =>
  res.render("ChangePassword", { pageTitle: "Change Password" });
