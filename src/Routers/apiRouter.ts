import { Router } from "express";
import {
  postAddComment,
  postRegisterView
} from "../Controllers/videoController";
import routes from "../routes";

const apiRouter = Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);

export default apiRouter;
