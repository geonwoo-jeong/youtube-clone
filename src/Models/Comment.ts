import mongoose from "mongoose";

interface IComment extends mongoose.Document {
  text: string;
  createAt: Date;
}

const CommentSchema = new mongoose.Schema({
  createdAt: {
    default: Date.now,
    type: Date
  },
  text: {
    required: "Text is required",
    type: String
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const model = mongoose.model<IComment>("Comment", CommentSchema);

export default model;
