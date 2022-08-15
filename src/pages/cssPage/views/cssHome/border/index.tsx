import style from './index.module.scss'

export default () => {
    return <div className={style.borderAni}>
        <div className="fake-border" />

        <div className="dashed" />

        <div className="rotate-box" />

        <div className="conic-box" />

        <div className="clip-path-box" />

        <div className="button-box">button</div>

        <div className="transform-button-con">
            <div className="transform-button" />
        </div>

        <div className="hue-rotate" />

        <div className="triangle-con">
            <div className="triangle" />
        </div>
    </div>
}
