import autoprefixer from "autoprefixer";
import { CheckerPlugin } from "awesome-typescript-loader";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import webpack from "webpack";

type Mode = "development" | "production" | "none";

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "src/Assets", "ts", "main.ts");
const OUTPUT_DIR = path.join(__dirname, "static");

if (typeof MODE === "undefined") {
  throw new Error("[Webpack] MODE is undefined");
}

const config: webpack.Configuration = {
  devtool: "source-map",
  entry: ENTRY_FILE,
  mode: MODE as Mode,
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(ts)$/,
        use: "awesome-typescript-loader"
      },
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: OUTPUT_DIR
  },
  plugins: [
    new CheckerPlugin(),
    new MiniCssExtractPlugin({
      chunkFilename: "[name].css",
      filename: "styles.css"
    })
  ],
  resolve: {
    extensions: ["ts", "js"]
  }
};

export default config;
