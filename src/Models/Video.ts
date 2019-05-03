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
  fileUrl: {
    type: String,
    required: "File URL is required"
  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  video: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model<IVideo>("Video", VideoSchema);

export default model;
