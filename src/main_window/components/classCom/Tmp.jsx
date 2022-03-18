import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as reduxFunc from '../../redux/action'

class Tmp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temp: {
        msg: 'this is a class demo'
      }
    }
  }

  componentDidMount() { }

  componentDidUpdate(prevProps, prevState, snapshot) { }

  handleClick = () => {
    console.log('tmp', this.props)
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.handleClick}>tmp</button>
      </Fragment>
    )
  }
}

//映射到store
const mapStateToProps = (state) => {
  const { tmpData = {} } = state.staticData;
  const { } = state.httpData;
  return { tmpData }
}

const mapDispatchToProps = dispatch => ({
  httpQueryData: bindActionCreators(reduxFunc.httpQueryData, dispatch),
  loadData: bindActionCreators(reduxFunc.loadData, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(Tmp)



