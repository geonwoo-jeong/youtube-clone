import mongoose from "mongoose";

interface IVideo extends mongoose.Document {
  _id: string;
  fileUrl: string;
  title: string;
  description: string;
  video: string;
  createAt: Date;
}

const VideoSchema = new mongoose.Schema({
  createdAt: {
    default: Date.now,
    type: Date,
  },
  description: String,
  fileUrl: {
    required: "File URL is required",
    type: String,
  },
  title: {
    required: "Title is required",
    type: String,
  },
  video: [
    {
      ref: "Video",
      type: mongoose.Schema.Types.ObjectId,
    }
  ],
  views: {
    default: 0,
    type: Number,
  },
});

const model = mongoose.model<IVideo>("Video", VideoSchema);

export default model;
