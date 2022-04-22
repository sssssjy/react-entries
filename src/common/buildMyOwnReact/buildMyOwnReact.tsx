import ReactDOM from 'react-dom'
import React from 'react'
import Didact from './Didact'

(function() {
    const element = <h2 title={'h2 title'}>hi</h2>;
    const container = document.getElementById('root');

    ReactDOM.render(element, container);
})();


/**
 * react-dom 将 element转为React.createElement
 * const element = <h2>hi</h2>;
 * =>
 * const element = React.createElement('h2',
 *     {title: 'h2 title'},
 *     'h1'
 * )
 * =>
 * const element = {
 *     type: 'h2',
 *     props:{
 *         title: 'h2 title',
 *         children: 'hi'
 *     }
 * }
 */

// element 通过上述转换成一个对象
(function (){
    const element = {
        type: 'h2',
        props:{
            title: 'h2 title',
            children: 'hi'
        }
    };
    const container = document.getElementById('root');

    // @ts-ignore
    ReactDOM.render(element, container);

    const node = document.createElement(element.type);
    node['title'] = element.props.title;
    const text = document.createTextNode('');
    text['nodeValue'] = element.props.children;
    node.appendChild(text);
    // @ts-ignore
    container.appendChild(node);
})();
/**
 * 接下来转换ReactDOM.render
 *
 * ReactDOM.render(element, container);
 * =>
 *     const node = document.createElement(element.type);
 *     node['title'] = element.props.title;
 *     const text = document.createTextNode('');
 *     text['nodeValue'] = element.props.children;
 *     node.appendChild(text);
 *     container.appendChild(node);
 *
 * tip
 * 使用 textNode 而不是 innerText 有助于我们稍后统一处理所有的 element
 * 和我们给 h1 的 title 进行赋值一样，我们对 textNode 的 nodeValue 进行赋值
 * 像这样：props: {nodeValue: "hello"}
 */


{
    /** @jsx Didact.createElement */
    const element = (
        <div id="foo">
            <a>bar</a>
            <b />
        </div>
    )

    const container = document.getElementById("root")
    ReactDOM.render(element, container)
}

/**
 * 支持Function Component
 *
 * =>
 * function App(props) {
 *     return Didact.createElement('h1', null, 'hi', props.name)
 * }
 *
 * const element = Didact.createElement(App, {name: 'foo'})
 *
 * =>
 * 函数组件fiber 无 dom
 * 子节点由函数运行返回，而非props
 */

/** @jsx Didact.createElement */
function App(props) {
    return <h1>hi {props.name}</h1>
}

const element = <App name={'foo'} />;
const container = document.getElementById('root');
Didact.render(element, container);

/**
 * 模拟实现 useState
 *
 */

function Counter() {
    const [count, setCount] = Didact.useState(0);
    return (
        <h1 onClick={() => setCount(c => c + 1)}>Count: {count}</h1>
    )
}
