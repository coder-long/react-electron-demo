import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as reduxFunc from '../../redux/action'
import { addTodo } from '@src/redux/action'

import Child from './zizujian'

class Parent extends Component {

  state = {
    persent: 90,
  }


  click = (val) => {
    this.setState({ parent, val })
  }

  render() {
    return (
      <Child click={this.click} />
    )
  }
}

export default Parent;