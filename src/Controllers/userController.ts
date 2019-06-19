import Express from "express";
import status from "http-status-codes";
import User from "../Models/User";
import routes from "../routes";

// Join
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

// Login
export const getLogin = (req: Express.Request, res: Express.Response) =>
  res.render("Login", { pageTitle: "Login" });

// Logout
export const logout = async (req: Express.Request, res: Express.Response) => {
  await req.logout();
  res.redirect(routes.home);
};

export const users = (req: Express.Request, res: Express.Response) =>
  res.render("Users", { pageTitle: "Users" });

export const userDetail = async (
  req: Express.Request,
  res: Express.Response
) => {
  if (req.user && req.user._id) {
    const { user } = req;
    res.render("UserDetail", { pageTitle: "User Detail", user });
  } else {
    const {
      params: { id }
    } = req;
    try {
      const user = await User.findById(id).populate("videos");
      res.render("UserDetail", { pageTitle: "User Detail", user });
    } catch (error) {
      res.redirect(routes.home);
    }
  }
};

// Edit Profile
export const getEditProfile = (req: Express.Request, res: Express.Response) =>
  res.render("EditProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (
  req: Express.Request,
  res: Express.Response
) => {
  const {
    body: { name, email },
    file
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      avatarUrl: file ? file.location : req.user.avatarUrl,
      email,
      name
    });
    res.redirect(routes.userDetail(req.user.id));
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

// Change Password
export const getChangePassword = (
  req: Express.Request,
  res: Express.Response
) => res.render("ChangePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (
  req: Express.Request,
  res: Express.Response
) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(status.BAD_REQUEST);
      res.redirect(routes.users + routes.changePassword);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.userDetail(req.user.id));
  } catch (error) {
    res.status(status.BAD_REQUEST);
    res.redirect(routes.users + routes.changePassword);
  }
};
