import passport from "passport";
import User from "./Models/User";
import { FacebookStrategy } from "./Strategies/Facebook";
import { GithubStrategy } from "./Strategies/Github";

passport.use(User.createStrategy());

passport.use(GithubStrategy);
passport.use(FacebookStrategy);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
