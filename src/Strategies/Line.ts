import passport from "passport";
// @ts-ignore
import line from "passport-line-auth";
import routes from "../routes";
import { checkUndefined } from "../Utils/checkUndefined";

const {
  callbackURL,
  clientID: channelID,
  clientSecret: channelSecret
} = checkUndefined(
  process.env.PASSPORT_LINE_CALLBACK_URL,
  process.env.PASSPORT_LINE_CHANNEL_ID,
  process.env.PASSPORT_LINE_CHANNEL_SECRET,
  "LINE"
);

const authenticateOptions: passport.AuthenticateOptions = {
  failureRedirect: routes.login,
  successRedirect: routes.home
};

const strategyOptions: line.strategyOptions = {
  bot_prompt: "normal",
  callbackURL,
  channelID,
  channelSecret,
  scope: ["profile", "openid", "email"]
};

const loginCallBack = async (
  accessToken: string,
  refreshToken: string,
  profile: any,
  callback: any
) => {
  console.log(accessToken, refreshToken, profile, callback);
};

export const lineStrategy = new line.Strategy(strategyOptions, loginCallBack);
export const lineLogin = passport.authenticate("line");
export const lineAuth = passport.authenticate("line", authenticateOptions);
