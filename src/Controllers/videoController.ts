import { Request, Response } from "express";
import { videos as videosDB } from "../fakeDB";

export const home = (req: Request, res: Response) =>
  res.render("Home", { pageTitle: "Home", videosDB });

export const search = (req: Request, res: Response) => {
  const {
    query: { term }
  } = req;
  res.render("Search", { pageTitle: "Search", term });
};

export const videos = (req: Request, res: Response) =>
  res.render("Videos", { pageTitle: "Vidoes" });

export const upload = (req: Request, res: Response) =>
  res.render("Upload", { pageTitle: "Upload" });

export const videoDetail = (req: Request, res: Response) =>
  res.render("Video Detail", { pageTitle: "Video Detail" });

export const editVideo = (req: Request, res: Response) =>
  res.render("Edit Video", { pageTitle: "Edit Video" });

export const deleteVideo = (req: Request, res: Response) =>
  res.render("Delete Video", { pageTitle: "Delete Video" });
