import React, { useState, useEffect, } from 'react';
import { Table } from 'antd'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as reduxFunc from '../../redux/action'
import { useTranslation } from 'react-i18next';
import { getAllUser } from '../../api';
import moment from 'moment';
import { columns } from './config';
import './index.scss'


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
    try {
      const { tableData = [], total = 0 } = await getAllUser({ curPage: curPage, pageSize: pageSize });
      let newTableData = tableData.map((item, index) => Object.assign({}, {
        key: index,
        username: item.username || ' ',
        password: item.password,
        avatar: item.avatar || '',
        address: item.address || '',
        register_time: moment(item.register_time).format('YYYY-MM-DD HH:mm:ss') || '',
        update_time: moment(item.update_time).format('YYYY-MM-DD HH:mm:ss') || '',
        changeTableData: changeTableData,
      })).sort((a, b) => new Date(a.register_time).valueOf() - new Date(b.register_time).valueOf());
      setTotal(total)
      setTableData(newTableData)
    } catch (error) {
      console.error(error)
    }
  };

  //修改头部表格头部翻译
  useEffect(async () => {
    let newColumns = columns1.map(item => Object.assign({}, item, { title: t(`userManager.${item.title}`), align: "center" }))
    setColumns(newColumns)
  }, [])

  //表格分页获取
  useEffect(() => {
    getTableData()
  }, [curPage])

  const onChange = (pagination, filters, sorter) => {
    setCurPage(pagination.current);
  }

  const changeTableData = (bChangeTable) => {
    if (bChangeTable) {
      getTableData()
    }
  };

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
  const { httpHel = {}, userTable = [] } = state.httpData;//http数据
  return { httpHel, socketData, userInfo, windowHeight, userTable }
}

const mapDispatchToProps = (dispatch, props) => {//props 父组件传过来的参数
  return {
    //dispatch 内传入action(actionCreator创建者)(就是那个addTodo函数的返回值)  dispatch之后交给reducer处理
    //对应addTodo reducer处理了之后返回一个新的state更新store
    //更新完store后自动刷新页面
    httpQueryData: bindActionCreators(reduxFunc.httpQueryData, dispatch),
    loadData: bindActionCreators(reduxFunc.loadData, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManager);


