const path = require('path');
const webpack = require('webpack');
/** HtmlWebpackPlugin
 * 如果我们更改了我们的一个入口起点的名称，甚至添加了一个新的名称，会发生什么？
 * 生成的包将被重命名在一个构建中，但是我们的index.html文件仍然会引用旧的名字
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');//自带插件
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;//自带插件
//压缩文件资源
const CompressionPlugin = require('compression-webpack-plugin');
//在每次执行npm run build时,自动帮我们清理掉dist
const { CleanWebpackPlugin } = require("clean-webpack-plugin");



console.log(path.resolve(__dirname, 'src/index.js'), ',,,,,,,,,,,,,,sdsds')

module.exports = {
  //入口文件
  entry: path.resolve(__dirname, 'src/index.js'),
  //出口文件
  output: {
    //出口目录
    path: path.resolve(__dirname, 'dist'),
    //出口文件
    filename: '[name].bundle.js',
    //文件资源
    // publicPath: 'pubilc',//publicPath 也会在服务器脚本用到 express 手动配置服务 
  },
  /*
  热更新
  contentBase:
  告诉开发服务器(dev server)，在哪里查找文件：在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
  对应命令：webpack-dev-server --open
  */
  devServer: {
    //自动打开浏览器
    open: true,
    hot: true,
    static: {
      // 在 localhost:3001 下建立服务，将 dist 目录下的文件，作为可访问文件。
      directory: path.join(__dirname, 'dist'),
    },
    //端口
    port: '3001'
  },
  //解决打包后错误文件的位置 编译后的代码映射回原始源代码
  devtool: 'inline-source-map',
  //开发模式
  mode: 'production',
  //配置loader
  module: {
    rules: [
      //处理css文件
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      //处理less文件
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      //处理sass文件
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
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
      { test: /\.(eot|svg|ttf|woff|woff2)$/, use: ["url-loader"] },
      //处理jsx
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,//排除的目录
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env'],//转换规则
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime'],
          }
        }
      },
    ]
  },
  //插件
  plugins: [
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
    new HotModuleReplacementPlugin(),
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
      "@": path.resolve(__dirname, "src")
    },
    //可以省略下面的后缀名7
    extensions: ['.js', '.jsx', '.json', '.css']
  },
}