import styles from './index.module.scss'

export default () => {
    return <div className={styles.container}>
        <h3>filter contrast blur 设置圆角</h3>
        <div className="g-container">
            <div className="g-content">
                <div className="g-filter" />
            </div>
        </div>

        <h3>filter hover brightness + contract 加强亮度对比度</h3>
        <div className="hover-con">
            <div className="button">button</div>
        </div>

        <h3>filter blur 设置阴影</h3>
        <div className="blur-img" />


        <h3>filter blur + contrast 融合效果</h3>
        <p>原理： 父元素设置contrast 子元素设置blur</p>

        <div className="mix-con">
            <div className="blur1" />
            <div className="blur2" />
        </div>

        <h3>filter blur + contrast 波浪</h3>
        <div className="wave-con">
            <div className="wave">
                <div className="wave-filter" />
            </div>
        </div>

        <div className="g-container-1">
            <div className="g-inner-1" />
        </div>

        <h3>filter blur + contrast 实现文字动画</h3>
        <div className="word-change">
            <div className="word">iPhone</div>
            <div className="word">13</div>
            <div className="word">Pro</div>
            <div className="word">强得很！</div>
        </div>
    </div>
}
