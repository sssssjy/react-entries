import * as React from "react";
import { HashRouter } from "react-router-dom";
import {Route, Routes} from "react-router";
import SubMenu from './views/subMenu'
import Nprogress from '@/components/Nprogress'
import '@/common/hooks/test'
import '@/common/hooks/hooks'

//React.lazy + Suspense Nprogress 实现 加载进度条
const Home1 = React.lazy(() => import('./views/home'));
const Product1 = React.lazy(() => import('./views/product'));
const Promise1 = React.lazy(() => import('./views/promise'));
const DotCanvas = React.lazy(() => import('./views/dotCanvas'));

const App = () => {
    return <HashRouter>
        <React.Suspense fallback={<Nprogress />}>
            <Routes>
                <Route path="/" element={<Home1 />} />
                <Route path="/home" element={<Home1 />} />
                <Route path="/product" element={<Product1 />} />
                <Route path="/subMenu" element={<SubMenu />} />
                <Route path="/promise" element={<Promise1 />} />
                <Route path="/dotCanvas" element={<DotCanvas />} />
            </Routes>
        </React.Suspense>

    </HashRouter>
}

export default App
