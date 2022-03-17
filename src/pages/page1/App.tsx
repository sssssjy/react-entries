import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from './views/home'
import Product from './views/product'
const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/page1/home" element={<Home />} />
            <Route path="/page1/product" element={<Product />} />
        </Routes>
    </BrowserRouter>
}

export default App