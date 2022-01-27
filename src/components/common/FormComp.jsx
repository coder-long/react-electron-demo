import React, { createElement, useEffect, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, DatePicker, Button, } from 'antd';
import moment from 'moment';

const FormItem = Form.Item, { Password, TextArea, Search } = Input, { Option } = Select, h = createElement;

/**
 *
 * @param {*} columns 表单数据项配置
 * @param {*} data 表单原始数据
 * @param {*} cRef 父组件传过来的ref标识符
 * @param {*} bShowBtn  是否显示提交重置按钮 默认不显示
 * @returns
 */
function FormComponent({ columns, data, cRef, bShowBtn = false }) {
  //通过Form.useForm对表单数据域进行交互。useForm是React Hooks的实现，只能用于函数组件
  const [form] = Form.useForm();
  //cRef就是父组件传过来的ref
  useImperativeHandle(cRef, () => ({
    //getForm就是暴露给父组件的方法
    getForm: () => form,
  }));

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  },
    tailLayout = {
      wrapperCol: { offset: 4, span: 16 },
    };

  //若有正则验证，则在所有的正则校验都通过后用来获取输入的数据，若没有正则校验，则直接获取输入的数据
  const onFinish = values => {
    // values.date = timestampToTime(values.date)
    values.date = moment(values.date).format('YYYY-MM-DD HH:mm:ss');
    console.log(values);
  };

  //重置要配合着const [form] = Form.useForm()以及form={form}
  const onReset = () => {
    form.resetFields();
  };

  //form表单的回显
  useEffect(() => {
    form.setFieldsValue(data)
  }, [])

  const components = {
    select: ({ placeholder = '', list = [], callback = () => { } }) => h(Select, { placeholder: placeholder, onChange: v => callback(v) }, list.map(c => h(Option, { key: c.value, value: c.value }, c.label))),
    input: ({ placeholder = '', maxLength = null, disabled = false }) => <Input maxLength={maxLength} placeholder={placeholder} disabled={disabled} />,
    password: ({ placeholder = '' }) => h(Password, { placeholder: placeholder }),
    textarea: ({ placeholder = '', showCount = null, maxLength = null }) => <TextArea showCount={showCount} maxLength={maxLength} placeholder={placeholder} />,
    search: ({ placeholder = '' }) => <Search placeholder={placeholder} />,
    datePicker: ({ placeholder = '' }) => <DatePicker placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />,
  }

  return (
    <Form {...layout} form={form} onFinish={onFinish}>
      {
        columns.map(n => {
          const { type = 'input' } = n, C = components[type]
          return <FormItem label={n.label} name={n.name} rules={n.rules} key={n.name}>{C(n)}</FormItem>
        })
      }
      {
        bShowBtn ?
          <FormItem {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }}>提交</Button>
            <Button htmlType="button" onClick={onReset}>重置</Button>
          </FormItem>
          : null
      }
    </Form>
  )
}

//定义传过来属性的类型
FormComponent.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.object,
  cRef: PropTypes.object,
  bShowBtn: PropTypes.bool
}

export default FormComponent

