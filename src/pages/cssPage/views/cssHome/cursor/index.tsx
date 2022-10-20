import style from './index.module.scss'
import {MutableRefObject, useEffect, useRef} from "react";
export default () => {

    const dotRef = useRef() as MutableRefObject<HTMLDivElement>;
    const containerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        containerRef.current?.addEventListener('mousemove', e => {
            window.requestAnimationFrame(function(){
                setPosition(e.clientX, e.clientY);
            });
        });
    }, []);

    const setPosition = (x, y) => {
        dotRef.current.style.transform  = `translate(${x -containerRef.current.offsetLeft}px, ${y - containerRef.current.offsetTop}px)`;
        // dotRef.current.style.top = y - containerRef.current.offsetTop + 'px';
        // dotRef.current.style.left = x -containerRef.current.offsetLeft + 'px';
    };

    return <div className={style.cursor}>
        <div className="text-con" ref={containerRef}>
            <div className="dot" ref={dotRef} />
            ALL FOR YOUR FUTURE
        </div>
    </div>
}
