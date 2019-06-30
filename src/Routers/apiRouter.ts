import { Router } from "express";
import {
  postAddComment,
  postRegisterView,
  postRemoveComment
} from "../Controllers/videoController";
import routes from "../routes";

const apiRouter = Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.removeComment, postRemoveComment);

export default apiRouter;
