module.exports = {
  module: {
    rules: [{ test: /\\.(png|jp(e*)g|svg|gif)$/, use: ["file-loader"] }],
  },
};
