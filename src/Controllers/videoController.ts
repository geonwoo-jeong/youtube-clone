import { Request, Response } from "express";
import routes from "../routes";

export const home = (req: Request, res: Response) =>
  res.render("Home", { pageTitle: "Home" });

export const search = (req: Request, res: Response) => {
  const {
    query: { term }
  } = req;
  res.render("Search", { pageTitle: "Search", term });
};

export const videos = (req: Request, res: Response) =>
  res.render("Videos", { pageTitle: "Vidoes" });

export const getUpload = (req: Request, res: Response) =>
  res.render("Upload", { pageTitle: "Upload" });

export const postUpload = (req: Request, res: Response) => {
  // const {
  //   body: { file, title, description }
  // } = req;

  // TODO: Upload and save Video
  res.redirect(routes.videoDetail());
};

export const videoDetail = (req: Request, res: Response) =>
  res.render("VideoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req: Request, res: Response) =>
  res.render("EditVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req: Request, res: Response) =>
  res.render("DeleteVideo", { pageTitle: "Delete Video" });
