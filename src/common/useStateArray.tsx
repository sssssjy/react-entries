import React from "react";
import ReactDOM from "react-dom";

//模拟实现useState
const states = [] as Array<any>;
let cursor = 0;

function useState(initValue) {
    const currentCursor = cursor;
    //检查是否初始化过
    states[currentCursor] = states[currentCursor] ?? initValue;

    function setState(newState) {
        states[currentCursor] = newState;
        //触发重新渲染
        render();
    }

    cursor+=1;
    return [states[currentCursor], setState];
}

function App(){
    const [a, setA] = useState('a');
    const [b, setB] = useState('b');

    return <div>
        {a}
        <button onClick={() => setA('aa')}>add a</button>
        {b}
        <button onClick={() => setB('bb')}>add b</button>
    </div>
}

function render() {
    ReactDOM.render(<App />, document.getElementById('root'));
    cursor = 0;
}

render();