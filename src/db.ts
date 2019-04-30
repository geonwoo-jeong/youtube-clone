import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL!, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connect to DB");

const handleError: mongoose.HookErrorCallback = error =>
  console.log(`❌ Error on DB Connection : ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
