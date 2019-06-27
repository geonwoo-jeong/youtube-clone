import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

if (typeof MONGO_URL === "undefined") {
  throw new Error("[mongo] MONGO_URL is undefined");
}

const connectionOptions: mongoose.ConnectionOptions = {
  useFindAndModify: false,
  useNewUrlParser: true
};

mongoose.connect(MONGO_URL, connectionOptions);

const db = mongoose.connection;

const handleOpen = (): void => console.log("✅ Connect to DB");

const handleError: mongoose.HookErrorCallback = (error: any) : void =>
  console.log(`❌ Error on DB Connection : ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
