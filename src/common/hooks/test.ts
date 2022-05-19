const App = () => {
    const [num, setNum] = useState(0);
    const [num1, setNum1] = useState(0);

    console.log(num, 'num');
    console.log(num1, 'num1');
    console.log(isMount, 'isMount');

    return {
        onClick:() => {
            setNum(num => num + 1);
            setNum(num => num + 1);
        },
        onFocus:() => {
            setNum1(num => num + 10);
            setNum1(num => num + 10);
        }
    }
}

const fiber = {
    stateNode: App,
    memoizedState: null, //存hook链表
}

let isMount = true;
let workInProgress = null as any; //当前hook

const schedule = () => {
    workInProgress = fiber.memoizedState;
    const app = fiber.stateNode();
    isMount = false;
    return app;
}

function useState(initialState) {
    let hook;
    if (isMount) {
        hook = {
            memoizedState: initialState, //存数据
            next: null,
            queue: {
                pending: null
            }
        }
        if (!fiber.memoizedState) {
            fiber.memoizedState = hook;
        } else {
            workInProgress.next = hook;
        }
        workInProgress = hook;
    } else {
        hook = workInProgress;
        workInProgress = workInProgress.next;
    }

    let baseState = hook.memoizedState;
    if (hook.queue.pending) {
        let firstUpdate = hook.queue.pending.next;
        do {
            const action = firstUpdate.action;
            baseState = action(baseState);
            firstUpdate = firstUpdate.next;
        } while (firstUpdate !== hook.queue.pending.next);

        hook.queue.pending = null;
    }

    hook.memoizedState = baseState;

    return [baseState, dispatchEvent.bind(null, hook.queue)]
}

function dispatchEvent(queue, action) {
    const update = {
        action,
        next: null
    } as any;

    if (queue.pending === null) {
        update.next = update;
    } else {
        //最后一个指向第一个
        update.next = queue.pending.next;
        //第一个指向最后一个
        queue.pending.next = update;
    }

    queue.pending = update;

    schedule();
}

// @ts-ignore
window.app = schedule();

export {}
