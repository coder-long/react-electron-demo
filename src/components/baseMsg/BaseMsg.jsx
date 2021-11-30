import React, { Fragment, useRef } from "react";
import { Form, Input, Button, Checkbox, Card } from 'antd';

import { requestGet } from '../../api/request'


const formMap = {
  check: ''
}

const formCfg = [
  {
    label: '姓名',
    type: 'input',
    rules: [{ required: true, message: 'Please input your !' }],
  },
  {
    label: 'id',
    type: 'input',
    rules: [{ required: true, message: 'Please input your !' }],
  },
  {
    label: 'token',
    type: "input",
    rules: [{ required: true, message: 'Please input your !' }],

  },
]

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
}



function BaseMsg(props) {

  const Anys = useRef()

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleClick = () => {
    let params = {
      id: 1217,//疫苗id
    }


    requestGet('http://miaomiao.scmttec.com/seckill/seckill/checkstock2.do', params).then(res => {
      console.log(res)
    })

    let params1 = {
      idCardNo: '51052519980503874X',
      linkmanId: '8660169',
      seckillId: 1217,//秒杀疫苗的id
      vaccineIndex: 1,//第几个疫苗
    }

    requestGet('http://miaomiao.scmttec.com/seckill/seckill/subscribe.do', params1).then(res => {
      let cookie = res.getHeader('Set-Cookie');
      console.log(res)
    })

  }

  const handleAnalys = () => {
    let val = Anys.current.resizableTextArea.textArea.value;

    console.log()
  }

  return (
    <Fragment>
      <Card title='请求表单' size='small'>
        <Form
          name="basic"
          {...formItemLayout}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout={'horizontal'}
        >
          <Form.Item
            label="请求头" >
            <Input.TextArea ref={Anys} />
          </Form.Item>

          <Form.Item >
            <Button onClick={handleAnalys}>解析请求头</Button>
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"  >
            <Input />
          </Form.Item>

          <Form.Item
            label="id"
            name="id"   >
            <Input />
          </Form.Item>

          <Form.Item
            label="token"
            name="token" >
            <Input />
          </Form.Item>
          <Form.Item
            label="社区id"
            name="sid"  >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
            <Button type="primary" htmlType="submit">
              发送请求
            </Button>
          </Form.Item>
        </Form>

        <Button onClick={handleClick}>点一下</Button>
      </Card>
    </Fragment>
  )
};

export default BaseMsg;