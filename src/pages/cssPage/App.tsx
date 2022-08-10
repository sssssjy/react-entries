import * as React from "react";
import { HashRouter } from "react-router-dom";
import {Route, Routes} from "react-router";
import NotFound from './router/notFound'

import routeConfig from './router'
import Load from './router/loading'

const getComponent = (route) => {
    let temp = {} as any;

    const Component = React.lazy(() => import(`./views${route.elementPath || route.path}`).catch((error) => {
        console.log(error);
        return import('./router/loadError')
    })) as any;
    temp = {
        ...route,
        component: () => {
            document.title = route.name;
            return <React.Suspense fallback={<Load />}>
                <Component />
            </React.Suspense>
        }
    };

    return temp;
}

const routes = [] as Array<any>;

const initComponent = (config, list) => {
    config.forEach(item => {
        const component = getComponent(item);
        list.push(component);
        if (!item.children?.length) return;
        component.children = [];
        initComponent(item.children, component.children);
    })
}

initComponent(routeConfig, routes);

const initRoute = (route, index) => {
    const Component = route.component;
    if (route.children?.length) {
        return <Route key={route.path} path={route.path} element={<Component />} >
            {
                route.children.map((item, index) => initRoute(item, index))
            }
        </Route>
    }

    return <Route index={index === 0} key={route.path} path={route.path} element={<Component />} />
}

const App = () => {
    return <HashRouter>
        <Routes>
            {
                routes.map((item, index) => initRoute(item, index))
            }
            <Route key={'notFound'} path={'*'} element={<NotFound />} />
        </Routes>
    </HashRouter>
}

export default App
