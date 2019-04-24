import express from "express";
import routes from "./routes";

export const localMiddlewares: express.RequestHandler = (req, res, next) => {
  res.locals.siteName = "YouTube-Clone";
  res.locals.routes = routes;
  next();
};
