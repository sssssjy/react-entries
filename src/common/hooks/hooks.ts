let isMount = true;
let workInProgress = null as any; //正在更新的hook

const fiber = {
    stateNode: App,
    memoizedState: null, //存hook 链表
};

//每次更新触发调度
function schedule() {
    workInProgress = fiber.memoizedState; //复位至第一个hook
    const app = fiber.stateNode();
    isMount = false;
    return app;
}

//返回当前状态以及改变该状态的方法
function useState(initialState) {
    let hook;

    //是否首次渲染
    if (isMount) {
        hook = {
            memoizedState: initialState, //存数据
            next: null,
            queue:{
                // 更新队列
                // queue.pending 指向最后一个update
                pending: null
            }
        }
        if (!fiber.memoizedState) {
            //是创建的第一个hook
            fiber.memoizedState = hook;
        } else {
            workInProgress.next = hook;
        }
        workInProgress = hook;
    } else {
        //update
        hook = workInProgress;
        workInProgress = workInProgress.next;
    }

    // 产生新的状态
    let baseState = hook.memoizedState; //上一次状态
    if (hook.queue.pending) {
        //是否有更新
        let firstUpdate = hook.queue.pending.next;
        do {
            const action = firstUpdate.action;
            //基于action计算新状态
            baseState = action(baseState);
            firstUpdate = firstUpdate.next;
        } while (firstUpdate !== hook.queue.pending.next);

        hook.queue.pending = null;
    }

    hook.memoizedState = baseState;

    return [baseState, dispatchAction.bind(null, hook.queue)]
}

//改变state的函数
function dispatchAction(queue, action) {
    //创建update 环状链表
    //优先级
    const update = {
        action,
        next: null
    } as any;

    // queue.pending 指向最后一个update
    // queue.pending.next 指向第一个update
    //是第一个更新函数
    if (queue.pending === null) {
        // u0 -> u0
        update.next = update;
    } else {
        // u0 -> u0
        // u1 -> u0 -> u1
        update.next = queue.pending.next;
        queue.pending.next = update;
    }

    // queue.pending 指向最后一个update
    queue.pending = update;
    schedule(); //触发更新
}

function App() {
    const [num, setNum] = useState(0);
    const [num1, setNum1] = useState(0);

    console.log(isMount,'isMount');
    console.log(num, 'num');
    console.log(num1, 'num1');

    return {
        onClick() {
            setNum(num => num + 1);
            setNum(num => num + 2);
        },
        onFocus() {
            setNum1(num => num + 1);
            setNum1(num => num + 2);
            setNum1(num => num + 3);
        }
    }
}

// @ts-ignore
window.app = schedule(); //模拟点击

export {}

