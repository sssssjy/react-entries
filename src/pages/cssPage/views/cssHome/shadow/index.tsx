import style from './index.module.scss'

export default () => {
    return <div className={style.shadow}>
        <h3>长阴影</h3>
        <div className="long-shadow-box-con">
            <div className="long-shadow-box">box</div>
        </div>

        <div className="box-shadow-con">
            <div className="box-shadow" />
        </div>

        <div className="text-shadow-con">
            <div className="text-shadow" >TEXT SHADOW</div>
        </div>

        <div className="button-con">
            <div className="button">button</div>
        </div>

        <div className="line-text-shadow-con">
            <div className="line-text-shadow">LINE TEXT SHADOW</div>
        </div>
    </div>
}
