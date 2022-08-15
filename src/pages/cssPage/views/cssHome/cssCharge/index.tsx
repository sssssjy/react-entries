import styles from './index.module.scss'

export default () => {
    return <div>
        <div className={styles.charge}>
            <div className="charge-con" >
                <div className="wave" />
            </div>
        </div>
        <div style={{height:'10px'}} />
        <div className={styles.textWave}>
            TEXT WAVE
        </div>
    </div>
}
