import * as React from "react";
import { HashRouter } from "react-router-dom";
import {Route, Routes} from "react-router";
import Home from './views/home'
import Product from './views/product'
import Nprogress from '@/components/Nprogress'

//React.lazy + Suspense Nprogress 实现 加载进度条
const Home1 = React.lazy(() => import('./views/home'));
const Product1 = React.lazy(() => import('./views/product'));

const App = () => {
    return <HashRouter>
        <React.Suspense fallback={<Nprogress/>}>
            <Routes>
                <Route path="/" element={<Home1 />} />
                <Route path="/home" element={<Home1 />} />
                <Route path="/product" element={<Product1 />} />
            </Routes>
        </React.Suspense>

    </HashRouter>
}

export default App