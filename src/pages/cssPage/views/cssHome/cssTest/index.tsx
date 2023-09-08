import './index.scss'

const EllipsisText = props => {
    const {text} = props;
    return <div className="wrap">
        <div className="txt">{text}</div>
        <div className="title" title={text}>{text}</div>
    </div>
}

export default () => {
    return <div>
        <div className="con">
            <EllipsisText text={'文本文本文本'}/>
            <EllipsisText text={'文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本'}/>
        </div>
        <div style={{width: 200}}>
            <EllipsisText text={'文本文本文本'}/>
            <EllipsisText text={'文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本'}/>
        </div>
    </div>;

}
