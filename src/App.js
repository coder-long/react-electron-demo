import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";//函数组件中使用store
import history from './router/config'
import { Router as HashRouter, Switch, Route, Link, Redirect, } from 'react-router-dom';
import * as reduxFunc from './redux/action'
import { bindActionCreators } from "redux";
import { validateToken } from "./api";


import InitialPage from './pages/InitialPage';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

import socket from './utils/socketio'

function App(props) {
  const dispatch = useDispatch();
  // const httpQueryData = bindActionCreators(reduxFunc.httpQueryData, dispatch);
  const loadData = bindActionCreators(reduxFunc.loadData, dispatch);

  // loadData($charts, "$charts")



  /*
   * 是否需要登录 默认需要登录
   */
  const [isLogin, setLogin] = useState(true);
  const storeState = useSelector(state => state);
  const [token, setToken] = useState('')

  useEffect(async () => {
    console.log(history)
    console.log(storeState)
    let token = await $electron.ipcRenderer.invoke('token');
    history.replace('/initialPage')
    setToken(token)
  }, [])

  useEffect(async () => {
    // 初始界面进度条加载完成 做的操作
    if (storeState.staticData.complete) {

      if (token && token.length) {
        let { data: { bValid = false, msg = '' } } = await validateToken({ token: token });
        let userInfo = await $electron.ipcRenderer.invoke('remberLogin')
        if (bValid) {
          loadData(userInfo, 'userInfo')
          history.replace('/home')
          setLogin(false)
        } else {
          history.replace('/login')
          setLogin(true)
        }
      } else {
        history.replace('/login')
        setLogin(true)
      }
    }

    console.log(storeState.staticData.complete)

  }, [storeState.staticData.complete, token])


  useEffect(() => {
    console.log('isLogin', isLogin)
    $electron.ipcRenderer.send('isLogin', isLogin)
  }, [isLogin])

  return (
    <div className="App">
      <Switch>
        <Route path={'/login'} component={() => <Login setLogin={setLogin} />} />
        <Route path={'/home'} component={Home} />
        <Route path={'/initialPage'} component={InitialPage} />
        <Redirect from='/' to={'/initialPage'} />
      </Switch>
    </div>
  );
}

export default App;
