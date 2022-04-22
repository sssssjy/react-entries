const Didact = {
    createElement,
    render,
    useState
}

/**
 *
 * https://qcsite.gatsbyjs.io/build-your-own-react/
 *
 * 模拟实现React createElement
 element 是一个带有 type 和 props 的对象。createElement 函数需要做的就是创建这样一个对象。
 tip =>
 React 对于一个基本值的子元素，不会创建空数组也不会包一层 TEXT_ELEMENT，
 但是为了简化代码，我们的实现和 React 有差异，毕竟在这里我们只想要简单的代码而不是完美的代码
 **/

function createElement(type, props?, ...children) {
    return {
        type,
        props:{
            ...props,
            children: children.map(item => type === 'object' ? item : createTextNode(item))
        },
    }
}

function createTextNode(text) {
    return {
        type: 'TEXT_ELEMENT',
        props:{
            nodeValue: text,
            children: []
        }
    }
}

/**
 * 模拟实现 ReactDOM.render
 */

{
    // @ts-ignore
    function render(element, container) {
        //若是文本节点 则创建节点dom 否则创建普通dom
        const dom = element.type === 'TEXT_ELEMENT' ? document.createElement('') : document.createElement(element.type);

        //递归 children
        //todo 同步递归会阻塞浏览器进程 容易造成卡顿 需要分解为时间切片
        element.props?.children?.map(item => render(item, dom));

        //将props赋值给dom属性
        const isProperty = key => key !== 'children';
        Object.keys(element.props).forEach(key => {
            if (!isProperty(key)) return;
            dom[key] = element.props[key]
        });

        container.appendChild(dom);
    }
}

/**
 * 模拟实现 任务分块
 * 使用 requestIdleCallback
 * =>
 * 兼容性差
 * 在浏览器绘制完成后执行
 * 返回参数 deadline
 *      timeRemaining(): 剩余多少时间
 *      didTimeout: 是否超时
 *
 * react使用schedule
 */
let nextUnitOfWork = null;

function workLoop(deadline) {
    //是否需要停下来等待下一个时间片段
    let shouldYield = false;
    while(nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }

    //如果没有下一个fiber 并且 workInProgress存在
    // 即所有改动均已遍历完毕 提交所有改动
    if (!nextUnitOfWork && wipRoot) commitRoot();

    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

interface fiberProps{
    dom: any //fiber对应真实dom
    parent: any //父fiber 指针
    type: any //类型 与element类型一致
    sibling: any //兄弟fiber 指针
    child: any //子fiber 指针
    effectTag: string //更新标签
    props:{
        [_: string]: any //其他属性
        children: any //子element合集
    }
}

//执行当前任务 返回下一任务
function performUnitOfWork(fiber) {

    //兼容Function Component
    if (fiber.type instanceof Function) {
        updateFunctionComponent(fiber);
    } else {
        updateHostComponent(fiber)
    }

    //返回下一个fiber节点
    // 子节点 => 兄弟节点 => 父节点的兄弟节点
    if (fiber.child) return fiber.child;
    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) return  nextFiber.sibling;
        nextFiber = nextFiber.parent;
    }
}

function updateHostComponent(fiber) {
    //创建dom对象 并将其挂载到parent下
    if (!fiber.dom) fiber.dom = createDom(fiber);
    // todo 同步进行appendChild 对浏览器渲染造成影响 可能用户会看到未渲染完全的dom 需要使用双缓存
    // if (fiber.parent) fiber.parent.dom.appendChild(fiber.dom);

    //为每个child 创建fiber对象 构建fiber树
    // const elements = fiber.props.children || [];
    // let index = 0;
    // let prevSibling = null;
    //
    // while (index < elements.length) {
    //     const newFiber = {
    //         dom: null,
    //         parent: fiber,
    //         props: elements[index].props,
    //         type: elements[index].type
    //     }
    //
    //     if (index === 0) {
    //         //第一个创建的fiber
    //         fiber.child = newFiber
    //     } else {
    //         prevSibling.sibling = newFiber
    //     }
    //
    //     prevSibling = newFiber;
    //     index++;
    // }

    // todo 抽离创建fiber 为fiber添加alternate
    const elements = fiber.props.children || [];
    reconcileChildren(fiber, elements);
}

/**
 * Function Component 与 Host Component 的区别
 * Function Component 的element 源自 Function Component的执行返回
 * 且 fiber 无 dom属性
 * @param fiber
 */

let wipFiber = null as any;
let hookIndex = 0;

function updateFunctionComponent(fiber) {
    wipFiber = fiber;
    hookIndex = 0;
    wipFiber.hooks = [];
    const children = [fiber.type(fiber.props)];
    reconcileChildren(fiber, children);
}

