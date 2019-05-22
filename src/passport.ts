import passport from "passport";
import User from "./Models/User";
import { FacebookStrategy } from "./Strategies/Facebook";
import { GithubStrategy } from "./Strategies/Github";
import { kakaoStrategy } from "./Strategies/Kakao";

passport.use(User.createStrategy());

passport.use(GithubStrategy);
passport.use(FacebookStrategy);
passport.use(kakaoStrategy);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
