// @ts-ignore
const MyReact = (function (){

    let hooks = [] as Array<any>,
        currentHook = 0;

    return {
        render: function (Component) {
            const Comp = Component();
            Comp.render();
            currentHook = 0;
            return Comp;
        },
        useState: function (initValue) {
            hooks[currentHook] = hooks[currentHook] ?? initValue;
            const tempHookIndex = currentHook;
            const setState = (newState) => hooks[tempHookIndex] = newState;
            return [hooks[currentHook++], setState];
        },
        useEffect: function (callback, depList) {
            const isEmptyDep = !hooks[currentHook];
            const isChange = hooks[currentHook] ? hooks[currentHook].some((dep, index) => dep !== depList[index]) : true;
            if (isEmptyDep || isChange) {
                callback();
                hooks[currentHook] = depList;
            }
            currentHook++
        }
    }
})();