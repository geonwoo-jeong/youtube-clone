import passport from "passport";
import User from "./Models/User";
import { GithubStrategy } from "./Strategies/Github";

passport.use(User.createStrategy());
passport.use(GithubStrategy);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
