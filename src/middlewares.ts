import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: process.env.AWS_VIDEO_BUCKET!,
    contentType: multerS3.AUTO_CONTENT_TYPE
  })
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: process.env.AWS_AVATAR_BUCKET!,
    contentType: multerS3.AUTO_CONTENT_TYPE
  })
});

export const localMiddlewares: express.RequestHandler = (req, res, next) => {
  res.locals.siteName = "YouTube-Clone";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
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
export const uploadAvatar = multerAvatar.single("avatar");
