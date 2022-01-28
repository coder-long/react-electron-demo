import * as type from "./type";
import * as http from "../../api"
import { message, Modal } from "antd";
//Action 一般长这样:
// { type: 'ADD_TODO', text: 'Use Redux' };
// { type: 'REMOVE_TODO', id: '42' };
// { type: 'LOAD_ARTICLE' }

export const addTodo = (text) => {
  return {
    type: type.ADD_TODO,
    text
  };
};

const requestData = category => ({
  type: type.REQUEST_DATA,
  category
});

export const receiveData = (data, category) => ({
  type: type.RECEIVE_DATA,
  data,
  category
});

const addData = (data, category) => ({
  type: type.ADD_DATA,
  data,
  category,
});

const reloadData = (data, category) => ({
  type: type.RELOAD_DATA,
  data,
  category,
});

/**
 * 请求数据调用方法
 * @param funaName 请求接口的函数名
 * @param params 请求接口参数
 * */
export const fetchData = ({ funcName, params, stateName }) => dispatch => {
  !stateName && (stateName = funcName);
  dispatch(requestData(stateName));
  return http[funcName](params).then(res => dispatch(receiveData(res, stateName)))
};

/**
 *
  */
export const httpQueryData = ({ funcName, params, stateName }) => dispatch => {
  !stateName && (stateName = funcName);
  dispatch(requestData(stateName));
  return http[funcName](params).then(res => dispatch(receiveData(res, stateName)))
}

/**
 *
 * */
export const httpAddData = ({ funcName, params, stateName }) => dispatch => {
  !stateName && (stateName = funcName);
  dispatch(requestData(stateName));
  return http[funcName](params).then(res => {
    if (res.success) {
      Modal.success("添加成功！")
      dispatch(addData(params, stateName))
      return true
    }
    else {
      Modal.error("删除失败！")
      return false
    }
  })
};


export const httpEditData = ({ funcName, params, stateName }) => dispatch => {
  !stateName && (stateName = funcName);
  dispatch(requestData(stateName));
  return http[funcName](params).then(res => {
    if (res.success) {
      message.success("添加成功！")
      dispatch(addData(params, stateName))
      return true
    }
    else {
      message.error("删除失败！")
      return false
    }
  })
};

/**
 * @description 同步更新数据，并将数据用action进行发送处理
 * @param {*} data newstate 新的状态数据
 * @param {*} category state名称
 */
export const loadData = (data, category) => reloadData(data, category)
