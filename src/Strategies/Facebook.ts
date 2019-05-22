import passport from "passport";
import facebook from "passport-facebook";
import User from "../Models/User";
import routes from "../routes";
import { checkUndefined } from "../Utils/checkUndefined";

const { callbackURL, clientID, clientSecret } = checkUndefined(
  process.env.PASSPORT_GITHUB_CALLBACK_URL,
  process.env.PASSPORT_GITHUB_CLIENT,
  process.env.PASSPORT_GITHUB_SECRET,
  "FACEBOOK"
);

const authenticateOptions: passport.AuthenticateOptions = {
  failureRedirect: routes.login,
  successRedirect: routes.home
};

const facebookStrategyOptions: facebook.StrategyOption = {
  callbackURL,
  clientID,
  clientSecret,
  profileFields: ["id", "displayName", "photos", "email"]
};

const facebookLoginCallBack = async (
  accessToken: string,
  refreshToken: string,
  profile: any,
  callback: any
) => {
  const {
    _json: { id: facebookId, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (!user.facebookId) {
        user.facebookId = facebookId;
        user.save();
      }
      return callback(null, user);
    }
    const newUser = await User.create({
      avatarUrl: `https://graph.facebook.com/${facebookId}/picture?type=large`,
      email,
      facebookId,
      name
    });
    return callback(null, newUser);
  } catch (error) {
    return callback(error);
  }
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
