const path = require('path');
const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      extraNodeModules: {
        assets: path.resolve(__dirname, 'assets'),
        utils: path.resolve(__dirname, 'utils'),
        screens: path.resolve(__dirname, 'screens'),
        components: path.resolve(__dirname, 'components'),
        api: path.resolve(__dirname, 'api'),
        store: path.resolve(__dirname, 'store'),
      },
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
