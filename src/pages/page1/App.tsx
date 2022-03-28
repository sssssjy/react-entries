import * as React from "react";
import { HashRouter } from "react-router-dom";
import {Route, Routes} from "react-router";
import Home from './views/home'
import Product from './views/product'

const App = () => {
    return <HashRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product" element={<Product />} />
        </Routes>
    </HashRouter>
}

export default App