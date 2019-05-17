import dotenv from "dotenv";
import path from "path";

const NODE_ENV = process.env.NODE_ENV;

if (typeof NODE_ENV === "undefined") {
  throw new Error("NODE_ENV is undefined");
}

const isProduction = NODE_ENV === "production" ? true : false;

isProduction
  ? dotenv.config({ path: path.join(__dirname, "../.env") })
  : dotenv.config({ path: path.join(__dirname, "../.env.test") });
