import style from './index.module.scss'

const img1 = require('@/pages/cssPage/images/back1.jpg');
const img2 = require('@/pages/cssPage/images/back2.jpg');
const img3 = require('@/pages/cssPage/images/back3.JPG');
const img4 = require('@/pages/cssPage/images/back4.JPG');
const img5 = require('@/pages/cssPage/images/back5.JPG');

export default () => {
    return <div className={style.mask}>
        <div className={'default'}><img src={img1}/></div>
        <div className={'cut'}><img src={img3}/></div>
        <div className="cover" />
        <div className="rotate" />

        <div className="contrast-con"><div className="contrast" /></div>

        <div className="mix"><div className="mix-inner" /></div>

        <div className="change-ani"><div className="inner-img" /></div>

        {/*<h4>mask + backdrop-filter</h4>*/}
        {/*<div className="mask-drop-con">*/}
        {/*    <div className="glass" />*/}
        {/*</div>*/}
    </div>
}
