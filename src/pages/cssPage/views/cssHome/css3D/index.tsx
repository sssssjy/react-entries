import style from './index.module.scss'
export default () => {
    return <div className={style.perspective3D}>
        <div className="webpack-logo-con">
            <div className="webpack-logo-out">
                <div className="top" />
                <div className="bottom" />
                <div className="front" />
                <div className="back" />
                <div className="left" />
                <div className="right" />
            </div>
            <div className="webpack-logo-inner">
                <div className="top" />
                <div className="bottom" />
                <div className="front" />
                <div className="back" />
                <div className="left" />
                <div className="right" />
            </div>
        </div>

        <div className="text-3d-1">
            <p>Lorem ipsum</p>
        </div>
        <div className="text-3d-2">
            <div>
                <h1>Glowing 3D TEXT</h1>
                <h1>Glowing 3D TEXT</h1>
                <h1>Glowing 3D TEXT</h1>
                <h1>Glowing 3D TEXT</h1>
                <h1>Glowing 3D TEXT</h1>
                <h1>Glowing 3D TEXT</h1>
                <h1>Glowing 3D TEXT</h1>
                <h1>Glowing 3D TEXT</h1>
                <h1>Glowing 3D TEXT</h1>
                <h1>Glowing 3D TEXT</h1>
            </div>
        </div>
    </div>
}
