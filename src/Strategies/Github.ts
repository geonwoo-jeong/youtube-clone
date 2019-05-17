import passport from "passport";
import github from "passport-github2";

const GithubStrategyOptions: github.StrategyOptions = {
  callbackURL: process.env.PASSPORT_GITHUB_CALLBACK_URL!,
  clientID: process.env.PASSPORT_GITHUB_CLIENT!,
  clientSecret: process.env.PASSPORT_GITHUB_SECRET!
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
