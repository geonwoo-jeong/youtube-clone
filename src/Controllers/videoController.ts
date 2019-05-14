import Express from "express";
import Video, { IVideo } from "../Models/Video";
import routes from "../routes";

export const home = async (req: Express.Request, res: Express.Response) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("Home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("Home", { pageTitle: "Home", videos: [] });
  }
};
export const search = async (req: Express.Request, res: Express.Response) => {
  const {
    query: { term }
  } = req;
  let videos: IVideo[] = [];
  try {
    videos = await Video.find({ title: { $regex: term, $options: "i" } });
  } catch (error) {
    console.log(error);
  }
  res.render("Search", { pageTitle: "Search", term, videos });
};

export const videos = (req: Express.Request, res: Express.Response) =>
  res.render("Videos", { pageTitle: "Videos" });

export const getUpload = (req: Express.Request, res: Express.Response) =>
  res.render("Upload", { pageTitle: "Upload" });

export const postUpload = async (
  req: Express.Request,
  res: Express.Response
) => {
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

export const videoDetail = async (
  req: Express.Request,
  res: Express.Response
) => {
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

export const getEditVideo = async (
  req: Express.Request,
  res: Express.Response
) => {
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

export const postEditVideo = async (
  req: Express.Request,
  res: Express.Response
) => {
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

export const deleteVideo = async (
  req: Express.Request,
  res: Express.Response
) => {
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
