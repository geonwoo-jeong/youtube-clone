import passport from "passport";
import routes from "../routes";

const AuthenticateOptions: passport.AuthenticateOptions = {
  failureFlash: "Can't log in",
  failureRedirect: routes.login,
  successFlash: "Welcome",
  successRedirect: routes.home
};

export const localLogin = passport.authenticate("local", AuthenticateOptions);
