import './index.scss'
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

import '@/common/decorators'

const Page1 = () => {
    document.title = 'page1 home';
    return <div className={'home'}>
        home1
        <Link to={'/product'}>product link</Link>
        <Link to={'/subMenu'}>subMenu link</Link>
    </div>
}

export default Page1
