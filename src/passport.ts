const A = process.env.PASSPORT_GITHUB_CALLBACK_URL;

if (typeof A === "undefined") {
  throw new Error("aaa");
}

import passport from "passport";
import User from "./Models/User";
import { FacebookStrategy } from "./Strategies/Facebook";
import { GithubStrategy } from "./Strategies/Github";
import { kakaoStrategy } from "./Strategies/Kakao";
import { lineStrategy } from "./Strategies/Line";

passport.use(User.createStrategy());

passport.use(GithubStrategy);
passport.use(FacebookStrategy);
passport.use(kakaoStrategy);
passport.use(lineStrategy);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
