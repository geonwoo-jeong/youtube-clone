import passport from "passport";
import github from "passport-github2";
import User from "../Models/User"
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

const githubLoginCallBack = async (
  accessToken: string,
  refreshToken: string,
  profile: github.Profile,
  done: (error: any, user?: any) => void
) => {
  const {
    _json: { id, avatar_url, name, email }
  } = profile;
  try {
    const user = await User.find({ email})
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }

    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url
    })
    return cb(null, newUser);
    
  }
};

export const GithubStrategy = new github.Strategy(
  GithubStrategyOptions,
  githubLoginCallBack
);

export const githubLogin = passport.authenticate("github");
export const githubAuth = passport.authenticate("github", AuthenticateOptions);
