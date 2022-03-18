import React from 'react';
import { Avatar, } from 'antd'
import UserEditForm from './UserEditForm';

//表格列配置
export const columns = [
  {
    title: '序号',
    render: (text, record, index) => index + 1
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: "密码",
    dataIndex: 'password',
    render: (text, record, index) => '******'
  },
  {
    title: '头像信息',
    dataIndex: 'avatar',
    render: (text, record, index) => <Avatar src={text} />
  },
  {
    title: '地区',
    dataIndex: 'address',
  },
  {
    title: '注册时间',
    dataIndex: 'register_time',
    sorter: (a, b) => new Date(b.register_time).valueOf() - new Date(a.register_time).valueOf()
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
  },
  {
    title: "操作",
    render: (text, record, index) => <UserEditForm rowData={{ text, record, index }} />
  }
];

//表格编辑按钮 表单配置
export const FormCfg = {
  columns: [
    { name: "username", label: "用户名", rules: [{ required: true, message: '请输入用户名' }], disabled: true },
    { name: "password", label: "密码", rules: [{ required: true, message: '请输入用户名' }], },
    // { name: "avatar", label: "头像信息", rules: [{ required: true, message: '请输入用户名' }] },
    // { name: "address", label: "地区", rules: [{ required: true, message: '请输入用户名' }] },
    // { name: "register_time", label: "注册时间", rules: [{ required: true, message: '请输入用户名' }] },
    // { name: "update_time", label: "更新时间", rules: [{ required: true, message: '请输入用户名' }] },
  ]
}