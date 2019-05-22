import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

interface IUser extends mongoose.Document {
  avatarUrl: string;
  email: string;
  facebookId: number;
  githubId: number;
  kakaoId: number;
  name: string;
}

const userSchema: mongoose.PassportLocalSchema = new mongoose.Schema({
  avatarUrl: String,
  email: String,
  facebookId: Number,
  githubId: Number,
  kakaoId: Number,
  name: String
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model<IUser>("User", userSchema);

export default model;
