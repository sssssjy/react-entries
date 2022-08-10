import style from './index.module.scss'
export default () => {
    return <div className={style.translate3d}>
        <div className="scroll-con">
            <div className="box">box</div>
            <div className="back">box</div>
            <div className="box">box</div>
            <div className="back">box</div>
            <div className="box">box</div>
            <div className="back">box</div>
            <div className="box">box</div>
            <div className="back">box</div>
            <div className="box">box</div>
        </div>

        <div className="container">
            <div className="note-con">
                <div className="note">note</div>
                <div className="note">note</div>
                <div className="note">note</div>
                <div className="note">note</div>
                <div className="note">note</div>
                <div className="note">note</div>
                <div className="note">note</div>
                <div className="note">note</div>
                <div className="note">note</div>
                <div className="note">note</div>
            </div>
        </div>
    </div>
}
