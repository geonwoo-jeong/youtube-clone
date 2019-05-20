import passport from "passport";
import facebook from "passport-facebook";
// import User from "../Models/User";
import routes from "../routes";

const callbackURL = process.env.PASSPORT_FACEBOOK_CALLBACK_URL;
const clientID = process.env.PASSPORT_FACEBOOK_APP_ID;
const clientSecret = process.env.PASSPORT_FACEBOOK_APP_SECRET;

if (typeof callbackURL === "undefined") {
  throw new Error("[Facebook Auth] callbackURL is undefined");
}

if (typeof clientID === "undefined") {
  throw new Error("[Facebook Auth] clientID is undefined");
}

if (typeof clientSecret === "undefined") {
  throw new Error("[Facebook Auth] clientSecret is undefined");
}

const authenticateOptions: passport.AuthenticateOptions = {
  failureRedirect: routes.login,
  successRedirect: routes.home
};

const facebookStrategyOptions: facebook.StrategyOption = {
  callbackURL,
  clientID,
  clientSecret
};

const facebookLoginCallBack = async (
  accessToken: string,
  refreshToken: string,
  profile: any,
  callback: any
) => {
  console.log(accessToken, refreshToken, profile, callback);
};

export const FacebookStrategy = new facebook.Strategy(
  facebookStrategyOptions,
  facebookLoginCallBack
);

export const facebookLogin = passport.authenticate("facebook");
export const facebookAuth = passport.authenticate(
  "facebook",
  authenticateOptions
);
