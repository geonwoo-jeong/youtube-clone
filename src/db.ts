import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/youtube-clone", {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connect to DB");

const handleError: mongoose.HookErrorCallback = error =>
  console.log(`❌ Error on DB Connection : ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