function useState(initial) {
    const oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex];
    const hook = {
        state: oldHook ? oldHook.state : initial,
        queue: []
    };

    const actions = oldHook ? oldHook.hooks : [];
    actions.forEach(action => hook.state = action(hook.state))

    const setState = (action) => {
        // @ts-ignore
        hook.queue.push(action);
        wipRoot = {
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot
        };
        nextUnitOfWork = wipRoot;
        deletions = [];
    }

    wipFiber.hooks.push(hook);
    hookIndex++;
    return [hook.state, setState]
}

//reconcile 调和
function reconcileChildren(wipFiber, elements) {
    let index = 0;
    let prevSibling = null as any;
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child;

    while (index < elements.length || oldFiber) {
        /**
         * 比较oldFiber与newFiber
         * 若 type相同 可以复用旧dom 只需要update旧dom的属性 打上UPDATE标签
         * 若 type不同 则需要创建新的dom
         * 若 type不同且旧fiber存在 则需要卸载旧fiber
         */
        const element = elements[index];
        let newFiber = null as any;

        const sameType = element && oldFiber && element.type === oldFiber.type;
        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                dom: oldFiber.dom,
                props: element.props,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: 'UPDATE'
            }
        }

        if (!sameType && element) {
            newFiber = {
                type: element.type,
                dom: null,
                props: element.props,
                parent: wipFiber,
                alternate: null,
                effectTag: 'REPLACEMENT'
            }
        }

        if (!sameType && oldFiber) {
            //不生成newFiber 将oldFiber标记删除
            //但更新时 遍历对象为wipRoot 而非 currentRoot
            //需要一个数组保存需要删除的对象
            oldFiber.effectTag = 'DELETE';
            // @ts-ignore
            deletions.push(oldFiber);
        }

        oldFiber && (oldFiber = oldFiber.sibling);


        if (index === 0) {
            //第一个创建的fiber
            wipFiber.child = newFiber
        } else {
            prevSibling.sibling = newFiber
        }

        prevSibling = newFiber;
        index++;
    }
}

// 着手改造render 抽离createDom
function createDom(fiber) {
    const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type);
    const isProperty = key => key !== 'children';
    Object.keys(fiber.props).forEach(key => {
        if (!isProperty(key)) return;
        dom[key] = fiber.props[key]
    });

    return dom;
}

/**
 * workInProgress树 work in progress root
 * 当这棵树上所有任务均完成 即可提交所有变动(commitRoot) 统一渲染dom
 */
let wipRoot = null as any;
// effectTag 为 DELETE 的 oldFiber 数组
let deletions = [];
function render(element, container) {
    wipRoot = {
        dom: container,
        props:{
            children: [element]
        },
        alternate: currentRoot
    };
    deletions = [];
    nextUnitOfWork = wipRoot;
}

//提交fiber树 渲染dom
function commitRoot() {
    //删除旧节点
    deletions.forEach(commitWork);

    commitWork(wipRoot.child);
    currentRoot = wipRoot;
    wipRoot = null;
}

//渲染dom 完成添加操作
// todo 修改与删除 diff

/**
 * currentRoot 当前渲染的fiber树 与 workInProgress树 形成 双缓存
 * 在每个fiber节点添加 alternate 属性 进行比较
 */

let currentRoot = null as any;

function commitWork(fiber) {
    if (!fiber) return;

    //Function Component 无 dom属性
    let domParentFiber = fiber.parent;
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent;
    }
    const domParent = domParentFiber.dom;

    if (fiber.effectTag === 'REPLACEMENT' && fiber.dom) {
        domParent.appendChild(fiber.dom);
    } else if (fiber.effectTag === 'UPDATE' && fiber.dom) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    } else if (fiber.effectTag === 'DELETE') {
        //移除节点时也需要考虑Function Component
        commitDeletion(fiber, domParent);
    }

    domParent.appendChild(fiber.dom);
    commitWork(fiber.child);
    commitWork(fiber.sibling);
}

function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
        domParent.removeChild(fiber.dom);
    } else {
        commitDeletion(fiber.child, domParent)
    }
}

//effectTag 为 UPDATE 更新dom属性
const isEvent = key => key.startsWith('on');
const isProperty = key => key !== 'children' && !isEvent(key);
const isNew = (prev, next) => key => prev[key] !== next[key];
const isGone = (prev, next) => key => !(key in next)
function updateDom (dom, prevProps, nextProps) {
    //移除旧事件
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)[key])
        .forEach(oldKey => {
            const eventType = oldKey.toLowerCase().substring(2);
            dom.removeEventListener(eventType, prevProps[oldKey]);
        })

    //删除旧prop
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, nextProps))
        .forEach(delKey => dom[delKey] = '');

    //添加新prop
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(newKey => dom[newKey] = nextProps[newKey]);

    //注册新事件
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(newKey => {
            const eventType = newKey.toLowerCase().substring(2);
            dom.addEventListener(eventType, nextProps[newKey]);
        })
}

export default Didact
