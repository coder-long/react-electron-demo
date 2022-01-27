import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";//函数组件中使用store
import history from "./router/config";
import { Router as HashRouter, Switch, Route, Link, Redirect, } from 'react-router-dom';
import * as reduxFunc from './redux/action'
import { bindActionCreators } from "redux";
import InitialPage from './pages/InitialPage';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import socket from './socket/socketio'




function App(props) {
  console.log(process.env.NODE_ENV)
  const dispatch = useDispatch();
  // const httpQueryData = bindActionCreators(reduxFunc.httpQueryData, dispatch);
  const loadData = bindActionCreators(reduxFunc.loadData, dispatch);

  // loadData($charts, "$charts")

  useEffect(() => {
    $electron.ipcRenderer.send('isLogin', true);
    history.replace('/initialPage')


    window.onresize = function () {
      let Width = window.innerWidth//浏览器窗口的内部宽度（包括滚动条）
      let Height = window.innerHeight//浏览器窗口的内部高度（包括滚动条）

      loadData(Height, 'windowHeight')
      // console.log(Width, Height);
    }
  }, [])


  return (
    <div className="App">
      <Switch>
        <Route path={'/login'} component={() => <Login />} />
        <Route path={'/home'} component={Home} />
        <Route path={'/initialPage'} component={InitialPage} />
        <Redirect from='/' to={'/initialPage'} />
      </Switch>
    </div>
  );
}

export default App;
