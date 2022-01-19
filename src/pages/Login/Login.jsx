import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";//函数组件中使用store
import { Form, Input, Button, Checkbox, Tag } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './login.scss'
import bg from './bg.png'
import store from "../../redux/store";
import * as reduxFunc from '../../redux/action'
import { bindActionCreators } from "redux";
import { LoginRequest } from "../../api";
// import { mapInput } from "../../config/map";
// import { requestPost, URL } from "../../api/request";
// import { Form, Input, Button, Card, message } from 'antd';
// import {
//   formLogin,
//   formRegister,
//   tabList,
//   formItemLayout,
//   LOGIN,
//   REGISTER,
// } from './loginCfg'

// /**
//  * 登录模块
//  *
//  */
// function Login(props) {

//   //函数组件中获取store中的值
//   const current = useSelector((state) => {
//     return state
//   })

//   let socketConnectedState = current.staticData.socketData.socketConnectedState;

//   console.log(current);

//   const onFinishFailed = (errorInfo, type) => {
//     console.log('Failed:', errorInfo, type);
//   };

//   const onFinish = async (values, type) => {
//     console.log('Success:', values, type);

//     if (type === LOGIN) {
//       if (!socketConnectedState) {
//         message.warning('服务未连接！');
//         return
//       }
//       const resLogin = await requestPost(URL.login, { userInfo: { ...values } });
//       console.log(resLogin)
//     } else {
//       const resRegister = await requestPost(URL.register, { userInfo: { ...values } });
//       console.log(resRegister);

//     }
//   };

//   function setLogin(){
//     console.log(props);
//     props.setLogin(false);
//   }

//   //登录注册表单
//   const log_reg_form = ({ dataArr = [], type = '' }) => {

//     return (
//       <>
//         <Form
//           name="basic"
//           title=''
//           {...formItemLayout}
//           initialValues={{ remember: true }}
//           onFinish={(values) => onFinish(values, type)}
//           onFinishFailed={(errorInfo) => onFinishFailed(errorInfo, type)}
//           autoComplete="off"
//           layout={'horizontal'}>
//           {
//             dataArr.map((item, index) => {
//               return <Form.Item key={item.label + index} label={item.label} name={item.name} rules={item.rules || null}>
//                 {
//                   mapInput(item.inpType, item.disabled)
//                 }
//               </Form.Item>
//             })
//           }
//           <Form.Item>
//             <Button type="primary" htmlType="submit" disabled={!socketConnectedState}>{type}</Button>
//           </Form.Item>
//         </Form>
//         <button onClick={setLogin}>aaa</button>
//       </>
//     )
//   }

//   let [contentList, setContentList] = useState({
//     login: log_reg_form({ dataArr: formLogin, type: LOGIN }),
//     register: log_reg_form({ dataArr: formRegister, type: REGISTER }),
//   })


//   useEffect(() => {

//     formLogin.forEach(item => {
//       item.disabled = !socketConnectedState
//     })

//     formRegister.forEach(item => {
//       item.disabled = !socketConnectedState
//     })

//     setContentList({
//       login: log_reg_form({ dataArr: formLogin, type: LOGIN }),
//       register: log_reg_form({ dataArr: formRegister, type: REGISTER }),
//     })
//     //函数组件中监听store中值更新
//   }, [current.staticData.socketData.socketConnectedState])


//   const [activeTabKey1, setActiveTabKey] = useState(LOGIN);
//   const onTab1Change = key => {
//     console.log(key)
//     setActiveTabKey(key);
//   };

//   return (
//     <Fragment>
//       <Card
//         style={{ width: '100%' }}
//         tabList={tabList}
//         activeTabKey={activeTabKey1}
//         onTabChange={key => {
//           onTab1Change(key);
//         }} >
//         {contentList[activeTabKey1]}
//       </Card>
//     </Fragment>
//   )

//   const dispatch = useDispatch();
//   const httpQueryData = bindActionCreators(reduxFunc.httpQueryData, dispatch);
//   const loadData = bindActionCreators(reduxFunc.loadData, dispatch);

// }



function Login() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    LoginRequest().then(res => {
      console.log(res)
    })
  };

  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.log(i18n.changeLanguage())
  })


  return (
    <div className="login_moudel" style={{ backgroundImage: `url(${bg})` }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: 300 }}
      >
        <Form.Item noStyle>
          <h2>XXX 系统</h2>
        </Form.Item>

        <Form.Item
          name="username"
          rules={[{ required: true, message: t('请输入用户名') }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('用户名')} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t('请输入密码') }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t('密码')} />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="rember-me">{t('记住密码')}</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="">{t('忘记密码')}</a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">{t('登录')}</Button>
          Or <a href="">{t('注册')}</a>
        </Form.Item>
      </Form>
      <Tag>
        <p className="lang-switch" onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}>{i18n.language === 'en' ? t('简体中文') : t('English')}</p>
      </Tag>
    </div>
  );
};

export default Login;