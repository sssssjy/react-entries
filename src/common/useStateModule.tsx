// @ts-ignore
const MyReact = (function (){
    let value, deps;
    return {
        render: function (Component) {
            const Comp = Component();
            Comp.render();
            return Comp;
        },
        useState: function (initState){
            value = value ?? initState;
            function setState(newState) {
                value = newState;
            }
            return [value, setState];
        },
        useEffect: function (callback, depArray) {
            const hasNoDep = !depArray;
            const hasChangeDep = deps ? deps.some((dep, index) => dep !== depArray[index]) : true;
            if (hasNoDep || hasChangeDep) {
                callback();
                deps = depArray;
            }
        }
    }
})();

function Count() {
    const [count, setCount] = MyReact.useState(0);

    MyReact.useEffect(() => {
        console.log('effect change', count);
    }, [count]);

    return {
        click:() => setCount(count + 1),
        render:() => console.log('render',count),
        noop:() => setCount(count)
    }
}

// @ts-ignore
let App = MyReact.render(Count); // value 0 effect run
App.click();
App = MyReact.render(Count); // value 1 effect run
App.noop();
App = MyReact.render(Count); // value 1 effect not run
App.click();
App = MyReact.render(Count);// value 2 effect run
