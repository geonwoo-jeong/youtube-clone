import { Request, Response } from "express";
import routes from "../routes";
import Video from "../Models/Video";

export const home = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find({});
    res.render("Home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("Home", { pageTitle: "Home", videos: [] });
  }
};
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

export const postUpload = async (req: Request, res: Response) => {
  const {
    body: { title, description },
    file: { path: fileUrl }
  } = req;
  const newVideo = await Video.create({
    fileUrl,
    title,
    description
  });
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = (req: Request, res: Response) =>
  res.render("VideoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req: Request, res: Response) =>
  res.render("EditVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req: Request, res: Response) =>
  res.render("DeleteVideo", { pageTitle: "Delete Video" });
