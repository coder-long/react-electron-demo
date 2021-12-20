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
import { formLogin, formRegister, tabList, formItemLayout } from './loginCfg'
import { mapInput } from "../../config/map";


const onFinishFailed = (errorInfo, type) => {
  console.log('Failed:', errorInfo);
};
const onFinish = (values, type) => {
  console.log('Success:', values);
};

//登录注册表单
const log_reg_form = ({ dataArr = [], type = '' }) => {
  return (
    <Form
      name="basic"
      title=''
      {...formItemLayout}
      initialValues={{ remember: true }}
      onFinish={(values) => onFinish(values, type)}
      onFinishFailed={(errorInfo) => onFinishFailed(errorInfo, type)}
      autoComplete="off"
      layout={'horizontal'}>
      {
        dataArr.map((item, index) => {
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
    </Form>
  )
}



function Login(props) {
  const handleLogin = () => {
    console.log('login')
  }

  const contentList = {
    login: log_reg_form({ formLogin, 'login'}),
    register: log_reg_form({ formRegister, 'register'}),
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