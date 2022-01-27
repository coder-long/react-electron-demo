import React, { useState, useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";//函数组件中使用store
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import history from "../../router/config";
import './login.scss'
import bg from './bg.png'
import * as reduxFunc from '../../redux/action'
import { bindActionCreators } from "redux";
import { LoginRequest, RegisterRequest } from "../../api";

function Login(props) {

  const dispatch = useDispatch();
  const httpQueryData = bindActionCreators(reduxFunc.httpQueryData, dispatch);
  const loadData = bindActionCreators(reduxFunc.loadData, dispatch);

  const storeState = useSelector(state => state);
  const socketConnectedState = storeState.staticData.socketData.socketConnectedState;

  const [form] = Form.useForm()
  const [type, setType] = useState('login');
  //语言设置
  const { t, i18n } = useTranslation();
  //按钮lodaing
  const [isLoadingBtn, setLodaingBtn] = useState(false);
  //表单提交
  const onFinish = async (values) => {
    setLodaingBtn(true)
    switch (type) {
      case "login":
        const { data: { msg = '', token = '', userInfo = {}, code } } = await LoginRequest({ userInfo: { ...values } })
        if (code === 0) {
          $electron.ipcRenderer.send('loginRember', values.remember ? values : { username: values.username, remember: false, password: '' });
          loadData(token, 'token');
          loadData({ ...userInfo }, 'userInfo');
          $electron.ipcRenderer.send('saveToken', token);
          $electron.ipcRenderer.send('isLogin', false)
          history.replace('/home')
        } else {
          message.error(msg)
          $electron.ipcRenderer.send('saveToken', '');
          setLodaingBtn(false);
        }
        break;
      case "register":
        {
          const { data: { data, code, msg } } = await RegisterRequest({ userInfo: { ...values } });
          if (code === 2) {
            message.error(msg)
          } else {
            message.success(msg + ',请登录')
            setTimeout(() => {
              handleLogRe("login");
            }, 1500)
          }
          setTimeout(() => {
            setLodaingBtn(false);
          }, 1500);
        }
        break;
      case "forgot":

        break;
      default:
        break;
    }
  };

  const handleLogRe = (type, e) => {
    if (e) {
      e.preventDefault()
    }
    setType(type);
    //清空表单值
    form.setFieldsValue({
      remember: false,
      username: '',
      password: '',
      re_password: '',
    })
  }

  const handleForgot = (e) => {
    e.preventDefault()
    setType('forgot');
    form.setFieldsValue({
      remember: false,
      username: form.getFieldValue('username'),
      password: '',
      re_password: '',
    })
  }

  const typeMap = (type) => {
    switch (type) {
      case "login":
        return t('login.注册');
      case "register":
        return t('login.登录');
      case "forgot":
        return t('login.保存')
    }
  }

  useEffect(() => {
    $electron.ipcRenderer.invoke('remberLogin').then(res => {
      form.setFieldsValue({ ...res })
    })
  }, [])

  return (
    <div className="login_moudel" style={{ backgroundImage: `url(${bg})` }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        form={form}
        onFinish={onFinish}
        style={{ width: 300 }}>
        <Form.Item noStyle>
          <h2>XXX 系统</h2>
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: t('login.请输入用户名') }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={t('login.用户名')}
            disabled={!socketConnectedState} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t('login.请输入密码') }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            disabled={!socketConnectedState}
            placeholder={t('login.密码')} />
        </Form.Item>
        <Form.Item>
          {
            type === 'login' ?
              <>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="rember-me" disabled={!socketConnectedState}>{t("login.记住密码")}</Checkbox>
                </Form.Item>
                {/* <a className="login-form-forgot" href="" onClick={handleForgot}>{t('login.忘记密码')}</a> */}
              </>
              :
              <Form.Item
                name='re_password'
                noStyle
                rules={[
                  {
                    required: true,
                    message: t('确认密码'),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(t('login.密码不匹配')));
                    },
                  }),
                ]}>
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  disabled={!socketConnectedState}
                  placeholder={t('login.确认密码')} />
              </Form.Item>
          }
        </Form.Item>
        <Form.Item>
          <Button loading={isLoadingBtn} type="primary" htmlType="submit" className="login-form-button" disabled={!socketConnectedState}>{type === 'login' ? t('login.登录') : t('login.注册')}</Button>
          or <a href="#" onClick={(e) => handleLogRe(type === 'login' ? 'register' : 'login', e)} disabled={!socketConnectedState}>{typeMap(type)}</a>
        </Form.Item>
      </Form>
      <p className="lang-switch" onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')} disabled={!socketConnectedState}>{i18n.language === 'en' ? '简体中文' : 'English'}</p>
    </div>
  );
};

export default Login;