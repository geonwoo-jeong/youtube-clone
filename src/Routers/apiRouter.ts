import { Router } from "express";
import { postRegisterView } from "../Controllers/videoController";
import routes from "../routes";

const apiRouter = Router();

apiRouter.post(routes.registerView, postRegisterView);

export default apiRouter;
