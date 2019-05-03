import mongoose from "mongoose";

interface IComment extends mongoose.Document {
  id: string;
  text: string;
  createAt: Date;
}

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model<IComment>("Comment", CommentSchema);

export default model;
