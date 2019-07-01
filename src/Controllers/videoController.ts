import Express from "express";
import Comment from "../Models/Comment";
import Video, { IVideo } from "../Models/Video";
import routes from "../routes";

export const home = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("Home", { pageTitle: "Home", videos });
  } catch (error) {
    req.flash("error", "Can't loading page");
    res.render("Home", { pageTitle: "Home", videos: [] });
  }
};
export const search = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  const {
    query: { term }
  } = req;
  let videos: IVideo[] = [];
  try {
    videos = await Video.find({ title: { $regex: term, $options: "i" } });
  } catch (error) {
    req.flash("error", "Can't search");
  }
  res.render("Search", { pageTitle: "Search", term, videos });
};

export const videos = (req: Express.Request, res: Express.Response): void =>
  res.render("Videos", { pageTitle: "Videos" });

export const getUpload = (req: Express.Request, res: Express.Response): void =>
  res.render("Upload", { pageTitle: "Upload" });

export const postUpload = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  // Express.MulterS3.File
  const {
    body: { title, description },
    file: { location }
  }: { body: any; file: any } = req;
  const newVideo = await Video.create({
    creator: req.user.id,
    description,
    fileUrl: location,
    title
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  req.flash("success", "Video Uploaded");
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id).populate({
      path: "comments",
      populate: {
        model: "User",
        path: "creator"
      }
    });

    res.render("VideoDetail", { pageTitle: "Video Detail", video });
  } catch (error) {
    req.flash("error", "Can't loading video");
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const {
      params: { id }
    } = req;
    const video = await Video.findById(id);
    if (!video || video.creator !== req.user.id) {
      throw Error();
    }
    res.render("EditVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    req.flash("error", "Can't open Video edit page");
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const {
      params: { id },
      body: { title, description }
    } = req;
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    req.flash("success", "Video Edited");
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    req.flash("error", "Can't edit Video");
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);
    if (!video || video.creator !== req.user.id) {
      throw Error();
    }

    await Video.findOneAndDelete({ _id: id });
  } catch (error) {
    req.flash("error", "Can't delete Video");
  }
  req.flash("success", "Video deleted");
  res.redirect(routes.home);
};

export const postRegisterView = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video) {
      video.views += 1;
      video.save();
      res.status(200);
    }
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postRemoveComment = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  const {
    params: { commentId }
  } = req;
  try {
    const comment = await Comment.findById(commentId);
    if (comment) {
      comment.remove();
    }
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postAddComment = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;
  try {
    const video = await Video.findById(id);
    if (video) {
      const newComment = await Comment.create({
        creator: user.id,
        text: comment
      });
      video.comments.push(newComment.id);
      const result = await video.save();
      return res
        .send({ id: result.comments.pop(), avatarUrl: user.avatarUrl })
        .end();
    }
  } catch (error) {
    res.status(400);
    res.end();
  }
};
