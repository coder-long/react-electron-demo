import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

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

// import socket from './utils/socketio'

function App() {
  // const dispatch = useDispatch();
  // const httpQueryData = bindActionCreators(reduxFunc.httpQueryData, dispatch);
  // const loadData = bindActionCreators(reduxFunc.loadData, dispatch);

  // loadData($charts, "$charts")

  // const storeState = useSelector(state => state);
  // console.log(storeState);

  return (
    <div className="App">

      <Home></Home>

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
