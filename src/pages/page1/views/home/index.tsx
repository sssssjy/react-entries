import './index.scss'
import React from "react";
import { Link } from "react-router-dom";
const Page1 = () => {
    document.title = 'page1 home'
    return <div className={'home'}>
        home1
        <Link to={'/product'}>product link</Link>
    </div>
}

export default Page1