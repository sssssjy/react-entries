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

        <h4>单侧阴影</h4>
        <div className="single-box-shadow">
            <div className="box1" />
            <div className="box2" />
            <div className="box3" />
            <div className="box4" />
        </div>

        <h4>box-shadow 背景动画</h4>
        <div className="box-shadow-bg-con">
            <div className="box-shadow-bg" />
        </div>
    </div>
}
