import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as reduxFunc from '../../redux/action'
import { Router as HashRouter, Switch, Route, Link, Redirect, } from 'react-router-dom';
import history from '../../router/config'
import { Layout, Menu, message, Button, Row, Col, Modal, Upload } from 'antd';
import fs from 'fs'
// import { ipcRenderer } from 'electron';
import BaseMsg from '../baseMsg/BaseMsg';
import Log from '../Log/Log';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined,
  PieChartOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  MinusOutlined,
  UploadOutlined,
  CloseOutlined,
  LogoutOutlined,
  MailOutlined,
} from '@ant-design/icons';

import './home.scss'

import { router } from '../../router';


import Demo from '../classCom/Demo';
import FunComDemo from '../funCom/FunComDemo';
import Tmp from '../classCom/Tmp';
import Login from '../Login/Login';
import { requestPost } from '../../api/request';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Home extends Component {
  state = {
    collapsed: false,
    visible: false,
    isFullScreen: false,
  };

  homeRef = createRef()


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = () => {
    $electron.ipcRenderer.send('quit', { msg: 'App Quit.' })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  mainWindowMinSize = () => {
    $electron.ipcRenderer.send('minSize', { msg: 'mainWindow Hide.' })
  }

  mainWindowHide = () => {
    $electron.ipcRenderer.send('hide', { msg: 'mainWindow Hide.' })
  }

  fullScreenToggle = (data) => {
    console.log(data)
    const { isFullScreen } = this.state;

    if (!isFullScreen) {
      ipcRenderer.send('win-full-screen', { msg: 'full screen' });
    } else {
      ipcRenderer.send('cancel-win-full-screen', { msg: 'full screen' });
    }

    this.setState({ isFullScreen: !isFullScreen })

  }

  componentDidMount = () => {
    console.log(this.homeRef.current)
  }

  handleFileUoload = () => {
    console.log('handleFileUoload', $electron.dialog);
    $electron.remote.dialog.showOpenDialog($electron.remote.getCurrentWindow(), { title: '选择文件', filters: ['.js'] }).then(res => {
      console.log(res)
      // console.log(canceled, filePaths)
      let buf = fs.readFileSync(res.filePaths[0]),
        pathSplit = res.filePaths[0].split('\\'),
        fileName = pathSplit[pathSplit.length - 1],
        file = new File([buf], fileName, { type: "text/javascript" }),
        formData = new FormData();

      console.log(file)

      formData.append('file_upload', file, fileName);

      requestPost('/file/upload', { ...formData }).then(res => {
        console.log(res)
      })
    })
  }

  render() {
    const { collapsed } = this.state;
    const uploadCfg = {
      name: 'file_upload',
      action: 'http://127.0.0.1:3000/file/upload',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        console.log(info)
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    }

    return (
      <HashRouter history={history}>
        <Layout id='components-layout-demo-custom-trigger' style={{ height: '100vh' }}>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed} theme='light'>
            <div className="logo" style={{ WebkitAppRegion: "drag" }}>logo</div>
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="light"
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link to={'/'}>主页</Link>
              </Menu.Item>
              <SubMenu key="sub1" icon={<MailOutlined />} title="关于">
                <Menu.Item key="2">
                  <Link to={'/about'}>实现方式</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="3" icon={<PieChartOutlined />}>
                <Link to={'/user'}>英雄联盟</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<PieChartOutlined />}>
                <Link to={'/ddd'}>音乐</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<PieChartOutlined />}>
                <Link to={'/login'}>登录模块</Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<LogoutOutlined />}>
                <span onClick={this.showModal}>退出应用</span>
                <Modal visible={this.state.visible}
                  title="是否退出应用"
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}>是否退出应用</Modal>

              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background-header" style={{ padding: 0, textAlign: 'left', WebkitAppRegion: "drag" }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                style: { WebkitAppRegion: "no-drag" },
                onClick: this.toggle,
              })}
              <div className="on-off-btn">
                <span onClick={this.mainWindowMinSize}>
                  <MinusOutlined />
                </span>
                {React.createElement(this.state.isFullScreen ? FullscreenExitOutlined : FullscreenOutlined, {
                  onClick: this.fullScreenToggle,
                })}
                <span onClick={this.mainWindowHide}>
                  <CloseOutlined />
                </span>
              </div>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route path='/about'>
                  <Row>
                    <Col span={11}>
                      <BaseMsg />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                      <Log />
                    </Col>
                  </Row>
                </Route>
                <Route path='/user'>
                  cc
                </Route>
                <Route path='/ddd'>
                  dd
                  <Button onClick={this.handleFileUoload}>electron弹框</Button>
                  <Upload {...uploadCfg}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Route>
                <Route path='/login'>
                  <Login />
                </Route>
                <Route path='/home'>
                  home
                  <div id='home' ref={this.homeRef}></div>
                </Route>
                <Redirect from='/' to='/home'></Redirect>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}

//映射到store
const mapStateToProps = (state) => {
  const { hel = {}, tmpData = {} } = state.staticData;//静态数据
  const { httpHel = {} } = state.httpData;//http数据
  return { hel, httpHel, tmpData }
}

const mapDispatchToProps = (dispatch, props) => {//props 父组件传过来的参数
  console.log('props', props);
  return {
    //dispatch 内传入action(actionCreator创建者)(就是那个addTodo函数的返回值)  dispatch之后交给reducer处理
    //对应addTodo reducer处理了之后返回一个新的state更新store
    //更新完store后自动刷新页面
    httpQueryData: () => bindActionCreators(reduxFunc.httpQueryData, dispatch),
    loadData: bindActionCreators(reduxFunc.loadData, dispatch),
  };
}




export default connect(mapStateToProps, mapDispatchToProps)(Home);