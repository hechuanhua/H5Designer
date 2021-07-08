const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = {
  // The Webpack config
  webpack: override(
    // ...add your webpack config
    addWebpackAlias({  
      '@/*': path.resolve('src/*')
    })
  ),
  // The Jest config
  // jest: function(config) {
  //   // ...add your jest config customisation...
  //   return config;
  // },
  // create a webpack dev server
  // devServer: function(configFunction) {
  //   return function(proxy, allowedHost) {
  //     const config = configFunction(proxy, allowedHost);
  //     const fs = require('fs');
  //     config.https = {
  //       key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
  //       cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
  //       ca: fs.readFileSync(process.env.REACT_HTTPS_CA, 'utf8'),
  //       passphrase: process.env.REACT_HTTPS_PASS
  //     };
  //     return config;
  //   };
  // },
  // paths: function(paths, env) {
  //   // ...add your paths config
  //   return paths;
  // },
}