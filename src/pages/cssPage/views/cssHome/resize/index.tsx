import style from './index.module.scss'

// {
//     /* Keyword values */
//     resize: none;
//     resize: both;
//     resize: horizontal;
//     resize: vertical;
//     resize: block;
//     resize: inline;
// }


export default () => {
    return <div className={style.resize}>
        <div className="mask-move">
            <div className="inner" />
        </div>

        <div className="resize-con">
            <div className="inner" />
        </div>

        <div className="resize-square" />

        <div className="resize-note">
            <div className="resize" />
            <div className="content" />
        </div>
    </div>
}
