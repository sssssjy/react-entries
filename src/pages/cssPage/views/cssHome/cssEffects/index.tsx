import style from './index.module.scss'
import {MutableRefObject, useEffect, useRef, useState} from "react";

export default () => {
    const textRef = useRef() as MutableRefObject<HTMLDivElement>;

    const [activeMenu, setActiveMenu] = useState(0);

    useEffect(() => {
        const innerHtml = textRef.current.innerHTML;
        textRef.current.innerHTML = '';
        for (let i = 0; i < innerHtml.length; i++) {
            const span = document.createElement('span');
            span.innerText = innerHtml[i];
            span.style.animationDelay = `${20 * i}ms`
            textRef.current.appendChild(span);
        }
    }, []);

    return <div className={style.cssEffects}>
        <div className="dot-ani">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>

        <div className="text-ani" ref={textRef}>
            Ano hi watashitachi mada shiranai no Fushigi no monogatari desu.
        </div>

        <div className="to-do-list">
            <div className="title">My Special Todo List</div>
            <div className="to-do-con">
                <div className="to-do-item">
                    <label>
                        <input type="checkbox"/>
                        <i className={'check-icon'} />
                        <span>Make awesome CSS animation</span>
                    </label>
                </div>
                <div className="to-do-item">
                    <label>
                        <input type="checkbox"/>
                        <i className={'check-icon'} />
                        <span>Make awesome CSS animation</span>
                    </label>
                </div>
                <div className="to-do-item">
                    <label>
                        <input type="checkbox"/>
                        <i className={'check-icon'} />
                        <span>Make awesome CSS animation</span>
                    </label>
                </div>
                <div className="to-do-item">
                    <label>
                        <input type="checkbox"/>
                        <i className={'check-icon'} />
                        <span>Make awesome CSS animation</span>
                    </label>
                </div>
            </div>
        </div>

        <div className="radius-menu-con">
            <div className="radius-menu">
                <div className="mask" style={{left: `${activeMenu * 100}px`}} />
                <div className={"menu-item " + (activeMenu === 0 ? 'active' : '')} onClick={() => setActiveMenu(0)}>
                    <div className="icon"/>
                    <div className="text">HOME</div>
                </div>
                <div className={"menu-item " + (activeMenu === 1 ? 'active' : '')} onClick={() => setActiveMenu(1)}>
                    <div className="icon"/>
                    <div className="text">PERSON</div>
                </div>
                <div className={"menu-item " + (activeMenu === 2 ? 'active' : '')} onClick={() => setActiveMenu(2)}>
                    <div className="icon"/>
                    <div className="text">LIST</div>
                </div>
                <div className={"menu-item " + (activeMenu === 3 ? 'active' : '')} onClick={() => setActiveMenu(3)}>
                    <div className="icon"/>
                    <div className="text">MESSAGE</div>
                </div>
            </div>
        </div>

        <div className="inset-box-shadow">
            <div className="moon" />
        </div>

        <div className="milk-con">
            <div className="milk-box">
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
                <div className="milk"></div>
            </div>
        </div>

        <div className="glass-con">
            <div className="glass">GLASS</div>
        </div>

        <div className="text-background">TEXT BACK</div>
    </div>
}
