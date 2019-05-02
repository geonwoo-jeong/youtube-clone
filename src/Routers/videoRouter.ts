import { Router } from "express";
import routes from "../routes";
import { uploadVideo } from "../middlewares";
import {
  videos,
  getUpload,
  postUpload,
  videoDetail,
  editVideo,
  deleteVideo
} from "../Controllers/videoController";

const videoRouter = Router();

videoRouter.get(routes.videos, videos);
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
