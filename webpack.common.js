const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
/** HtmlWebpackPlugin
 * 如果我们更改了我们的一个入口起点的名称，甚至添加了一个新的名称，会发生什么？
 * 生成的包将被重命名在一个构建中，但是我们的index.html文件仍然会引用旧的名字
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');//自带插件
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;//自带插件 热更新
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
//压缩文件资源
const CompressionPlugin = require('compression-webpack-plugin');
//在每次执行npm run build时,自动帮我们清理掉dist
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
console.log(path.resolve(__dirname, './static'))

// function buildEntriesAndHTML() {
//   // 用来构建entry
//   const result = glob.sync('src/index.js');
//   const config = {
//     hash: false,
//     inject: true
//   };
//   const entries = {};
//   const htmls = [];

//   console.log(result);

//   result.forEach(item => {
//     const one = path.parse(item);
//     outputfile = one.dir.split('/').slice(-1)[0];
//     entries[outputfile] = './' + item;
//     const filename = {
//       'development': './' + outputfile + '/index.html',
//       'production': './' + outputfile + '/' + outputfile + '.html',
//     }
//     htmls.push(
//       new HtmlWebpackPlugin({
//         ...config,
//         template: './' + one.dir + '/index.html',
//         filename: filename[process.env.NODE_ENV], // 输出html文件的路径
//         title: outputfile + '模版',
//         chunks: [outputfile]
//       })
//     );
//   });
//   if (htmls.length > 0) {
//     htmls.push(new HtmlWebpackInlineSourcePlugin());
//   }
//   console.log(result);
//   console.log(entries, htmls)
//   return {
//     entries,
//     htmls
//   };
// }

// buildEntriesAndHTML()

/**
 * https://segmentfault.com/q/1010000019996398 webpack打包多页面如何静态资源单独打包呢？
 */

module.exports = {
  //入口文件
  entry: path.resolve(__dirname, 'src/index.js'),
  //出口文件
  output: {
    //出口目录
    path: path.resolve(__dirname, 'dist'),
    //出口文件
    filename: 'render.js',
    //文件资源
    // publicPath: '/',//publicPath 也会在服务器脚本用到 express 手动配置服务
  },
  //配置loader
  module: {
    rules: [
      //处理css文件
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      //处理less文件
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
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
      { test: /\.(png|gif|jpg|jpeg)$/, type: "asset/inline" },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, type: "asset/resource" },
      /* 下面写法是webpack4的  webpack5中的配置在上两行 文档地址 https://webpack.docschina.org/guides/asset-modules/#inlining-assets
      //处理文件-图片
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            //限制大小  比2000小 ->base64格式   大->加密图片路劲
            limit: 12000,
          }
        }
      },
      // 处理字体图标
      { test: /\.(eot|svg|ttf|woff|woff2)$/, use: ["file-loader"] },
      */
      //处理jsx
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,//排除的目录
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env'],//转换规则
            presets: ['@babel/preset-env', '@babel/preset-react'],
            // plugins: ['@babel/plugin-transform-runtime'],
          }
        }
      },
    ]
  },
  //插件
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, 'static'), to: 'static' }],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',  //打包前的html 文件
      // filename: 'index.html',   //打包后的文件名
      favicon: './public/favicon.ico',
      title: '99999',
      // chunks: ['[name].js'],//chunks 的参数，可以接受一个数组，配置此参数仅会将数组中指定的 js 引入到 html 文件中没
      // 压缩HTML文件
      minify: {
        // 移除HTML中的注释
        removeComments: true,
        // 删除空白符与换行符
        collapseWhitespace: true,
        // 压缩内联css
        minifyCSS: true,
      },
      inject: 'body',
    }),
    new CleanWebpackPlugin(),
    // new HotModuleReplacementPlugin(),
    // gzip压缩配置
    new CompressionPlugin({
      // 匹配文件名
      test: /\.js$|\.html$|\.css/,
      // 对超过10kb的数据进行压缩
      threshold: 10240,
      // 是否删除原文件
      deleteOriginalAssets: false,
    }),
  ],
  resolve: {
    alias: {
      //@别名写法
      "@src": path.resolve(__dirname, "src"),
      // "@static": path.resolve(__dirname, 'static'),
    },
    //可以省略下面的后缀名7
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  //外部控制者
  externals: {
    'electron': require("electron"),
    //react中找不到fs 模块时 添加下面代码
    'fs': "commonjs fs",
  },
  // target: 'electron-main',
  //配置socket跨域
  // devServer: {
  //   //设置代理
  //   proxy: {
  //     '/socket.io': {
  //       target: 'http://localhost:3000',
  //       ws: true,
  //       changeOrigin: true
  //     }
  //   },
  // }

}