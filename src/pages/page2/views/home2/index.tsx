import React from "react";
import './index.scss'
const img = require('@/pages/page2/images/logo512.png');

const Page2 = () => {
    return <div className={'home2'}>
        <div>home2</div>
        <img src={img} alt="img"/>
    </div>
}

export default Page2