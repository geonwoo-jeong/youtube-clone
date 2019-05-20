import passport from "passport";
import github from "passport-github2";
import User from "../Models/User";
import routes from "../routes";

interface IGithubProfile extends passport.Profile {
  id: string;
  displayName: string;
  username: string;
  profileUrl: string;
  email: Array<{
    value: string;
  }>;
  photo: {
    value: string[];
  };
  provider: string;
  _raw: string;
  _json: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscription_url: string;
    organizations_url: string;
    repo_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable?: string;
    bio?: string;
    public_repos: number;
    public_gits: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
  };
}

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
  profile: IGithubProfile,
  callback: any
) => {
  const {
    _json: { id, avatar_url, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (!user.githubId) {
        user.githubId = id;
        user.save();
      }
      return callback(null, user);
    }
    const newUser = await User.create({
      avatarUrl: avatar_url,
      email,
      githubId: id,
      name
    });
    return callback(null, newUser);
  } catch (error) {
    return callback(error);
  }
};

export const GithubStrategy = new github.Strategy(
  GithubStrategyOptions,
  githubLoginCallBack
);

export const githubLogin = passport.authenticate("github");
export const githubAuth = passport.authenticate("github", AuthenticateOptions);
