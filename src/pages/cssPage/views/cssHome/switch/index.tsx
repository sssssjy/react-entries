import style from './index.module.scss'
export default () => {
    return <div className={style.switch}>
        <div className="switch-con">
            <div className="switch-box">
                <div className="switch-item">按钮1</div>
                <div className="switch-item">按钮2</div>
            </div>
        </div>
    </div>
}
