import passport from "passport";
import kakao from "passport-kakao";
// import User from "../Models/User";
import routes from "../routes";

const callbackURL = process.env.PASSPORT_KAKAO_CALLBACK_URL;
const clientID = process.env.PASSPORT_KAKAO_CLIENT;
const clientSecret = process.env.PASSPORT_KAKAO_SECRET;

if (typeof callbackURL === "undefined") {
  throw new Error("[Kakao Auth] callbackURL is undefined");
}

if (typeof clientID === "undefined") {
  throw new Error("[Kakao Auth] clientID is undefined");
}

if (typeof clientSecret === "undefined") {
  throw new Error("[Kakao Auth] clientID is undefined");
}

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
  console.log(accessToken, refreshToken, profile, callback);
};

export const kakaoStrategy = new kakao.Strategy(strategyOptions, loginCallBack);
export const kakaoLogin = passport.authenticate("kakao");
export const kakaoAuth = passport.authenticate("kakao", authenticateOptions);
