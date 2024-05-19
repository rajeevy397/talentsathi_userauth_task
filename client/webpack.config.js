// webpack.config.js
module.exports = {
    resolve: {
      fallback: {
        util: require.resolve("util/"),
        tls: require.resolve("tls/"),
        fs: false, // or require.resolve("fs/"),
        net: false // or require.resolve("net/")
      }
    }
  };
  