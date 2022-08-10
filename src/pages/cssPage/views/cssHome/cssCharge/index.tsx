import styles from './index.module.scss'

export default () => {
    return <div>
        <div className={styles.charge}>
            <div className="charge-con" >
                <div className="wave" />
            </div>
        </div>
        <div style={{height:'10px'}} />
        <div className={styles.chargeAni}>
            <div className="container">
                <div className="num">98.41%</div>
                <div className="contrast">
                    <div className="circle" />
                    <ul className="bubble">
                        <li />
                        <li />
                        <li />
                        <li />
                        <li />
                        <li />
                        <li />
                        <li />
                        <li />
                        <li />
                    </ul>
                </div>
            </div>
        </div>
    </div>
}
