import { Request, Response } from "express";

export const home = (req: Request, res: Response) =>
  res.render("home", { pageTitle: "Home" });
export const search = (req: Request, res: Response) =>
  res.render("Search", { pageTitle: "Search" });
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
