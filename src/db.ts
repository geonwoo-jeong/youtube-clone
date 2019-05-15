import mongoose from "mongoose";

const MONGO_URL: string = process.env.MONGO_URL!;

const connectionOptions: mongoose.ConnectionOptions = {
  useFindAndModify: false,
  useNewUrlParser: true
};

mongoose.connect(MONGO_URL, connectionOptions);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connect to DB");

const handleError: mongoose.HookErrorCallback = (error: any) =>
  console.log(`❌ Error on DB Connection : ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
