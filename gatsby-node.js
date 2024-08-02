const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@projects': path.resolve(__dirname, 'src/images/projects'),
        '@tech': path.resolve(__dirname, 'src/images/tech'),
        '@images': path.resolve(__dirname, 'src/images'),
      },
    },
  });
};
