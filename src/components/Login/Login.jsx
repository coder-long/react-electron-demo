/**
 * 登录模块
 *
 *
 *
 * cp -rf /tmp/sf_temp_cache/local_setup_dp/dataprovider_get/20211214/_api_domains_edit-con-apac-jbaby-in-en.jnjnab5d5-dev2.jjc-devops.com.cache /tmp/sf_temp_cache/local_setup_dp/dataprovider_get/20211214/_api_domains_edit-con-apac-stayfree2-in-en.jnjnab5d5-dev2.jjc-devops.com.cache
 * sf local_setup_dp edit-con-apac-stayfree2-in-en.jnjnab5d5-dev2.jjc-devops.com dp true true
*/

import React, { useState, useEffect, Fragment } from "react";
import { Form, Input, Button, Card } from 'antd';


//表单输入框映射
function mapInput(inpType) {
  switch (inpType) {
    case 'text':
      return <Input />
    case 'password':
      return <Input.Password />
    case 'textarea':
      return <Input.TextArea />
    default:
      return <Input />
  }
}


const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
}

//登录表单
const formLogin = [
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
const formRegister = [
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

function Login(props) {
  const handleLogin = () => {
    console.log('login')
  }
  const onFinishFailed = (errorInfo, type) => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = (values, type) => {
    console.log('Success:', values, aa);
  };

  const tabList = [
    {
      key: 'login',
      tab: 'login',
    },
    {
      key: 'register',
      tab: 'register',
    },
  ]

  const contentList = {
    login: <Form
      name="basic"
      title=''
      {...formItemLayout}
      initialValues={{ remember: true }}
      onFinish={(values) => onFinish(values, 'login')}
      onFinishFailed={(errorInfo) => onFinishFailed(errorInfo, "login")}
      autoComplete="off"
      layout={'horizontal'}>

      {
        formLogin.map((item, index) => {
          return <Form.Item key={item.label + index} label={item.label} name={item.name} rules={item.rules || null}>
            {
              mapInput(item.inpType)
            }
          </Form.Item>
        })
      }
      <Form.Item>
        <Button type="primary" htmlType="submit" >登录</Button>
      </Form.Item>
    </Form>,
    register: <Form
      name="basic"
      title=''
      {...formItemLayout}
      initialValues={{ remember: true }}
      onFinish={(values) => onFinish(values, 'register')}
      onFinishFailed={(errorInfo) => onFinishFailed(errorInfo, 'register')}
      autoComplete="off"
      layout={'horizontal'}>

      {
        formRegister.map((item, index) => {
          return <Form.Item key={item.label + index} label={item.label} name={item.name}>
            {
              mapInput(item.inpType)
            }
          </Form.Item>
        })
      }
      <Form.Item>
        <Button type="primary" htmlType="submit" >注册</Button>
      </Form.Item>
    </Form>
  }

  const [activeTabKey1, setActiveTabKey] = useState('login');
  const onTab1Change = key => {
    console.log(key)
    setActiveTabKey(key);
  };

  return (
    <Fragment>

      <Card
        style={{ width: '100%' }}
        // title="Card title"
        // extra={<a href="#">More</a>}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={key => {
          onTab1Change(key);
        }} >
        {contentList[activeTabKey1]}
      </Card>
    </Fragment>


  )

}

export default Login