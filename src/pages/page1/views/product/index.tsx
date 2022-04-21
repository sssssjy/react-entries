import React, {useEffect, useState} from "react";
import './index.scss'
import {} from 'react-router-dom'

import '@/common/useStateModule'

const Page1 = () => {
    const [id, setId] = useState(0);
    useEffect(() => console.log(id),[id]);
    document.title = 'page1 product';
    return <div className={'product'}>
        product1
        {id}
        <button onClick={() => setId(id + 1)}>add id</button>
    </div>
}

export default Page1
