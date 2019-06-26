import mongoose from "mongoose";
import { IUser } from "./User";

export interface IVideo extends mongoose.Document {
  comments: Comment[];
  fileUrl: string;
  title: string;
  description: string;
  video: string;
  createAt: Date;
  creator: IUser;
  views: number;
}

const VideoSchema = new mongoose.Schema({
  comments: [
    {
      ref: "Comment",
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  createdAt: {
    default: Date.now,
    type: Date
  },
  creator: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  },
  description: String,
  fileUrl: {
    required: "File URL is required",
    type: String
  },
  title: {
    required: "Title is required",
    type: String
  },
  video: [
    {
      ref: "Video",
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  views: {
    default: 0,
    type: Number
  }
});

const model = mongoose.model<IVideo>("Video", VideoSchema);

export default model;
