import aws from "aws-sdk";
import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import routes from "./routes";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const multerVideo = multer({
  storage: multerS3({
    acl: "public-read",
    bucket: process.env.AWS_VIDEO_BUCKET!,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    s3
  })
});
const multerAvatar = multer({
  storage: multerS3({
    acl: "public-read",
    bucket: process.env.AWS_AVATAR_BUCKET!,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    s3
  })
});

export const localMiddlewares: express.RequestHandler = (
  req,
  res,
  next
): void => {
  res.locals.siteName = "YouTube-Clone";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic: express.RequestHandler = (req, res, next): void => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate: express.RequestHandler = (req, res, next): void => {
  if (!req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
