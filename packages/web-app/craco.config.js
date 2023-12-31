const webpack = require("webpack");
const { getWebpackTools } = require("react-native-monorepo-tools");
const path = require('path');
 
const monorepoWebpackTools = getWebpackTools();
 
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Allow importing from external workspaces.
      monorepoWebpackTools.enableWorkspacesResolution(webpackConfig);
      // Ensure nohoisted libraries are resolved from this workspace.
      monorepoWebpackTools.addNohoistAliases(webpackConfig);
      const scopePluginIndex =
        webpackConfig.resolve.plugins.findIndex(
          ({constructor}) =>
            constructor &&
            constructor.name === 'ModuleScopePlugin',
        );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      return webpackConfig;
    },
    rules:[
      {
        test: /\.ttf$/,
        loader: "url-loader", // or directly file-loader
        include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
      }
    ],
    plugins: [
      // Inject the React Native "__DEV__" global variable.
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== "production",
        
      }),
    ],
    define: {
      global: {},
    },
  },
};