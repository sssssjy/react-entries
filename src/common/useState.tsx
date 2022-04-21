import React from 'react'
import App from "@/pages/page1/App";
import ReactDOM from "react-dom";

function render() {
    ReactDOM.render(<App />, document.getElementById('root'));
}

//state保存在一个对象中 多个state就应该保存在链表（数组）中
//可使用 Array模拟
let state = null;

function useState(initValue) {
    state = state || initValue;

    function setState(newState) {
        state = newState;
        render();
    }
    //闭包
    return [state, setState];
}

//首次渲染
render();