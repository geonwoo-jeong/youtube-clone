/* tslint:disable:ordered-imports */
import "./config";
import "./db";
import app from "./app";
import "./models";

const PORT = process.env.PORT;

if (typeof PORT === "undefined") {
  throw new Error("PORT is undefined");
}

const handleListening = () => {
  console.log(`Listening on: http://localhost://${PORT}`);
};

app.listen(PORT, handleListening);
