/**
 * animation composition
 *
 * transform: translateX(50px) rotate(45deg)
 * transform: translateX(100px);
 *
 * replace 替换 结果为 transform: translateX(100px);
 * add 添加 结果为 transform: translateX(50px) rotate(45deg) translateX(100px);
 * accumulate 混合 结果为 transform: translateX(150px) rotate(45deg)
 */
import style from './index.module.scss'
export default () => {
    return <div>
        <div className={style.ball} />
        <div className={style.dvdCon}>
            <div className="dvd" />
        </div>
    </div>
}
