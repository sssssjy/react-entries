import style from './index.module.scss'

export default () => {
    return <div className={style.svgBase}>
        <svg width="300" height="300" style={{"border": "1px solid red"}}>
            <rect x={10} y={20} rx={50} ry={50} width={100} height={100}  />
        </svg>
        <svg width="300" height="300" style={{"border": "1px solid red"}}>
            <circle r={10} cx={100} cy={100} />
        </svg>
        <svg width="300" height="300" style={{"border": "1px solid red"}}>
            <ellipse cx={100} cy={100} rx={100} ry={50} />
        </svg>
        <svg width="300" height="300" style={{"border": "1px solid red"}}>
            <line x1={10} y1={10} x2={100} y2={200} stroke={'#abcdef'} strokeWidth={10}/>
        </svg>
        <svg width="300" height="300" style={{"border": "1px solid red"}}>
            <polyline
                points={"10 10, 200 115, 178 230"}
                stroke={'#abcdef'}
                fill={'#f40'}
            />
        </svg>
        <svg width="300" height="300" style={{"border": "1px solid red"}}>
            <path
                d={'M 10 10 50 100 h 50 v 200 Z'}
                stroke={'blue'}
                fill={'none'}
            />
        </svg>
        <svg width="300" height="300" style={{"border": "1px solid red"}}>
            <path
                d={'M 100 100 A 30 60 20 1 1 200 200'}
                stroke="red"
                fill="none"
            />
        </svg>
    </div>
}
