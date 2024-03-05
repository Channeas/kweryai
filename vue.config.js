const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const { defineConfig } = require("@vue/cli-service");
const addPackageDataToManifest = require("./scripts/addPackageDataToManifest");
const getOutputDirectory = require("./scripts/getOutputDirectory");

const outputDir = getOutputDirectory(process.env.NODE_ENV);

const configureWebpack = {
    devtool: "cheap-module-source-map",
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve("src/manifest.json"),
                    to: `${path.resolve(outputDir)}/manifest.json`,
                    transform: addPackageDataToManifest
                }
            ]
        }),
        new webpack.DefinePlugin({
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
        })
    ],
    entry: {
        worker: "./src/worker/index.ts"
    }
};

const pages = {
    popup: {
        entry: "src/popup/main.ts",
        template: "public/index.html",
        filename: "popup.html"
    },
    script: {
        entry: "src/contentScript/main.ts"
    },
    settings: {
        entry: "src/settings/main.ts",
        template: "public/settings.html"
    }
};

module.exports = defineConfig({
    configureWebpack,
    filenameHashing: false,
    pages,
    transpileDependencies: true,
    outputDir
});
