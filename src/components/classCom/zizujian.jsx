import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as reduxFunc from '../../redux/action'
import { addTodo } from '@/redux/action'

class Child extends Component {
  componentDidMount = () => {

  }

  render() {
    return (

      <Button onClick={this.props.click(111)}></Button>
    )
  }
}

export default Child;