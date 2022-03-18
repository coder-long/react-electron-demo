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