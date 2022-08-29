import style from './index.module.scss'
export default () => {
  return <div className={style.cssProgress}>
    <h3>meter</h3>
    <div>
      Progress <meter min={0} max={100} value={30}>30%</meter>
    </div>
    <h3>progress</h3>
    <div>Progress <progress max={100} value={68}>68%</progress></div>
    <h3>css</h3>

    <div className="line-progress" />
    <div className="circle-progress" />
    <div className="progress-3d">
      <div className="top" />
      <div className="front" />
      <div className="bottom" />
      <div className="back" />
    </div>
  </div>
};
