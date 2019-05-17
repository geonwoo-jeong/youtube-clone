import passport from "passport";
import github from "passport-github2";
import routes from "../routes";

const callbackURL = process.env.PASSPORT_GITHUB_CALLBACK_URL;
const clientID = process.env.PASSPORT_GITHUB_CLIENT;
const clientSecret = process.env.PASSPORT_GITHUB_SECRET;

if (typeof callbackURL === "undefined") {
  throw new Error("[Github Auth] callbackURL is undefined");
}

if (typeof clientID === "undefined") {
  throw new Error("[Github Auth] clientID is undefined");
}

if (typeof clientSecret === "undefined") {
  throw new Error("[Github Auth] clientSecret is undefined");
}

const AuthenticateOptions: passport.AuthenticateOptions = {
  failureRedirect: routes.login,
  successRedirect: routes.home
};

const GithubStrategyOptions: github.StrategyOptions = {
  callbackURL,
  clientID,
  clientSecret
};

const githubLoginCallBack = (
  accessToken: string,
  refreshToken: string,
  profile: github.Profile,
  done: (error: any, user?: any) => void
) => {
  console.log(accessToken, refreshToken, profile, done);
};

export const GithubStrategy = new github.Strategy(
  GithubStrategyOptions,
  githubLoginCallBack
);

export const githubLogin = passport.authenticate("github");
export const githubAuth = passport.authenticate("github", AuthenticateOptions);
