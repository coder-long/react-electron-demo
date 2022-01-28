import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as reduxFunc from '../../redux/action'
import { Router as HashRouter, Switch, Route, Link, Redirect, } from 'react-router-dom';
import history from '../../router/config'
import { Layout, Menu, message, Button, Row, Col, Modal, Upload } from 'antd';
import BaseMsg from '../baseMsg/BaseMsg';
import Log from '../Log/Log';


/*
  jiujia 模块
*/

class Jiujia extends Component {

  state = {

  }

  componentDidMount = () => {

  }

  componentDidUpdate = (prevProps, prevState) => {

  }

  render() {

    return (
      <Row>
        <Col span={11}>
          <BaseMsg />
        </Col>
        <Col span={2}></Col>
        <Col span={11}>
          <Log />
        </Col>
      </Row>
    )
  }
}


//映射到store
const mapStateToProps = (state) => {
  const { hel = {}, tmpData = {}, socketData = {} } = state.staticData;//静态数据
  const { httpHel = {} } = state.httpData;//http数据
  return { hel, httpHel, tmpData, socketData }
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


export default connect(mapStateToProps, mapDispatchToProps)(Jiujia)