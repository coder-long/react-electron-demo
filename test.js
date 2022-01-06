// // 定义几个中间间函数
// const m1 = (req, res, next) => {
//   console.log('m1 run')
//   next()
// }

// const m2 = (req, res, next) => {
//   console.log('m2 run')
//   next()
// }

// const m3 = (req, res, next) => {
//   console.log('m3 run')
//   next()
// }

// // 中间件集合
// const middlewares = [m1, m2, m3]

// console.log(middlewares.shift())

// function useApp(req, res) {
//   const next = () => {
//     // 获取第一个中间件
//     const middleware = middlewares.shift()
//     if (middleware) {
//       middleware(req, res, next)
//     }
//   }
//   next()
// }

// // 第一次请求流进入
// useApp()

let arr = [1, 1, 1, 1, 1]
let col = 4
let row = Math.ceil(arr.length / col)
console.log((row))