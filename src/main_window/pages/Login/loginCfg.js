const LOGIN = 'login';
const REGISTER = 'register';

//登录表单
const formLogin = [
  {
    label: '用户名',
    name: 'login_username',
    inpType: 'text',
    disabled: false,
    rules: [{ required: true, message: '请输入用户名...' }],
  },
  {
    label: "密码",
    name: "login_password",
    inpType: "password",
    disabled: false,
    rules: [{ required: true, message: '请输入密码...' }],
  }
];

//注册表单
const formRegister = [
  {
    label: '用户名',
    name: 'register_username',
    inpType: 'text',
    disabled: false,
    rules: [{ required: true, message: '请输入用户名...' }],
  },
  {
    label: "密码",
    name: "register_password",
    inpType: "password",
    disabled: false,
    rules: [
      {
        required: true,
        message: '请输入密码..',
      }
    ]
  },
  {
    label: "确认密码",
    name: "register_rep_password",
    inpType: "password",
    disabled: false,
    rules: [
      {
        required: true,
        message: '请输入密码..',
        validator: (rule, value) => {
          console.log(rule, value)
        }
      }
    ]
  }
];

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
}


//tab
const tabList = [
  {
    key: LOGIN,
    tab: LOGIN,
  },
  {
    key: REGISTER,
    tab: REGISTER,
  },
];

export {
  LOGIN,
  REGISTER,
  formLogin,
  formRegister,
  formItemLayout,
  tabList,
}