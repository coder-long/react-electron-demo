const common = require('./webpack.common');
const merge = require('webpack-merge').default;
const path = require("path")


module.exports = merge(common, {
  /*
  热更新
  contentBase:
  告诉开发服务器(dev server)，在哪里查找文件：在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
  对应命令：webpack-dev-server --open
  */
  devServer: {
    //自动打开浏览器
    open: false,
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
  mode: 'development',
})