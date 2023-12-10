const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Find the project and workspace directories
const projectRoot = __dirname;
// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(__dirname);

config.server = {
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      const assets = '/@web-app/app/src/assets/';
      if (req.url.startsWith(assets)) {
        // At the beginning of the path to your assets should always be "/assets/"
        // Next exit from the current directory
        req.url = req.url.replace(
          assets,
          '/assets/../app/src/assets/'
        );
        console.log(req.url)
      }

      return middleware(req, res, next);
    };
  }
}

config.transformer = {
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
}

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];
// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
