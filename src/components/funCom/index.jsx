import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";//函数组件中使用store
import * as reduxFunc from '../../redux/action'
import { bindActionCreators } from "redux";
import fs from 'fs'
import { Button, Upload, message } from "antd";
import Form from '../common/FormComp';


const onGenderChange = (data) => {
  console.log(data)
};

const config = {
  columns: [
    { name: 'userName', label: '用户名', rules: [{ required: true, message: '请输入用户名' }] },
    { name: 'password', label: '密码', type: 'password', rules: [{ required: true, message: '请输入密码' }] },
    {
      name: 'confirmPwd', label: '确认密码', type: 'password', rules: [
        { required: true, message: '请再一次输入密码' },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            //如果value为空，!value为true则直接返回Promise.resolve()就会提示“请再一次输入密码”
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject('两次密码输入不一致');
          },
        }),
      ]
    },
    {
      name: 'email', label: '邮箱', rules: [
        { required: true, message: '请输入邮箱' },
        {
          validator: (_, value) => {
            let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (!value || reg.test(value)) {
              return Promise.resolve();
            }

            return Promise.reject('邮箱格式不正确');
          }
        }
      ]
    },
    { name: 'gender', label: '性别', type: 'select', rules: [{ required: true, message: '请选择性别' }], list: [{ value: 'male', label: '男' }, { value: 'female', label: '女' }], callback: res => onGenderChange(res) },
    { name: 'highHeeled', label: '高跟鞋', rules: [{ required: true, message: '请输入喜欢的高跟鞋' }] },
    { name: 'exercise', label: '运动', rules: [{ required: true, message: '请输入喜欢的运动' }] },
    { name: 'date', label: '日期', type: 'datePicker', rules: [{ required: true, message: '请输入日期' }] },
    { name: 'textarea', label: '日期', type: 'textarea', rules: [{ required: true, message: '请输入日期' }] },
  ],
  data: {
    userName: '小坏',
    gender: 'female',
    email: '111@qq.com'
  },
}


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

export function UploadCom() {

  function handleFileUoload() {
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

  const childRef = React.createRef();
  const getFormVal = () => {
    const form = childRef.current.getForm();
    //可以在验证后再获取值
    form.validateFields().then(valid => {
      console.log(valid)
    }).catch((e) => { })
    //也可以在不需要正则验证的地方直接通过这种方式来获取值
    // console.log(form.getFieldValue())
  }

  return (
    <>
      <Button onClick={handleFileUoload}>electron弹框</Button>
      <Upload {...uploadCfg}>
        <Button>Click to Upload</Button>
      </Upload>

      <Form {...config} cRef={childRef} />
      <Button onClick={getFormVal} type="primary">点击打印</Button>
    </>
  )
}


