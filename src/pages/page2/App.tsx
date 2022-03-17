import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from './views/home2'
import Product from './views/product2'
const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/page2/home2" element={<Home />} />
            <Route path="/page2/product2" element={<Product />} />
        </Routes>
    </BrowserRouter>
}

export default App