import React, { useState, Fragment, useEffect, useRef } from 'react';
import { Avatar, Image, Modal, Card, Button, Table } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as reduxFunc from '../../redux/action'
import { useTranslation } from 'react-i18next';
import { updateUser, getAllUser } from '../../api';
import moment from 'moment';
import From from '../../components/common/FormComp';
import './index.scss'

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: "密码",
    dataIndex: 'password',
    render: (text, record, index) => '******'

  },
  {
    title: '头像信息',
    dataIndex: 'avatar',
    render: (text, record, index) => <Avatar src={text} />
  },
  {
    title: '地区',
    dataIndex: 'address',
  },
  {
    title: '注册时间',
    dataIndex: 'register_time',
    sorter: (a, b) => new Date(b.register_time).valueOf() - new Date(a.register_time).valueOf()
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
  },
  {
    title: "操作",
    render: (text, record, index) => <UserEditForm rowData={{ text, record, index }} />
  }
];

const FormCfg = {
  columns: [
    { name: "username", label: "用户名", rules: [{ required: true, message: '请输入用户名' }], disabled: true },
    { name: "password", label: "密码", rules: [{ required: true, message: '请输入用户名' }], },
    // { name: "avatar", label: "头像信息", rules: [{ required: true, message: '请输入用户名' }] },
    // { name: "address", label: "地区", rules: [{ required: true, message: '请输入用户名' }] },
    // { name: "register_time", label: "注册时间", rules: [{ required: true, message: '请输入用户名' }] },
    // { name: "update_time", label: "更新时间", rules: [{ required: true, message: '请输入用户名' }] },
  ]
}

/**
 * @name UserEditForm 用户编辑组件
 * @param {*} props
 * @returns
 */
function UserEditForm(props) {

  const [rowData] = useState(props.rowData);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const [columns] = useState(FormCfg.columns);
  const formRef = useRef();
  const [curForm, setCurForm] = useState(null);//当前编辑的表单

  useEffect(() => {
    if (visible) {
      const { index, text, record } = rowData
      console.log(formRef)
      let form = formRef.current.getForm()
      form.setFieldsValue(record)
      setCurForm(form);
    }
  }, [visible])

  const handleClick = () => {
    setVisible(true);
  }

  const handleOk = () => {
    if (curForm) {
      console.log(curForm)

      curForm.validateFields().then(values => {
        console.log(values)
      })

    }
    // setVisible(false);
  }

  const handleCancel = () => {
    setVisible(false);
  }

  return (
    <Fragment>
      <Button size='small' onClick={handleClick}>编辑</Button>
      <Modal title={<p style={{ textAlign: 'center', margin: 0 }}>编辑</p>} visible={visible} onOk={handleOk} onCancel={handleCancel} align='center'>
        <From columns={columns} data={data} cRef={formRef} />
      </Modal>
    </Fragment>)
}

/**
 * @name UserManager 用户管理页面
 * @param {*} props
 * @returns
 */
function UserManager(props) {

  const [t, i18n] = useTranslation();
  const [columns1, setColumns] = useState([...columns]);
  const [tableData, setTableData] = useState([]);
  const [curPage, setCurPage] = useState(1);//当前页面
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const getTableData = async () => {
    const { data: { tableData = [], total = 0 } } = await getAllUser({ curPage: curPage, pageSize: pageSize });
    let newTableData = tableData.map((item, index) => Object.assign({}, {
      key: index,
      username: item.username || ' ',
      password: item.password,
      avatar: item.avatar || '',
      address: item.address || '',
      register_time: moment(item.register_time).format('YYYY-MM-DD HH:mm:ss') || '',
      update_time: moment(item.update_time).format('YYYY-MM-DD HH:mm:ss') || '',
    })).sort((a, b) => new Date(a.register_time).valueOf() - new Date(b.register_time).valueOf());

    setTotal(total)
    setTableData(newTableData)
  };

  useEffect(async () => {
    let newColumns = columns1.map(item => Object.assign({}, item, { title: t(`userManager.${item.title}`), align: "center" }))
    setColumns(newColumns)
  }, [])

  useEffect(() => {
    getTableData()
  }, [curPage])

  const onChange = (pagination, filters, sorter) => {
    setCurPage(pagination.current);
  }

  return (
    <div className='user-management'>
      <Table
        columns={columns1}
        dataSource={tableData}
        onChange={onChange}
        pagination={{
          hideOnSinglePage: true,
          pageSize: pageSize,
          total: total,
        }}
        scroll={{ x: 0, y: props.windowHeight - 280 }} />
    </div>
  )
}


//映射到store
const mapStateToProps = (state) => {
  const { socketData = {}, userInfo = {}, windowHeight } = state.staticData;//静态数据
  const { httpHel = {} } = state.httpData;//http数据
  return { httpHel, socketData, userInfo, windowHeight }
}

const mapDispatchToProps = (dispatch, props) => {//props 父组件传过来的参数
  return {
    //dispatch 内传入action(actionCreator创建者)(就是那个addTodo函数的返回值)  dispatch之后交给reducer处理
    //对应addTodo reducer处理了之后返回一个新的state更新store
    //更新完store后自动刷新页面
    httpQueryData: () => bindActionCreators(reduxFunc.httpQueryData, dispatch),
    loadData: bindActionCreators(reduxFunc.loadData, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManager);


