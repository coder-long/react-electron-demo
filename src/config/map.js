import React from 'react';
import { Input, } from 'antd';

//表单输入框映射
export function mapInput(inpType, disabled = false) {
  switch (inpType) {
    case 'text':
      return <Input disabled={disabled} />
    case 'password':
      return <Input.Password disabled={disabled} />
    case 'textarea':
      return <Input.TextArea disabled={disabled} />
    case 'search':
      return <Input.Search disabled={disabled} />
    default:
      return <Input disabled={disabled} />
  }
}