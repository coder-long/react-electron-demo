import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";//函数组件中使用store
import * as reduxFunc from '../../redux/action'
import { bindActionCreators } from "redux";
import fs from 'fs'
import { Button, Upload, message } from "antd";


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

  return (
    <>
      <Button onClick={handleFileUoload}>electron弹框</Button>
      <Upload {...uploadCfg}>
        <Button>Click to Upload</Button>
      </Upload>
    </>
  )
}


