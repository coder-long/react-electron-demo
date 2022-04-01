import React, { useState, useEffect, } from "react";
import { connect } from 'react-redux';
import { message, Progress, Button } from 'antd';
import * as reduxFunc from '../redux/action'
import { bindActionCreators } from "redux";
import { validateToken, getUserInfo } from "../api";
import './index.scss'

function InitialPage(props) {

  const [percent, setPercent] = useState(1)
  const [complete, setComplete] = useState(false)


  /*
   * 是否需要登录 默认需要登录
   */
  const [token, setToken] = useState('')

  useEffect(async () => {

    console.log(props)
    let percent = 1
    let timer = setInterval(() => {
      percent += Math.random() * 10
      if (percent > 100) {
        percent = 100
        setComplete(true)
        clearInterval(timer)
      }
      setPercent(percent)
    }, 20)


    let token = await $electron.ipcRenderer.invoke('token');
    setToken(token);

  }, [])

  useEffect(async () => {

    console.log(props.socketData.socketConnectedState)
    // 初始界面进度条加载完成 做的操作
    if (complete && props.socketData.socketConnectedState) {

      if (token && token.length) {
        let { bValid = false, msg = '' } = await validateToken({ token: token });
        let localUserInfo = await $electron.ipcRenderer.invoke('remberLogin')
        if (bValid) {
          const data = await getUserInfo({ username: localUserInfo.username || 2222 });
          props.loadData(data, 'userInfo')
          props.history.replace('/home')
          $electron.ipcRenderer.send('isLogin', false)
        } else {
          props.history.replace('/login')
          $electron.ipcRenderer.send('isLogin', true)
        }
      } else {
        props.history.replace('/login')
        $electron.ipcRenderer.send('isLogin', true)
      }
    }

  }, [complete, token, props.socketData.socketConnectedState])


  return (
    <div className="progress">
      <img src={`${_static}/images/bg.png`} alt="" style={{ width: '100%', height: '100%' }} />
      <Progress percent={percent} status="active" showInfo={false} />
    </div>
  )
}

//映射到store
const mapStateToProps = (state) => {
  const { socketData = {}, userInfo = {} } = state.staticData;//静态数据
  const { httpHel = {} } = state.httpData;//http数据
  return { httpHel, socketData, userInfo }
}

const mapDispatchToProps = (dispatch, props) => {//props 父组件传过来的参数
  return {
    //dispatch 内传入action(actionCreator创建者)(就是那个addTodo函数的返回值)  dispatch之后交给reducer处理
    //对应addTodo reducer处理了之后返回一个新的state更新store
    //更新完store后自动刷新页面
    httpQueryData: bindActionCreators(reduxFunc.httpQueryData, dispatch),
    loadData: bindActionCreators(reduxFunc.loadData, dispatch),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(InitialPage);
