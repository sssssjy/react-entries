import style from './index.module.scss'
export default () => {
    /**
     * SourceGraphic 模糊效果要应用于整个图片
     * stdDeviation 模糊的程度
     */
    return <div className={style.svg}>
        <div className="blur-con">
            <div className="css-filter" />
            <div className="svg-filter" />
            <svg>
                <defs>
                    <filter id={'blur'}>
                        <feGaussianBlur in={'SourceGraphic'} stdDeviation={'5'} />
                    </filter>
                </defs>
            </svg>
        </div>
    </div>
}
