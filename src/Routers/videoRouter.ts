import { Router } from "express";
import routes from "../routes";
import { uploadVideo } from "../middlewares";
import {
  videos,
  getUpload,
  postUpload,
  videoDetail,
  deleteVideo,
  getEditVideo,
  postEditVideo
} from "../Controllers/videoController";

const videoRouter = Router();

videoRouter.get(routes.videos, videos);

// Upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// Edit Video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Delete Video
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
