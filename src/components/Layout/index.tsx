import React from "react";
// import {Link} from 'react-router-dom'

const Layout = (props) => {
    return <div>
        <div>
            1111
            {/*<Link to={'/page1/home'} >page1 home link</Link>*/}
            {/*<Link to={'/page1/product'} >page1 product link</Link>*/}
        </div>
        <div>
            {props.children}
        </div>
    </div>
}

export default Layout