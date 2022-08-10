import style from './index.module.scss'
import {MutableRefObject, useRef} from "react";
export default () => {

    const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const boxRef = useRef() as MutableRefObject<HTMLDivElement>;
    const multiple = 10;

    const onMousemove = e => {
        const info = boxRef.current?.getBoundingClientRect();
        const disX = (e.clientX - info.x) / multiple;
        const disY = (info.y - e.clientY) / multiple;

        boxRef.current.style.transform = `rotateY(${disX}deg) rotateX(${disY}deg)`
    }

    const onMouseLeave = e => {
        boxRef.current.style.transform = `rotateY(0) rotateX(0)`
    };

    return <div className={style.rotate}>

        <div className="container">
            <div className="box">抵消</div>
        </div>

        <div className="mouse-rotate-con" ref={containerRef} onMouseMove={onMousemove} onMouseLeave={onMouseLeave}>
            <div className="mouse-rotate" ref={boxRef} />
        </div>
    </div>
}
