import React, { useState, Fragment, useEffect, useRef } from 'react';
import { Modal, Button, } from 'antd'
import { updateUser, } from '../../api';
import From from '../../components/common/FormComp';
import { FormCfg, } from './config';

/**
 * @name UserEditForm 用户编辑组件
 * @param {*} props
 * @returns
 */
function UserEditForm(props) {

  const [rowData, setRowData] = useState(props.rowData);// <-------------------------------------
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const [columns] = useState(FormCfg.columns);
  const formRef = useRef();
  const [curForm, setCurForm] = useState(null);//当前编辑的表单



  useEffect(() => {
    if (visible) {
      const { index, text, record } = rowData
      let form = formRef.current.getForm()
      form.setFieldsValue(record)
      setCurForm(form);
    }
  }, [visible]);

  /**
  *  不加这个会出现 编辑的时候 表格数据更新了  但是再次点击编辑的时候 获取不到最新的值 因为rowdata没有更新(一直就是初始值)
  */
  useEffect(() => {
    setRowData(props.rowData)
  }, [props.rowData])

  const handleClick = () => {
    setVisible(true);
  }

  const handleOk = async () => {
    if (curForm) {
      try {
        let values = await curForm.validateFields();
        await updateUser({ userInfo: { ...values } });
        await rowData.record.changeTableData(true)
        setVisible(false);

      } catch (error) {
        console.error("validateFields", error)
      }
    }
  }

  const handleCancel = () => {
    rowData.record.changeTableData(false)
    setVisible(false);
  }

  return (
    <Fragment>
      <Button size='small' onClick={handleClick}>编辑</Button>
      <Modal title={<p style={{ textAlign: 'center', margin: 0 }}>编辑</p>} visible={visible} onOk={handleOk} onCancel={handleCancel} align='center' maskClosable={false}>
        <From columns={columns} data={data} cRef={formRef} />
      </Modal>
    </Fragment>)
}

export default UserEditForm;