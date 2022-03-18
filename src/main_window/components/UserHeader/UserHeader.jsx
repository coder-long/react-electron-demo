import React, { useState, createRef, useEffect } from 'react';
import { Avatar, Image, Popover, Card, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as reduxFunc from '../../redux/action'
import fs from 'fs';
import { fileTypeMapMiME } from '../../utils/utils';
import { updateUser } from '../../api';
import moment from 'moment';


function UserHeader(props) {

  const [visible, setVisible] = useState(false);

  //头像上传 更新用户信息
  const fileUpload = async () => {
    $remote.dialog.showOpenDialog($remote.getCurrentWindow(), { title: '选择文件', filters: ['*.jpg', '*.png'] }).then((res) => {
      const { filePaths, canceled } = res
      if (canceled) return;
      let buf = fs.readFileSync(filePaths[0], { encoding: 'base64' }),
        pathSplit = filePaths[0].split('\\'),
        fileName = pathSplit[pathSplit.length - 1],
        nameSplit = fileName.split('.'),
        fileType = nameSplit[nameSplit.length - 1],
        imgDataBase64 = `data:${fileTypeMapMiME(fileType)};base64,` + buf,
        newUserInfo = Object.assign({}, props.userInfo, { avatar: imgDataBase64 })

      updateUser({ userInfo: newUserInfo }).then(res => {
        props.loadData(newUserInfo, "userInfo")
      })
    })


  }

  const userInfor = () => {

    return (
      <Card
        title={<span><UserOutlined /> {props.userInfo.username}</span>}
        width={200}
        size='mini'
        bordered={false}
        extra={!props.userInfo.avatar ? <Avatar shape="square" size={64} icon={<UserOutlined />} /> : <Image width={64} src={props.userInfo.avatar} />}>
        <div style={{ width: 200 }}>
          <p> 账户注册时间: {moment(props.userInfo.register_time || Date.now()).format('YYYY-MM-DD HH:mm:ss')}</p>
          <p> 账户更新时间: {moment(props.userInfo.update_time || Date.now()).format('YYYY-MM-DD HH:mm:ss')}</p>
          <p> 地区: {props.userInfo.address || ''}</p>
          <Button onClick={fileUpload}>更换头像</Button>
        </div>
      </Card>
    )
  }

  const onVisibleChange = (visible) => {
    setVisible(visible)
    console.log(visible)
  }

  return (
    <div className='profile-photo'>
      <Popover placement='rightTop' trigger={'click'} content={userInfor()} visible={visible} onVisibleChange={onVisibleChange}>
        <Avatar
          style={{ cursor: 'pointer' }}
          size={45}
          src={props.userInfo.avatar || "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} />
      </Popover>
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


export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);


