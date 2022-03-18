const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const glob = require('glob');

//entries
const entries = function () {
  const entry = {};
  const htmlWebpackPlugin = [];

  let srcDir = path.resolve(__dirname, './src');
  let entryFiles = glob.sync(srcDir + '/*/index.{js,jsx}')

  Object.keys(entryFiles).map((index) => {
    let filePath = entryFiles[index];
    let match = filePath.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = filePath;
    htmlWebpackPlugin.push(
      new HtmlWebpackPlugin(
        {
          template: path.join(__dirname, `src/${pageName}/index.html`),
          filename: `${pageName}/index.html`,
          chunks: [pageName],
          inject: true
        }
      )
    )
  })
  return { entry, htmlWebpackPlugin };
};

const { entry, htmlWebpackPlugin } = entries();

console.log(process.env.NODE_ENV);

module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]/index.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'aaa'),
    },
    port: 8081,
    // open: true,
  },
  module: {
    rules: [

      //处理css文件
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      //处理less文件
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader',
          {
            loader: 'less-loader',
            options: {
              /**
               * 解决less报错 错误信息 https://github.com/ant-design/ant-motion/issues/44
               * 解决方式 https://juejin.cn/post/6844904160819691527
               */
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ],
      },
      //处理sass文件
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: require.resolve('babel-loader'),
        options: {
          customize: require.resolve(
            'babel-preset-react-app/webpack-overrides'
          ),
          presets: [
            [
              require.resolve('babel-preset-react-app'),
              {
                runtime: 'automatic',
              },
            ],
          ],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          // See #6846 for context on why cacheCompression is disabled
          cacheCompression: false,
        },
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],//可以省略的后缀名
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/page2/static'), to: 'page2/static' },
        // { from: path.resolve(__dirname, 'src/page11122/static'), to: 'page11122/static' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name]/index.css",
      ignoreOrder: false,
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  ].concat(htmlWebpackPlugin),
}

