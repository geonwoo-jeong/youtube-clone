import { Request, Response } from "express";
import Video from "../Models/Video";
import routes from "../routes";

export const home = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
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
  res.render("Videos", { pageTitle: "Videos" });

export const getUpload = (req: Request, res: Response) =>
  res.render("Upload", { pageTitle: "Upload" });

export const postUpload = async (req: Request, res: Response) => {
  const {
    body: { title, description },
    file: { path: fileUrl }
  } = req;
  const newVideo = await Video.create({
    description,
    fileUrl,
    title
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("VideoDetail", { pageTitle: "Video Detail", video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req: Request, res: Response) => {
  try {
    const {
      params: { id }
    } = req;
    const video = await Video.findById(id);
    if (video) {
      res.render("EditVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
      body: { title, description }
    } = req;
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const {
      params: { id }
    } = req;
    await Video.findOneAndDelete({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
