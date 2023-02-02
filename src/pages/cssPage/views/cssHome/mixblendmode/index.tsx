import style from './index.module.scss'
import {MutableRefObject, useEffect, useRef} from "react";

import 'css-doodle';

const CSSDoodleModule = global.CSSDoodle;
const {CSSDoodle} = CSSDoodleModule;
const doodle = CSSDoodle`
    @grid: 5 / 200px;
    background: @p(#000, #fff);
    margin: 1px;
`

const code = require('@/pages/cssPage/images/12345.png');
const code1 = require('@/pages/cssPage/images/code.jpeg');
const cat = require('@/pages/cssPage/images/cat.png');

export default () => {
    const container = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        container.current.appendChild(doodle);
    }, []);

    return <div className={style.mix} ref={container}>
        <div className="code"><img src={code} /></div>
        <div className="code1"><img src={code1} /></div>
        <div className="radio-mask" />
        <div className="square-mask" />
        <div className="cat" />

        <div className="ikun" />
    </div>
}
