import style from './index.module.scss'

export default () => {
    return <div className={style.button}>
        <div className="rect">rect</div>
        <div className="circle">circle</div>
        <div className="parallelogram">parallelogram</div>
        <div className="trapezoid">Trapezoid</div>
        <div className="notching" />
        <div className="notching-clip-path" />
        <div className="diamond" />
        <div className="arrow" />
        <div className="inset-circle" />
        <div className="skew" />
        <div className="outside-circle" />
    </div>
}
