import "./config";
import "./db";
import "./Models/Video";
import app from "./app";

const PORT = process.env.PORT;

const handleListening = () => {
  console.log(`Listening on: http://localhost://${PORT}`);
};

app.listen(PORT, handleListening);
