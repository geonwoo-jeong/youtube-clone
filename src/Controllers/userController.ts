import Express from "express";
import status from "http-status-codes";
import User from "../Models/User";
import routes from "../routes";

// Join
export const getJoin = (req: Express.Request, res: Express.Response): void =>
  res.render("Join", { pageTitle: "Join" });

export const postJoin = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
): Promise<void> => {
  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
    req.flash("error", "Passwords don't match");
    res.status(status.BAD_REQUEST);
    return res.render("Join", { pageTitle: "Join" });
  }

  try {
    const user = await new User({
      email,
      name
    });
    await User.register(user, password);
    req.flash("success", "Welcome");
    next();
  } catch (error) {
    req.flash("error", "Can't join");
    res.redirect(routes.home);
  }
};

// Login
export const getLogin = (req: Express.Request, res: Express.Response): void =>
  res.render("Login", { pageTitle: "Login" });

// Logout
export const logout = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  req.flash("info", "Logged out, see you later");
  await req.logout();
  res.redirect(routes.home);
};

export const users = (req: Express.Request, res: Express.Response): void =>
  res.render("Users", { pageTitle: "Users" });

export const userDetail = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
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
      req.flash("error", "User not found");
      res.redirect(routes.home);
    }
  }
};

// Edit Profile
export const getEditProfile = (
  req: Express.Request,
  res: Express.Response
): void => res.render("EditProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  const {
    body: { name, email },
    file
  }: { body: any; file: any } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      avatarUrl: file ? file.location : req.user.avatarUrl,
      email,
      name
    });
    req.flash("success", "Profile updated");
    res.redirect(routes.userDetail(req.user.id));
  } catch (error) {
    req.flash("error", "Can't update profile");
    res.redirect(routes.editProfile);
  }
};

// Change Password
export const getChangePassword = (
  req: Express.Request,
  res: Express.Response
): void => res.render("ChangePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      req.flash("error", "Password doesn't match");
      res.status(status.BAD_REQUEST);
      res.redirect(routes.users + routes.changePassword);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    req.flash("success", "Password changed");
    res.redirect(routes.userDetail(req.user.id));
  } catch (error) {
    req.flash("error", "Can't change password");
    res.status(status.BAD_REQUEST);
    res.redirect(routes.users + routes.changePassword);
  }
};
