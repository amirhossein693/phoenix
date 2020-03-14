const ExtractCssChunksWithPageDirection = require("extract-css-chunks-webpack-plugin-with-page-direction");

const webpack = (options = {}) => () => {
  const { dev, prod, server } = options;
  const config = {};

  config.dev = {
    test: /\.(sa|sc|c)ss$/,
    use: [
      // style-loader
      {
        loader: ExtractCssChunksWithPageDirection.loader,
        options: {
          hot: true,
          reloadAll: true
        }
      },
      // css-loader
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
          modules: true,
          camelCase: true,
          localIdentName: "[name]__[local]__[hash:base64:5]",
          ...dev
        }
      },
      // sass-loader
      {
        loader: "sass-loader"
      }
    ]
  };

  config.prod = {
    test: /\.(sa|sc|c)ss$/,
    use: [
      // extract css
      {
        loader: ExtractCssChunksWithPageDirection.loader
      },
      // css-loader
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
          modules: true,
          camelCase: true,
          localIdentName: "[name]__[local]__[hash:base64:5]",
          ...prod
        }
      },
      // sass-loader
      {
        loader: "sass-loader"
      }
    ]
  };

  config.server = {
    test: /\.(sa|sc|c)ss$/,
    use: [
      // isomorphic-style-loader
      {
        loader: "isomorphic-style-loader"
      },
      // css-loader
      {
        loader: "css-loader",
        options: {
          modules: true,
          camelCase: true,
          importLoaders: true,
          localIdentName: "[local]",
          ...server
        }
      },
      // sass-loader
      {
        loader: "sass-loader"
      }
    ]
  };

  return config;
};

export default webpack;
