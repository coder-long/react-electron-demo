import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as reduxFunc from '../../redux/action'
import { addTodo } from '@src/redux/action'

class Demo extends Component {
    state = {
        temp: {
            msg: 'this is a class demo'
        },
        arr: []
    }

    componentDidMount() {
        console.log(this.props);
        const tempArr = []
        for (let i = 0; i < 13; ++i) {
            tempArr.push({ key: i, val: `这是第${i}个.` })
        };

        this.setState({ arr: [...tempArr] })
    }

    componentDidUpdate() {

    }

    handleClick = (val) => {
        this.setState({
            temp: { msg: val }
        })

        this.props.onClick(val);
        console.log(this.props);
        this.props.loadData({ alion: 'fkshdjfk' }, 'tmpData');
        console.log(this.props)

    }
    render() {
        const { temp: { msg = 'sfds' }, arr = [] } = this.state;
        return (
            <Fragment>
                <div>{msg}</div>
                {this.props.children ? this.props.children : 'no chilldern'}
                <button onClick={this.handleClick.bind(this, 'akfhajlfh')}>按钮1</button>{this.props.count}
                <div></div>
                <ul>
                    {
                        arr.length ? arr.map(item => {
                            return <li key={item.key}>{item.val}</li>
                        }) : null
                    }
                </ul>
            </Fragment>
        )
    }
}

//映射到store
const mapStateToProps = (state) => {
    const { count = 1000 } = state.addTodo;//addTodo 对应reducer的addTodo
    const { hel = {}, tmpData = {} } = state.staticData;//静态数据
    const { httpHel = {} } = state.httpData;//http数据
    return { count, hel, httpHel, tmpData }
}

const mapDispatchToProps = (dispatch, props) => {//props 父组件传过来的参数
    console.log('props', props);
    return {
        //dispatch 内传入action(actionCreator创建者)(就是那个addTodo函数的返回值)  dispatch之后交给reducer处理
        //对应addTodo reducer处理了之后返回一个新的state更新store
        //更新完store后自动刷新页面
        onClick: (data) => dispatch(addTodo(data)),
        httpQueryData: bindActionCreators(reduxFunc.httpQueryData, dispatch),
        loadData: bindActionCreators(reduxFunc.loadData, dispatch),
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(Demo)



