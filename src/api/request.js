import serve from "./serve";

export function requestPost(url, data, cfg) {
  return new Promise((resolve, reject) => {
    serve.post(url, data, cfg).then(res => {
      resolve(res);
    }, err => {
      reject(err)
    })
  })
}


export function requestGet(url, params, cfg) {
  return new Promise((resolve, reject) => {
    serve.get(url, { params: params }, cfg).then(res => {
      resolve(res);
    }, err => {
      reject(err);
    })
  })
}

export function requestDel(url, cfg) {
  return new Promise((resolve, reject) => {
    serve.delete(url, cfg).then(res => {
      resolve(res);
    }, err => {
      reject(err)
    })
  })
}

export function requestPut(url, data, cfg) {
  return new Promise((resolve, reject) => {
    serve.put(url, data, cfg).then(res => {
      resolve(res);
    }, err => {
      reject(err)
    })
  })
}

