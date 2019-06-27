import mongoose from "mongoose";

interface IComment extends mongoose.Document {
  text: string;
  createAt: Date;
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

const model = mongoose.model<IComment>("Comment", CommentSchema);

export default model;
