import mongoose, { PassportLocalSchema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

interface IUser extends mongoose.Document {
  name: string;
  email: string;
  avatarUrl: string;
  facebookId: number;
  githubId: number;
}

const userSchema : PassportLocalSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model<IUser>("User", userSchema);

export default model;
