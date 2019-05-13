/* tslint:disable:ordered-imports */

import "./config";
import "./db";
import "./models";
import app from "./app";

const PORT = process.env.PORT;

const handleListening = () => {
  console.log(`Listening on: http://localhost://${PORT}`);
};

app.listen(PORT, handleListening);
