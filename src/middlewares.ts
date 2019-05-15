import express from "express";
import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localMiddlewares: express.RequestHandler = (req, res, next) => {
  res.locals.siteName = "YouTube-Clone";
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  next();
};

export const onlyPublic: express.RequestHandler = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate: express.RequestHandler = (req, res, next) => {
  if (!req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const uploadVideo = multerVideo.single("videoFile");
