import { Input, } from 'antd';

//表单输入框映射
export function mapInput(inpType) {
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