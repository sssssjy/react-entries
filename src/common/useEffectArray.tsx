import ReactDOM from "react-dom";
import React from "react";

//Array 模拟
const allDeps = [] as Array<any>;
let effectCursor = 0;

function useEffect(callback, deps = []) {
    if (!allDeps[effectCursor]) {
        //初次执行
        allDeps[effectCursor] = deps;
        callback();
        effectCursor += 1;
        return
    }

    const curEffectCursor = effectCursor;
    const effectDeps = allDeps[curEffectCursor];
    //依赖是否改变 浅比较
    let isChange = deps.some((dep, index) => dep !== effectDeps[index]);
    effectCursor += 1;
    if (!isChange) return;
    allDeps[curEffectCursor] = deps;
    callback();
}

function App(){
    return <div>App</div>
}

function render() {
    ReactDOM.render(<App />, document.getElementById('root'));
    //重置
    effectCursor = 0;
}

render();