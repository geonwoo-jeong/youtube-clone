import dotenv from "dotenv";
import path from "path";

const isProduction = process.env.NODE_ENV === "production" ? true : false;

isProduction
  ? dotenv.config({ path: path.join(__dirname, "../.env") })
  : dotenv.config({ path: path.join(__dirname, "../.env.test") });
