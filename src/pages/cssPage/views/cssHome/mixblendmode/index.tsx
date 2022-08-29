import style from './index.module.scss'
const code = require('@/pages/cssPage/images/12345.png');
const code1 = require('@/pages/cssPage/images/code.jpeg');
const cat = require('@/pages/cssPage/images/cat.png');

export default () => {
    return <div className={style.mix}>
        <div className="code"><img src={code} /></div>
        <div className="code1"><img src={code1} /></div>
        <div className="radio-mask" />
        <div className="square-mask" />
        <div className="cat" />
    </div>
}
