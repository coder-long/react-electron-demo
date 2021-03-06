import './home.scss';
import React, { Component, createRef, Fragment } from 'react';
import fs from 'fs'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as reduxFunc from '../../redux/action'
import { Layout, Menu, message, Image } from 'antd';
import UserHeader from '../../components/UserHeader/UserHeader';
import { HeaderMenu, MyRouter } from '../../router';
import { requestPost } from '../../api/request';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MinusOutlined,
  CloseOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Home extends Component {
  state = {
    collapsed: true,
    visible: false,
    isFullScreen: false,
    contentMargin: '24px 16px',
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
    // console.log(data)
    const { isFullScreen } = this.state;

    if (!isFullScreen) {
      $electron.ipcRenderer.send('win-full-screen', { msg: 'full screen' });
    } else {
      $electron.ipcRenderer.send('cancel-win-full-screen', { msg: 'full screen' });
    }

    this.setState({ isFullScreen: !isFullScreen })

  }

  componentDidMount = () => {
    // console.log(this.homeRef.current)
    // console.log(this.props)

    if (Object.values(this.props.userInfo).length) {

    }

    console.log(this.refs)
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (this.props.location.pathname === "/home/music") {
        this.setState({ contentMargin: 0 })
      } else {
        this.setState({ contentMargin: '24px 16px' })
      }
    }

    // console.log(prevProps, this.props)
    if (this.props.socketData.socketConnectedState !== prevProps.socketData.socketConnectedState) {
      if (this.props.socketData.socketConnectedState) {
        message.success('??????????????????')
      } else {
        message.error('??????????????????')
      }
    }
  }

  handleFileUoload = () => {
    // console.log('handleFileUoload', $electron.dialog);
    $electron.remote.dialog.showOpenDialog($electron.remote.getCurrentWindow(), { title: '????????????', filters: ['.js'] }).then(res => {
      // console.log(res)
      // console.log(canceled, filePaths)
      let buf = fs.readFileSync(res.filePaths[0]),
        pathSplit = res.filePaths[0].split('\\'),
        fileName = pathSplit[pathSplit.length - 1],
        file = new File([buf], fileName, { type: "text/javascript" }),
        formData = new FormData();

      // console.log(file)

      formData.append('file_upload', file, fileName);

      requestPost('/file/upload', { ...formData }).then(res => {
        // console.log(res)
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
        // console.log(info)
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    }

    return (
      <Layout className='home' style={{ height: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} theme='light' style={{ WebkitAppRegion: "drag" }}>
          <div className="logo" style={{ WebkitAppRegion: "drag" }} >
            <Image width={64} src={`${_static}/images/logo4.png`} preview={false} />
          </div>
          {/* ???????????? */}
          <HeaderMenu />
          {/* ?????? */}
          <UserHeader />
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
              <span onClick={this.fullScreenToggle}>
                {
                  this.state.isFullScreen ? <span className="iconfont">&#xe916;</span> : <span className="iconfont">&#xe600;</span>
                }
              </span>
              <span onClick={this.mainWindowHide}>
                <CloseOutlined />
              </span>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: this.state.contentMargin,
              padding: 24,
              minHeight: 280,
            }}
          >
            {/* ???????????? */}
            <MyRouter />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

//?????????store
const mapStateToProps = (state) => {
  const { hel = {}, tmpData = {}, socketData = {}, userInfo = {} } = state.staticData;//????????????
  const { httpHel = {} } = state.httpData;//http??????
  return { hel, httpHel, tmpData, socketData, userInfo }
}

const mapDispatchToProps = (dispatch, props) => {//props ???????????????????????????
  // console.log('props', props);
  return {
    //dispatch ?????????action(actionCreator?????????)(????????????addTodo??????????????????)  dispatch????????????reducer??????
    //??????addTodo reducer?????????????????????????????????state??????store
    //?????????store?????????????????????
    httpQueryData: bindActionCreators(reduxFunc.httpQueryData, dispatch),
    loadData: bindActionCreators(reduxFunc.loadData, dispatch),
  };
}




export default connect(mapStateToProps, mapDispatchToProps)(Home);