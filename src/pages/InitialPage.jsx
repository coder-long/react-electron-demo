import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";//函数组件中使用store
import { Form, Input, Button, Progress, message } from 'antd';
import * as reduxFunc from '../redux/action'
import { bindActionCreators } from "redux";
import './index.scss'

function InitialPage() {
  const dispatch = useDispatch();
  const loadData = bindActionCreators(reduxFunc.loadData, dispatch);

  const [percent, setPercent] = useState(1)




  useEffect(() => {
    $electron.ipcRenderer.send('isLogin', true)
    let percent = 1
    let timer = setInterval(() => {
      percent += Math.random() * 10
      if (percent > 100) {
        percent = 100
        loadData(true, 'complete')
        clearInterval(timer)
      }
      setPercent(percent)
    }, 20)
  }, [])



  return (
    <div className="progress">
      <img src={`${_static}/images/bg.png`} alt="" />
      <Progress percent={percent} status="active" showInfo={false} />
    </div>
  )
}

export default InitialPage;