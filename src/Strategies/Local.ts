import passport from "passport";
import routes from "../routes";

const AuthenticateOptions: passport.AuthenticateOptions = {
  failureRedirect: routes.login,
  successRedirect: routes.home
};

export const localLogin = passport.authenticate("local", AuthenticateOptions);
