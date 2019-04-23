import { Request, Response } from "express";

export const home = (req: Request, res: Response) => res.render("home");
export const search = (req: Request, res: Response) => res.send("Search");
export const videos = (req: Request, res: Response) => res.send("Videos");
export const upload = (req: Request, res: Response) => res.send("Upload");
export const videoDetail = (req: Request, res: Response) =>
  res.send("Video Detail");
export const editVideo = (req: Request, res: Response) =>
  res.send("Edit Video");
export const deleteVideo = (req: Request, res: Response) =>
  res.send("Delete Video");
