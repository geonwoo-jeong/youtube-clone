import passport from "passport";
import kakao from "passport-kakao";
import User from "../Models/User";
import routes from "../routes";
import { checkUndefined } from "../Utils/checkUndefined";

const { callbackURL, clientID, clientSecret } = checkUndefined(
  process.env.PASSPORT_KAKAO_CALLBACK_URL,
  process.env.PASSPORT_KAKAO_CLIENT,
  process.env.PASSPORT_KAKAO_SECRET,
  "KAKAO"
);

const authenticateOptions: passport.AuthenticateOptions = {
  failureRedirect: routes.login,
  successRedirect: routes.home
};

const strategyOptions: kakao.StrategyOption = {
  callbackURL,
  clientID,
  clientSecret
};

const loginCallBack = async (
  accessToken: string,
  refreshToken: string,
  profile: any,
  callback: any
) => {
  const {
    _json: { id: kakaoId, name, account_email: email, profile_image }
  } = profile;

  if (!email) {
    throw new Error("Email does not exists");
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      if (!user.name) {
        user.email = email;
        user.save();
      }
      return callback(null, user);
    }
    const newUser = await User.create({
      avatarUrl: profile_image,
      email,
      kakaoId,
      name
    });
    return callback(null, newUser);
  } catch (error) {
    return callback(error);
  }
};

export const kakaoStrategy = new kakao.Strategy(strategyOptions, loginCallBack);
export const kakaoLogin = passport.authenticate("kakao");
export const kakaoAuth = passport.authenticate("kakao", authenticateOptions);
