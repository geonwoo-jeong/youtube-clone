import path from "path";
import webpack from "webpack";

const ENTRY_FILE = path.resolve(__dirname, "assets", "ts", "main.ts");
const OUTPUT_DIR = path.join(__dirname, "static");

const config: webpack.Configuration = {
  entry: ENTRY_FILE,
  output: {
    filename: "[name].[format]",
    path: OUTPUT_DIR
  }
};

export default config;
