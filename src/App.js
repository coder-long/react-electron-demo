import logo from './logo.svg';
import React from 'react';
import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button } from 'antd';
import Demo from './components/classCom/Demo';
import FunComDemo from './components/funCom/FunComDemo';
import Tmp from './components/classCom/Tmp';

import Home from './components/Home/Home';

import socket from './utils/socketio'

function App() {
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
