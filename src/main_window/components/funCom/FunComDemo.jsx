import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";//函数组件中使用store
import * as reduxFunc from '../../redux/action'
import { bindActionCreators } from "redux";
import { Button } from "antd";

export default function FunComDemo(props) {
    const state = useSelector((state) => state);


    const [count, setCount] = useState(0);

    console.log(state)

    function addCount() {
        setCount(count + 1)
    }
    useEffect(() => {
        console.log('funcom', props)
    }, [count])
    return (
        <>
            <span>number:{count}</span>
            <Button onClick={addCount}>number1</Button>
            <Button onClick={() => setCount(count + 2)}>number2</Button>
        </>
    )

    const dispatch = useDispatch();
    const httpQueryData = bindActionCreators(reduxFunc.httpQueryData, dispatch);
    const loadData = bindActionCreators(reduxFunc.loadData, dispatch);
}