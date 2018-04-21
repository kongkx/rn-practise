const blacklist = require('metro/src/blacklist');

const config = {
  getBlacklistRE() {
    return blacklist([/\.idea[\/\\].*/]);
  },

  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  }
};

module.exports = config;
