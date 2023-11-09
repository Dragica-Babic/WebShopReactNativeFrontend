const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const { getMetroTools } = require("react-native-monorepo-tools");
const exclusionList = require('metro-config/src/defaults/exclusionList');
 
const monorepoMetroTools = getMetroTools();

module.exports = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },

   watchFolders: monorepoMetroTools.watchFolders,
   resolver: {

    blockList: exclusionList(monorepoMetroTools.blockList),
    extraNodeModules: monorepoMetroTools.extraNodeModules,
  },
};