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

// let arr = [1, 1, 1, 1, 1]
// let col = 4
// let row = Math.ceil(arr.length / col)




// console.log((row))



/*

<img src="https://api.aaa.com.cn/page_000011.png" />
<img src="https://api.aaa.com.cn/page_000012.png" />
<img src="https://api.aaa.com.cn/page_000013.png" />
<img src="https://api.aaa.com.cn/page_000014.png" />
<img src="https://api.aaa.com.cn/page_000015.png" />
<img src="https://api.aaa.com.cn/page_000016.png" />
<img src="https://api.aaa.com.cn/page_000017.png" />
<img src="https://api.aaa.com.cn/page_000018.png" />
<img src="https://api.aaa.com.cn/page_000019.png" />
<img src="https://api.aaa.com.cn/page_000020.png" />
<img src="https://api.aaa.com.cn/page_000021.png" />
<img src="https://api.aaa.com.cn/page_000022.png" />
<img src="https://api.aaa.com.cn/page_000023.png" />
<img src="https://api.aaa.com.cn/page_000024.png" />
<img src="https://api.aaa.com.cn/page_000025.png" />
<img src="https://api.aaa.com.cn/page_000026.png" />
<img src="https://api.aaa.com.cn/page_000027.png" />
<img src="https://api.aaa.com.cn/page_000028.png" />
<img src="https://api.aaa.com.cn/page_000029.png" />
<img src="https://api.aaa.com.cn/page_000030.png" />
<img src="https://api.aaa.com.cn/page_000031.png" />
<img src="https://api.aaa.com.cn/page_000032.png" />

*/

let str = `

<section this-is-inserted-image="">
<img src="https://api.aaa.com.cn/page_000001.png" />
<img src="https://api.aaa.com.cn/page_000002.png" />
<img src="https://api.aaa.com.cn/page_000003.png" />
<img src="https://api.aaa.com.cn/page_000004.png" />
<img src="https://api.aaa.com.cn/page_000005.png" />
<img src="https://api.aaa.com.cn/page_000006.png" />
<img src="https://api.aaa.com.cn/page_000007.png" />
<img src="https://api.aaa.com.cn/page_000008.png" />
<img src="https://api.aaa.com.cn/page_000009.png" />
<img src="https://api.aaa.com.cn/page_000010.png" />
</section>

`

let arr = str.match(/<img\b.*?(?:\>|\/>)/g)


console.log(arr)

let srcs =

  arr.map(item => JSON.parse(item.match(/\bsrc\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/g)[0].replace('src=', '')))

console.log(srcs)


