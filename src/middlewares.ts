import express from "express";
import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localMiddlewares: express.RequestHandler = (req, res, next) => {
  res.locals.siteName = "YouTube-Clone";
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  console.log("=------");
  console.log(req.user);
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
