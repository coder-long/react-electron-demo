//登录表单
export const formLogin = [
  {
    label: '用户名',
    name: 'username',
    inpType: 'text',
    rules: [{ required: true, message: '请输入用户名！' }]
  },
  {
    label: "密码",
    name: "password",
    inpType: "password",
  }
];
//注册表单
export const formRegister = [
  {
    label: '用户名',
    name: 'username',
    inpType: 'text',
  },
  {
    label: "密码",
    name: "password",
    inpType: "password",
  },
  {
    label: "确认密码",
    name: "re_password",
    inpType: "password",
  }
];

export const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
}

//tab
export const tabList = [
  {
    key: 'login',
    tab: 'login',
  },
  {
    key: 'register',
    tab: 'register',
  },
];