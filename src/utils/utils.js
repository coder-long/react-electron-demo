import _ from 'lodash';

/**
 * 从url中提取文件名称
 * @param {String} uri
 * @return {String}
 */
export function urltofile(uri) {
  if (uri.indexOf('?') > -1) {
    uri = uri.split('?')[0];
  }
  const exp = /.*\/(.*?)$/;
  const result = uri.match(exp);
  return _.get(result, 1, '');
}

let nextStr = "";

function buildParams(params) {
  let str = "";
  if (_.isObject(params)) {
    for (let i in params) {
      if (!_.isFunction(params[i]) && !_.isObject(params[i])) {
        str += i + "=" + params[i] + "&";
      } else if (_.isObject(params[i])) {
        nextStr = "";/*  */
        str += changeSonType(i, params[i]);
      }
    }
  }
  return str.replace(/&$/g, "");
}

function changeSonType(objName, objValue) {
  if (typeof objValue == "object") {
    for (let i in objValue) {
      if (typeof objValue[i] != "object") {
        let value = objName + "[" + i + "]=" + objValue[i];
        nextStr += encodeURI(value) + "&";
      } else {
        changeSonType(objName + "[" + i + "]", objValue[i]);
      }
    }
  }
  return nextStr;
}

/**
 * 构建新url
 * @param {string} url
 * @param  {...any} args
 * @returns {string}
 */
export function buildUrl(url, ...args) {
  let params;

  if (args.length <= 0) return url;

  if (_.isString(args[0]) || _.isNumber(args[0])) {
    params = {
      [args[0]]: args[1]
    };
  } else if (_.isObject(args[0])) {
    params = args[0];
  } else if (_.isArray(args[0])) {
    params = {};
    for (let i = 0; i < args.length; i += 2) {
      params[args[i]] = args[i + 1];
    }
  }

  const query = buildParams(params);

  if (query.length > 0) {
    if (url.indexOf("?") > -1) {
      url += "&" + query;
    } else {
      url += "?" + query;
    }
  }

  return url;
}

// 解析url参数
export function parseUrlQuery(search) {
  search = search.substring(1);
  search = search.split("&");
  let query = {};
  for (let i = 0; i < search.length; i++) {
    let temp = search[i].split("=");
    query[temp[0]] = temp[1];
  }
  return query;
}

export default {
  urltofile,
  buildUrl,
  parseUrlQuery
}

/**
 *
 *  */
export function fileTypeMapMiME(nameSuffix) {
  switch (nameSuffix) {
    case "jpe":
    case "jpeg":
    case "jpg":
      return 'image/jpeg';
    case "tif":
    case "tiff":
      return "image/tiff"
    case "png":
    case "pnz":
      return "image/png"
    case "jfif":
      return 'image/pipeg'
    case "svg":
      return 'image/svg+xml'
    case "ras":
      return 'image/x-cmu-raster'
    case "cmx":
      return 'image/x-cmx'
    case "ico":
      return 'image/x-icon'
    case "pnm":
      return 'image/x-portable-anymap'
    case "pbm":
      return 'image/x-portable-bitmap'
    case "pgm":
      return 'image/x-portable-graymap'
    case "ppm":
      return 'image/x-portable-pixmap'
    case "rgb":
      return 'image/x-rgb'
    case "xbm":
      return 'image/x-xbitmap'
    case "xpm":
      return 'image/x-xpixmap'
    case "xwd":
      return 'image/x-xwindowdump'
    default:
      return ""
  }
}


// 验证相关代码

/**
 * 判断邮箱
 * @param {string} val
 * @returns {boolean}
 */
export const isEmail = val => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,10}){1,2})$/.test(
    val
  );
};

/**
 * 判断手机号
 *
 * @param {string} val
 * @returns {boolean}
 */
export const isPhoneNumber = val => {
  return /^1(3|4|5|6|7|8|9)\d{9}$/.test(val);
};

/**
 * 判断url
 *
 * @param {string} val
 * @returns {boolean}
 */
export const isURL = val => {
  return /^http[s]?:\/\/.*/.test(val);
};