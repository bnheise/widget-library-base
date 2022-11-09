import { merge } from "webpack-merge";
import common from "./webpack.common.mjs";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { argv } from "process";

const plugins = [
  new MiniCssExtractPlugin({ filename: "styles.[contenthash].css" }),
];

if (argv.includes("analyze")) {
  plugins.push(new BundleAnalyzerPlugin());
}

export default (env) =>
  merge(common, {
    mode: "production",
    plugins: env?.analyze ? [...plugins, new BundleAnalyzerPlugin()] : plugins,
    module: {
      rules: [
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
          sideEffects: true,
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          sideEffects: true,
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.prod.json",
            },
          },
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: "async",
        usedExports: true,
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.s?css$/,
            chunks: "all",
            minChunks: 1,
            reuseExistingChunk: true,
            enforce: true,
          },
          vendor: {
            minSize: 80000,
            enforce: true,
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.pnpm)?[\\/](.*?)([\\/]|$)/
              )[2];

              return `npm.${packageName.replaceAll(/[\@|\+]/g, "")}`;
            },
          },
        },
      },
    },
    output: {
      filename: "[name].[contenthash].js",
      publicPath: process.env["PUBLIC_PATH"] || "auto",
      chunkFilename: "[name].chunk.[contenthash].bundle.js",
    },
  });
