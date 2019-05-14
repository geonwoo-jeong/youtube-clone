import mongoose from "mongoose";

const MONGO_URL: string = process.env.MONGO_URL!;
const ConnectionOpenOptions: mongoose.ConnectionOpenOptions = {
  useFindAndModify: false,
  useNewUrlParser: true
};

mongoose.connect(MONGO_URL, ConnectionOpenOptions);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connect to DB");

const handleError: mongoose.HookErrorCallback = error =>
  console.log(`❌ Error on DB Connection : ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
