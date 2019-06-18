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
  name: String,
  comments: [
    {
      ref: "Comment",
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  videos: [
    {
      ref: "Video",
      type: mongoose.Schema.Types.ObjectId
    }
  ]
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model<IUser>("User", userSchema);

export default model;
