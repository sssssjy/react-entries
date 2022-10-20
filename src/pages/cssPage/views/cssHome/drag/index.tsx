import style from './index.module.scss'
export default () => {
    return <div className={style.drag}>
        <div className="con">
            <div className="flag" />
            <div className="drag-box" draggable />
        </div>
    </div>
}
