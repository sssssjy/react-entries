import style from './index.module.scss'
import {useEffect} from "react";
import init from './init'
export default () => {
    useEffect(() => {
        init()
    }, []);

    return <div className={style.paint}>
        <div className="div1" />
        <div className="div2" />
        <div className="div3" />
    </div>
}
