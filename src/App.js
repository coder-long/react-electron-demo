import logo from './logo.svg';
import 'antd/dist/antd.less'; // or 'antd/dist/antd.less'
import './theme/index.less';
import './App.css';
import './theme/Iconfont/iconfont.css'

import React, { useState, useEffect, Fragment } from "react";
// import { useDispatch, useSelector } from "react-redux";//函数组件中使用store
// import store from "./redux/store";
// import * as reduxFunc from './redux/action'
// import { bindActionCreators } from "redux";
// import $charts from './utils/charts';
import Demo from './components/classCom/Demo';
import FunComDemo from './components/funCom/FunComDemo';
import Tmp from './components/classCom/Tmp';

import Home from './components/Home/Home';
import Login from './pages/Login/Login';

import socket from './utils/socketio'

function App() {
  // const dispatch = useDispatch();
  // const httpQueryData = bindActionCreators(reduxFunc.httpQueryData, dispatch);
  // const loadData = bindActionCreators(reduxFunc.loadData, dispatch);

  // loadData($charts, "$charts")

  // const storeState = useSelector(state => state);
  // console.log(storeState);

  /*
   * 是否需要登录 默认需要登录
   */
  const [isLogin, setLogin] = useState(true);

  useEffect(() => {
    console.log(11, isLogin)
    $electron.ipcRenderer.send('isLogin', isLogin)
  }, [isLogin])

  return (
    <div className="App">
      {
        isLogin ? <Login setLogin={setLogin}></Login> : <Home></Home>
      }

      {/* <Demo>哈哈哈</Demo>
      <br />
      <FunComDemo></FunComDemo>
      <Button>按钮</Button>
      <Button>按钮1</Button>
      <Tmp></Tmp> */}
    </div>
  );
}

export default App;
