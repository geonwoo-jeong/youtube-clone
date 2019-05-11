import passport from "passport";
import User from "./Models/User";

passport.use(User.createStrategy());
