import React, { useState, useRef, useEffect, } from "react";
import { Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import history from "../../router/config";
import './setting.scss'


function Setting() {

  const [bShow, setBShow] = useState(false)

  const showConfirm = () => {
    Modal.confirm({
      title: '是否退出应用?',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      onOk() {
        console.log('OK');
        $electron.ipcRenderer.send('quit', { msg: 'App Quit.' })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const toggleUser = () => {
    Modal.confirm({
      title: '是否切换账号?',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      onOk() {
        console.log('OK');
        history.push('/login');
        $electron.ipcRenderer.send('isLogin', true)
        $electron.ipcRenderer.send('saveToken', '');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  return (
    <div className="app-setting">
      <Button onClick={showConfirm}>退出应用</Button>
      <br />
      <Button onClick={toggleUser}>切换账号</Button>
      <br />
      <audio src="https://vod.ruotongmusic.com/sv/495943fd-17d363e02a1/495943fd-17d363e02a1.wav" controls="controls"></audio>
    </div>
  )
}

export default Setting;