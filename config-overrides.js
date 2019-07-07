/* global require, module, __dirname */
const { override } = require("customize-cra");

const addWebpackTarget = config => {
  config.output = {
    ...config.output,
    globalObject: "this"
  };
  return config;
};

module.exports = {
  webpack: override(addWebpackTarget)
};
