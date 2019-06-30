import mongoose from "mongoose";

export interface IComment extends mongoose.Document {
  text: string;
  createAt: Date;
  _id: string;
}

const CommentSchema: mongoose.Schema<IComment> = new mongoose.Schema({
  createdAt: {
    default: Date.now,
    type: Date
  },
  creator: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  },
  text: {
    required: "Text is required",
    type: String
  }
});

const model = mongoose.model<IComment & mongoose.Document>(
  "Comment",
  CommentSchema
);

export default model;
